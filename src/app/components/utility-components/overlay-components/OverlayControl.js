export class OverlayControl {
    constructor() {
        this.overlayControl = this.createPublicOverlayControlFunctions();
    }

    createPublicOverlayControlFunctions() {
        return (() => {
            const methods = {
                focus: {
                    getElementGainingFocus: (e) => {
                        if (e.relatedTarget !== null) { /* Chrome and FF support relatedTarget on focus out */
                            return $(e.relatedTarget);
                        } else { /* IE doesn't support relatedTarget but supports document.activeElement */
                            return $(document.activeElement);
                        }
                    },
                    focusIsLeavingElement: (e, $element) => {
                        return !($($element).has(methods.focus.getElementGainingFocus(e)).length)
                            && !($element.is(methods.focus.getElementGainingFocus(e)));
                    },
                    leavingElement: {
                        createListener: (id, $element, callback) => {
                            $element.on(
                                methods.generateNamespacedEvent('focusout', id),
                                (e) => {
                                    if (methods.focus.focusIsLeavingElement(e, $element)) {
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
                tabKey: {
                    tabToCorrectElement: (e, $element, $focusableItems) => {
                        if (methods.focus.focusIsLeavingElement(e, $element)) {
                            if (e.shiftKey) {
                                $focusableItems.slice(-1).focus(); // Should we do $focusableItems[$focusableItems.length - 1].focus()?
                            } else {
                                $focusableItems[0].focus();
                            }
                        }
                    },
                    trap: (id, $element) => {
                        let $focusableItems = $element.find(':focusable');  // Need jQuery UI for this
                        $focusableItems[0].focus(); // Force focus onto first focusable item

                        $element.on(
                            methods.generateNamespacedEvent('focusout', id),
                            (e) => {
                                tabToCorrectElement(e, $element, $focusableItems);
                            }
                        );
                    },
                    removeTrap: (id, $element) => {
                        $element.off(
                            methods.generateNamespacedEvent('focusout', id)
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
                },
                outsideClick: {
                    createListener: (id, $element, callback) => {
                        $(document).on(
                            methods.generateNamespacedEvent('click', id),
                            (e) => {
                                if (methods.focus.focusIsLeavingElement(e, $element)) {
                                    callback();
                                }
                            }
                        )
                    },
                    removeListener: (id) => {
                        $(document).off(
                            methods.generateNamespacedEvent('click', id)
                        );
                    }
                },
                generateNamespacedEvent: (eventType, id) => {
                    return eventType + '.' + id;
                }
            };

            return {
                createEscapeListener: methods.escapeKey.createListener,
                removeEscapeListener: methods.escapeKey.removeListener,
                createOutsideClickListener: methods.outsideClick.createListener,
                removeOutsideClickListener: methods.outsideClick.removeListener,
                createFocusLeavingElementListener: methods.focus.leavingElement.createListener,
                removeFocusLeavingElementListener: methods.focus.leavingElement.removeListener,
                trapTabKey: methods.tabKey.trap,
                removeTrappedTabKey: methods.tabKey.removeTrap
            };
        })();
    }
}