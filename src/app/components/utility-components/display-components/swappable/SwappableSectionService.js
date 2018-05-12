import util from 'util';

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
                methods: {
                    getSwappableSectionGroup: (swappableId) => {
                        return this.swappableSectionGroups.find(
                            swappableSectionGroup => swappableSectionGroup.swappableId === swappableId
                        );
                    },
                    addSwappableSectionToGroup: (swappableSectionGroup, sectionElem) => {
                        swappableSectionGroup.swappableSections.push(
                            sectionElem
                        );
                    },
                    hideSwappableSection: (elem) => {
                        elem.addClass('hide-swappable-section');
                    },
                    showSwappableSection: (elem) => {
                        elem.removeClass('hide-swappable-section');
                    },
                    indexInRange: (index, firstRangeVal, secondRangeVal) => {
                        // TODO: Clean this up
                        if (firstRangeVal < secondRangeVal) {
                            return (index >= firstRangeVal) && (index <= secondRangeVal);
                        } else if (secondRangeVal < firstRangeVal) {
                            return (index >= secondRangeVal) && (index <= firstRangeVal);
                        }
                    },
                    getInBetweenSwappableSections: (swappableSectionGroup, oldActiveIndex, newActiveIndex) => {
                        let inBetweenSwappableSections = [];

                        swappableSectionGroup.swappableSections.forEach(
                            (elem, forEachIndex) => {
                                if (service.methods.indexInRange(forEachIndex, oldActiveIndex, newActiveIndex)) {
                                    inBetweenSwappableSections.push(elem);
                                }
                            }
                        );

                        return inBetweenSwappableSections;
                    },
                    showInBetweenSwappableSections: (inBetweenSwappableSections) => {
                        inBetweenSwappableSections.forEach(
                            elem => service.methods.showSwappableSection(elem)
                        );
                    },
                    hideAllInBetweenSwappableSections: (inBetweenSwappableSections, newActiveSection) => {
                        inBetweenSwappableSections.forEach(
                            elem => {
                                if (elem !== newActiveSection) { service.methods.hideSwappableSection(elem) };
                            }
                        );
                    },
                    hideInBetweenSwappableSections: (swappableSectionContainer, inBetweenSwappableSections, newActiveSection) => {
                        if (swappableSectionContainer.is(':visible')) {
                            swappableSectionContainer.off('transitionend');
                            swappableSectionContainer.on('transitionend', (e) => {
                                if (e.originalEvent.propertyName === service.constants.transitionTransform) {
                                    service.methods.hideAllInBetweenSwappableSections(inBetweenSwappableSections, newActiveSection);
                                    swappableSectionContainer.off('transitionend');
                                }
                            });
                        } else {
                            service.methods.hideAllInBetweenSwappableSections(inBetweenSwappableSections, newActiveSection);
                        }
                    },
                    scrollToSwappableSection: (swappableSectionContainer, newActiveIndex) => {
                        swappableSectionContainer.css(
                            'transform',
                            'translateX(-' + newActiveIndex + '00%)'
                        );
                    },
                    swapTo: (swappableSectionGroup, elem) => {
                        let newActiveIndex = swappableSectionGroup.swappableSections.indexOf(elem);
                        let inBetweenSwappableSections = service.methods.getInBetweenSwappableSections(
                            swappableSectionGroup, swappableSectionGroup.status.activeIndex, newActiveIndex);
                        
                        service.methods.showInBetweenSwappableSections(inBetweenSwappableSections);
                        service.methods.scrollToSwappableSection(swappableSectionGroup.swappableSectionContainer, newActiveIndex);
                        service.methods.hideInBetweenSwappableSections(swappableSectionGroup.swappableSectionContainer, inBetweenSwappableSections, elem);
                        swappableSectionGroup.status.activeIndex = newActiveIndex;
                    }
                }
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
                            let swappableSectionGroup = service.methods.getSwappableSectionGroup(swapCtrl.swappableId);
                            service.methods.addSwappableSectionToGroup(swappableSectionGroup, elem);
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