export class SwappableSectionService {
    constructor() {
        this.swappableSectionGroups = [];
        this.public = this.createPublicMethods();
    }

    generateSwappableSectionId() {
        return 'swappable-' + this.swappableSectionGroups.length + 1;
    }

    createPublicMethods() {
        return (() => {
            const service = {
                constants: {
                    swappableContainer: '.swappable-section-container',
                    transitionTransform: 'transform'
                },
                props: {
                    swappableSectionGroups: {
                        add: (swappableSectionGroupElem, swapCtrl) => {
                            this.swappableSectionGroups.push({
                                status: {
                                    activeIndex: 0
                                },
                                swappableId: swapCtrl.swappableId,
                                swappableSectionContainer: swappableSectionGroupElem.find(service.constants.swappableContainer),
                                swappableSections: []
                            });
                        }
                    }
                },
                methods: (() => {
                    const swappableSectionGroup = {
                        get: (swappableId) => {
                            return this.swappableSectionGroups.find(
                                swappableSectionGroup => swappableSectionGroup.swappableId === swappableId
                            );
                        },
                        addSwappableSection: (swappableSectionGroup, sectionElem) => {
                            swappableSectionGroup.swappableSections.push(
                                sectionElem
                            );
                        }
                    },
                        swappableSection = {
                            hide: (elem) => {
                                elem.addClass('hide-swappable-section');
                            },
                            show: (elem) => {
                                elem.removeClass('hide-swappable-section');
                            },
                            scrollTo: (swappableSectionContainer, newActiveIndex) => {
                                swappableSectionContainer.css(
                                    'transform',
                                    'translateX(-' + newActiveIndex + '00%)'
                                );
                            }
                        },
                        inBetweenSections = (() => {
                            const get = (() => {
                                const indexInRange = (index, firstRangeVal, secondRangeVal) => {
                                    // TODO: Clean this up
                                    if (firstRangeVal < secondRangeVal) {
                                        return (index >= firstRangeVal) && (index <= secondRangeVal);
                                    } else if (secondRangeVal < firstRangeVal) {
                                        return (index >= secondRangeVal) && (index <= firstRangeVal);
                                    }
                                },
                                    getInBetweenSections =  (swappableSectionGroup, oldActiveIndex, newActiveIndex) => {
                                        let inBetweenSwappableSections = [];
                
                                        swappableSectionGroup.swappableSections.forEach(
                                            (elem, forEachIndex) => {
                                                if (indexInRange(forEachIndex, oldActiveIndex, newActiveIndex)) {
                                                    inBetweenSwappableSections.push(elem);
                                                }
                                            }
                                        );
                
                                        return inBetweenSwappableSections;
                                    };

                                return getInBetweenSections;
                            })(),
                                show = (inBetweenSwappableSections) => {
                                    inBetweenSwappableSections.forEach(
                                        elem => swappableSection.show(elem)
                                    );
                                },
                                hide = (() => {
                                    const hideInactiveSections = (inBetweenSwappableSections, newActiveSection) => {
                                        inBetweenSwappableSections.forEach(
                                            elem => {
                                                if (elem !== newActiveSection) { swappableSection.hide(elem) };
                                            }
                                        );
                                    },
                                        hideInactiveSectionsOnTransitionEnd = (swappableSectionContainer, inBetweenSwappableSections, newActiveSection) => {
                                            /* transitionend only gets triggered when the element is visible.
                                            If the element isn't visible, we immediately hide the non-active sections */
                                            if (swappableSectionContainer.is(':visible')) {
                                                /* transitionend needs to be removed before adding a new listener in order
                                                to handle the case of a user interrupting the animation.  This
                                                ensures that the newest animation will always have precedence */
                                                swappableSectionContainer.off('transitionend');
                                                swappableSectionContainer.on('transitionend', (e) => {
                                                    // Other things (like 'visibility') can trigger the transitionend event
                                                    if (e.originalEvent.propertyName === service.constants.transitionTransform) {
                                                        hideInactiveSections(inBetweenSwappableSections, newActiveSection);
                                                    }
                                                });
                                            } else {
                                                hideInactiveSections(inBetweenSwappableSections, newActiveSection);
                                            }
                                        };

                                    return hideInactiveSectionsOnTransitionEnd;
                                })();

                            return {
                                get: get,
                                show: show,
                                hide: hide
                            }
                        })(),
                        swapTo = (swappableSectionGroup, elem) => {
                            let newActiveIndex = swappableSectionGroup.swappableSections.indexOf(elem);
                            let inBetweenSwappableSections = inBetweenSections.get(
                                swappableSectionGroup, swappableSectionGroup.status.activeIndex, newActiveIndex);
                            
                            inBetweenSections.show(inBetweenSwappableSections);
                            swappableSection.scrollTo(swappableSectionGroup.swappableSectionContainer, newActiveIndex);
                            inBetweenSections.hide(swappableSectionGroup.swappableSectionContainer, inBetweenSwappableSections, elem);
                            swappableSectionGroup.status.activeIndex = newActiveIndex;
                        }

                    return {
                        swapTo: swapTo,
                        swappableSectionGroup: swappableSectionGroup
                    };
                })(),
            },
                directive = {
                    swappableSectionGroup: {
                        init: (swappableSectionGroupElem, swapCtrl) => {
                            service.props.swappableSectionGroups.add(swappableSectionGroupElem, swapCtrl);
                        }
                    },
                    swappableSection: {
                        createWatcher: (swappableSectionGroup, attrs, elem) => {
                            attrs.$observe('swappableShowWhen', (showWhenVal) => {
                                if (showWhenVal === 'true') {
                                    service.methods.swapTo(swappableSectionGroup, elem);
                                }
                            })
                        },
                        init: (elem, attrs, swapCtrl) => {
                            let swappableSectionGroup = service.methods.swappableSectionGroup.get(swapCtrl.swappableId);
                            service.methods.swappableSectionGroup.addSwappableSection(swappableSectionGroup, elem);
                            directive.swappableSection.createWatcher(swappableSectionGroup, attrs, elem);
                        }
                    }
                }

            return {
                initSectionGroup: directive.swappableSectionGroup.init,
                initSection: directive.swappableSection.init
            };
        })();
    }
}