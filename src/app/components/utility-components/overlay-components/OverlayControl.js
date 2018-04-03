export class OverlayControl {
    constructor() {
        this.overlayControl = this.createPublicOverlayControlFunctions();
    }

    createPublicOverlayControlFunctions() {
        return (() => {
            const methods = {
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
                    leavingFromFirstFocusableElement: (e, $focusableItems) => {
                        return (document.activeElement === $focusableItems[0])
                            && e.shiftKey;
                    },
                    leavingFromLastFocusableElement: (e, $focusableItems) => {
                        return (document.activeElement === $focusableItems[$focusableItems.length - 1])
                            && !e.shiftKey;
                    },
                    tabToCorrectElement: (e, $element, $focusableItems) => {
                        if (methods.tabKey.leavingFromFirstFocusableElement(e, $focusableItems)) {
                            e.preventDefault();
                            $focusableItems[$focusableItems.length - 1].focus();
                        } else if (methods.tabKey.leavingFromLastFocusableElement(e, $focusableItems)) {
                            e.preventDefault();
                            $focusableItems[0].focus();
                        }
                    },
                    trap: (id, $element) => {
                        let $focusableItems = $element.find(':focusable');  // Need jQuery UI for this
                        $focusableItems[0].focus();

                        $element.on(
                            methods.generateNamespacedEvent('keydown', id),
                            (e) => {
                                if (e.keyCode === 9) {
                                    methods.tabKey.tabToCorrectElement(e, $element, $focusableItems);
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
                        $(document).on(
                            methods.generateNamespacedEvent('keydown', id),
                            (e) => {
                                if (e.keyCode === 27) {
                                    callback();
                                }
                            }
                        )
                    },
                    removeListener: (id) => {
                        $(document).off(
                            methods.generateNamespacedEvent('keydown', id)
                        );
                    }
                }
            };

            return {
                createEscapeKeyListener: methods.escapeKey.createListener,
                removeEscapeKeyListener: methods.escapeKey.removeListener,
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