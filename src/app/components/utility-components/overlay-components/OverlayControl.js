export class OverlayControl {
    constructor() {
        this.public = this.createPublicOverlayControlFunctions();
        this.activeEscapableOverlayCallbacks = [];
    }

    createPublicOverlayControlFunctions() {
        return (() => {
            const constants = {
                tabKeyScenarios: [
                    { // Leaving main element forwards
                        check: (e, $element, focusableItems) => methods.tabKey.leavingFromElement($element[0]) && !e.shiftKey,
                        getDestination: (focusableItems) => focusableItems[0]
                    },
                    { // Leaving main element backwards
                        check: (e, $element, $focusableItems) => methods.tabKey.leavingFromElement($element[0]) && e.shiftKey,
                        getDestination: (focusableItems) => focusableItems[focusableItems.length - 1]
                    },
                    { // Leaving first focusable element backwards
                        check: (e, $element, focusableItems) => methods.tabKey.leavingFromElement(focusableItems[0]) && e.shiftKey,
                        getDestination: (focusableItems) => focusableItems[focusableItems.length - 1]
                    },
                    { // Leaving last focusable element forwards
                        check: (e, $element, focusableItems) => methods.tabKey.leavingFromElement(focusableItems[focusableItems.length - 1]) && !e.shiftKey,
                        getDestination: (focusableItems) => focusableItems[0]
                    }
                ],
            },
                methods = {
                    generateNamespacedEvent: (eventType, id) => {
                        return eventType + '.' + id;
                    },
                    elementOutsideContainer: ($element, $container) => {
                        return !($container.has($element).length)
                            && !($container.is($element)); // This is an inclusive check
                    },
                    event: {
                        getRelatedElement: (e) => {
                            if (e.relatedTarget !== null) { /* Chrome and FF support relatedTarget on focus out */
                                return $(e.relatedTarget);
                            } else { /* IE doesn't support relatedTarget but supports document.activeElement */
                                return $(document.activeElement);
                            }
                        },
                        getTargetElement: (e) => {
                            return $(e.target);
                        }
                    },
                    focus: {
                        leavingElement: {
                            createListener: (id, $element, callback) => {
                                $element.on(
                                    methods.generateNamespacedEvent('focusout', id),
                                    (e) => {
                                        if (methods.elementOutsideContainer(methods.event.getRelatedElement(e), $element)) {
                                            callback();
                                        }
                                    }
                                );
                            },
                            removeListener: (id, $element) => {
                                $element.off(
                                    methods.generateNamespacedEvent('focusout', id)
                                );
                            }
                        }
                    },
                    click: {
                        leavingElement: {
                            createListener: (id, $element, callback) => {
                                $(document).on(
                                    methods.generateNamespacedEvent('click', id),
                                    (e) => {
                                        if (methods.elementOutsideContainer(methods.event.getTargetElement(e), $element)) {
                                            callback();
                                        }
                                    }
                                );
                            },
                            removeListener: (id, $element) => {
                                $(document).off(
                                    methods.generateNamespacedEvent('click', id)
                                );
                            }
                        }
                    },
                    tabKey: {
                        leavingFromElement: (element) => {
                            return document.activeElement === element;
                        },
                        tabToCorrectElement: (e, $element, focusableItems) => {
                            let scenario = constants.tabKeyScenarios.find(scenario => scenario.check(e, $element, focusableItems));
                            if (scenario) {
                                e.preventDefault();
                                scenario.getDestination(focusableItems).focus();
                            }
                        },
                        trap: (id, $element) => {
                            let focusableItems = $element.find(':focusable');  // Need jQuery UI for this
                            $element.focus();
        
                            $element.on(
                                methods.generateNamespacedEvent('keydown', id),
                                (e) => {
                                    if (e.keyCode === 9) {
                                        methods.tabKey.tabToCorrectElement(e, $element, focusableItems);
                                    }
                                }
                            );
                        },
                        removeTrap: (id, $element) => {
                            $element.off(
                                methods.generateNamespacedEvent('keydown', id)
                            );
                        }
                    },
                    escapeKey: {
                        createListener: (id, callback) => {
                            if (!this.activeEscapableOverlayCallbacks.some(elem => elem.id === id)) {
                                this.activeEscapableOverlayCallbacks.push({ id, callback });
                            }
                        }
                    },
                    registerEscapeKeyListener: () => {
                        $(document).on(
                            methods.generateNamespacedEvent('keydown', 'global'),
                            (e) => {
                                if (e.keyCode === 27) {
                                    if (this.activeEscapableOverlayCallbacks.length) {
                                        this.activeEscapableOverlayCallbacks.pop().callback();
                                    }
                                }
                            }
                        )
                    },
                    init: () => {
                        methods.registerEscapeKeyListener();
                    }
                }

            methods.init();
        
            return {
                registerEscapableOverlay: methods.escapeKey.createListener,
                createOutsideClickListener: methods.click.leavingElement.createListener,
                removeOutsideClickListener: methods.click.leavingElement.removeListener,
                createFocusLeavingElementListener: methods.focus.leavingElement.createListener,
                removeFocusLeavingElementListener: methods.focus.leavingElement.removeListener,
                trapTabKey: methods.tabKey.trap,
                removeTrappedTabKey: methods.tabKey.removeTrap
            };
        })();
    }
}