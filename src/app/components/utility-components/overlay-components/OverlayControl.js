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
                getElementGainingFocus: (e) => {
                    if (e.relatedTarget !== null) { /* Chrome and FF support relatedTarget on focus out */
                        return $(e.relatedTarget);
                    } else { /* IE doesn't support relatedTarget but supports document.activeElement */
                        return $(document.activeElement);
                    }
                },
                focusIsLeavingElement: (e, $element) => {
                    return !($($element).has(methods.getElementGainingFocus(e)).length)
                        && !($element.is(methods.getElementGainingFocus(e)));
                }
            };

            return {
                generateNamespacedEvent: methods.generateNamespacedEvent,
                focusIsLeavingElement: methods.focusIsLeavingElement
            };
        })();
    }
}