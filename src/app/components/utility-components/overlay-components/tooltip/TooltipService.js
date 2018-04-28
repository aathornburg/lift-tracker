import { OverlayControl } from '../OverlayControl';

export class TooltipService extends OverlayControl {
    constructor() {
        super();
        this.tooltips = [];
        this.openTooltips = [];
        this.public = this.createPublicMethods();
    }

    generateTooltipId() {
        return this.tooltips.length + 1;
    }

    createPublicMethods() {
        return (() => {
            const service = {
                props: {
                    tooltips: {
                        add: (scope, tooltipElem, anchorElem, ctrl) => {
                            this.tooltips.push(
                                {
                                    tooltipId: ctrl.tooltipId,
                                    scope,
                                    tooltipElem,
                                    anchorElem,
                                    ctrl
                                }
                            );

                            return this.tooltips[this.tooltips.length - 1];
                        }
                    }
                },
                methods: {
                    getTooltip: (tooltipId) => {
                        return this.tooltips.find(
                            tooltip => tooltip.tooltipId === tooltipId
                        );
                    },
                    openTooltip: (tooltip) => {
                        tooltip.tooltipElem.addClass('show');
                        this.overlayControl.createFocusLeavingElementListener(
                            tooltip.tooltipId,
                            tooltip.anchorElem,
                            directive.tooltip.click.toggle.bind(this, tooltip)
                        );
                        this.overlayControl.createEscapeKeyListener(
                            tooltip.tooltipId,
                            directive.tooltip.click.toggle.bind(this, tooltip)
                        );
                    },
                    closeTooltip: (tooltip) => {
                        this.overlayControl.removeFocusLeavingElementListener(tooltip.tooltipId, tooltip.anchorElem);
                        this.overlayControl.removeEscapeKeyListener(tooltip.tooltipId);
                        tooltip.tooltipElem.removeClass('show');
                    }
                }
            },
                directive = {
                    anchor: {
                        init: (tooltip) => {
                            tooltip.anchorElem.on('click', (e) => {
                                directive.tooltip.click.toggle(tooltip);
                            });
                        }
                    },
                    tooltip: {
                        click: {
                            toggle: (tooltip) => {
                                tooltip.scope.$apply(tooltip.ctrl.toggle());
                            }
                        },
                        createWatcher: (scope, tooltip) => {
                            scope.$watch('tooltipCtrl.showTooltip', (newVal, oldVal) => {
                                if (newVal !== oldVal) {
                                    if (newVal === true) {
                                        service.methods.openTooltip(tooltip);
                                    } else {
                                        service.methods.closeTooltip(tooltip);
                                    }
                                }
                            });
                        },
                        init: (scope, tooltipElem, anchorElem, ctrl) => {
                            let tooltip = service.props.tooltips.add(scope, tooltipElem, anchorElem, ctrl);
                            directive.tooltip.createWatcher(scope, tooltip);
                            directive.anchor.init(tooltip);
                        }
                    }
                }
        
            return {
                tooltipInit: directive.tooltip.init,
            };
        })();
    }
}