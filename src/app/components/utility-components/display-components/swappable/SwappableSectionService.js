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
                                swappableId: swapCtrl.swappableId,
                                swappableSectionGroupElem,
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
                    swapTo: (swappableSectionGroup, elem) => {
                        swappableSectionGroup.swappableSectionContainer.css(
                            'transform',
                            'translateX(-' + swappableSectionGroup.swappableSections.indexOf(elem) + '00%)'
                        );
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
                                console.log("attr changed!");
                                if (showWhenVal === 'true') {
                                    console.log("attr changed to true");
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