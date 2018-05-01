export class TooltipService {
    constructor(overlayControl) {
        this.tooltips = [];
        this.openTooltips = [];
        this.overlayControl = overlayControl.public;
        this.public = this.createPublicMethods();
    }

    generateTooltipId() {
        return this.tooltips.length + 1;
    }

    createPublicMethods() {
        return (() => {
            const constant = {
                priority: {
                    hover: 1,
                    click: 2
                }
            },
                service = {
                    props: {
                        tooltips: {
                            add: (scope, tooltipElem, anchorElem, ctrl) => {
                                this.tooltips.push(
                                    {
                                        status: {
                                            open: false,
                                            openPriority: 0
                                        },
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
                            this.overlayControl.createOutsideClickListener(
                                tooltip.tooltipId,
                                tooltip.anchorElem,
                                directive.tooltip.close.bind(this, tooltip)
                            );
                            this.overlayControl.createFocusLeavingElementListener(
                                tooltip.tooltipId,
                                tooltip.anchorElem,
                                directive.tooltip.close.bind(this, tooltip)
                            );
                            this.overlayControl.registerEscapableOverlay(
                                directive.tooltip.close.bind(this, tooltip)
                            );
                        },
                        closeTooltip: (tooltip) => {
                            this.overlayControl.removeOutsideClickListener(tooltip.tooltipId, tooltip.anchorElem);
                            this.overlayControl.removeFocusLeavingElementListener(tooltip.tooltipId, tooltip.anchorElem);
                            tooltip.tooltipElem.removeClass('show');
                        }
                    }
                },
                directive = {
                    anchor: {
                        init: (tooltip) => {
                            tooltip.anchorElem
                                .on('mouseenter', (e) => {
                                    directive.tooltip.open(tooltip, { priority: constant.priority.hover });
                                })
                                .on('mouseleave', (e) => {
                                    directive.tooltip.close(tooltip, { priority: constant.priority.hover });
                                })
                                .on('click', (e) => {
                                    directive.tooltip.toggle(tooltip, { priority: constant.priority.click });
                                });
                        }
                    },
                    tooltip: {
                        open: (tooltip, options) => {
                            if (options && (tooltip.status.openPriority > options.priority)) { return; }

                            tooltip.status = {
                                open: true,
                                openPriority: options.priority
                            };

                            tooltip.scope.$apply(tooltip.ctrl.open());
                        },
                        close: (tooltip, options) => {
                            if (options && (tooltip.status.openPriority > options.priority)) { return; }

                            tooltip.status = {
                                open: false,
                                openPriority: 0
                            }

                            tooltip.scope.$apply(tooltip.ctrl.close());
                        },
                        toggle: (tooltip, options) => {
                            if (tooltip.status.openPriority < options.priority) {
                                directive.tooltip.open(tooltip, options);
                            } else if (tooltip.status.openPriority === options.priority) {
                                if (!tooltip.status.open) {
                                    directive.tooltip.open(tooltip, options);
                                } else {
                                    directive.tooltip.close(tooltip, options);
                                }
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