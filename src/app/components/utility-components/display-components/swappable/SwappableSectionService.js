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
                    swappableContainer: '.swappable-section-container'
                },
                props: {
                    swappableSectionGroups: {
                        add: (swappableSectionGroupElem, swapCtrl) => {
                            this.swappableSectionGroups.push({
                                status: {
                                    activeIndex: 0
                                },
                                swappableId: swapCtrl.swappableId,
                                swappableSectionContainer: swappableSectionGroupElem.children(service.constants.swappableContainer),
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
                        elem.addClass('ng-hide');
                    },
                    showSwappableSection: (elem) => {
                        elem.removeClass('ng-hide');
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
                        console.log("Showing swappable sections");
                        inBetweenSwappableSections.forEach(
                            elem => service.methods.showSwappableSection(elem)
                        );
                    },
                    hideInBetweenSwappableSections: (swappableSectionContainer, inBetweenSwappableSections, newActiveSection) => {
                        console.log("hiding swappable sections");
                        console.log("swappableSectionContainer: " + util.inspect(swappableSectionContainer));
                        swappableSectionContainer.one('transitionend', (e) => {
                            console.log("transition ended: " + e.propertyName);
                            inBetweenSwappableSections.forEach(
                                elem => {
                                    console.log("elem: " + util.inspect(elem) + "\nnewActiveSection: " + util.inspect(newActiveSection) + "\nelem !== newActiveSection: " + (elem !== newActiveSection));
                                    if (elem !== newActiveSection) { service.methods.hideSwappableSection(elem) };
                                }
                            );
                        });
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
                        // service.methods.hideInBetweenSwappableSections(swappableSectionGroup.swappableSectionContainer, inBetweenSwappableSections, elem);
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
                                    console.log("swappableShowWhen changed to true for " + util.inspect(elem[0]));
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