import { OverlayControl } from '../OverlayControl';

export class DropdownService extends OverlayControl {
    constructor() {
        super();
        this.dropdowns = [];
        this.openDropdowns = [];
        this.public = this.createPublicMethods();
    }

    generateDropdownId() {
        return this.dropdowns.length + 1;
    }

    register(scope, menuElem, openElems, ctrl) {
        this.dropdowns.push((() => {
            const getAllDropdownRelatedElems = () => {
                return menuElem.add(openElems);
            };

            return {
                dropdownId: ctrl.dropdownId,
                scope,
                menuElem,
                openElems,
                allDropdownElems: getAllDropdownRelatedElems(),
                ctrl
            };
        })());
    }

    createPublicMethods() {
        return (() => {
            const service = {
                props: {
                    openDropdowns: {
                        add: (openDropdownInst) => {
                            this.openDropdowns.push(openDropdownInst);
                        },
                        remove: (openDropdownInst) => {
                            this.openDropdowns = this.openDropdowns.filter(
                                openDropdown => openDropdown != openDropdownInst
                            );
                        }
                    }
                },
                methods: {
                    updateDropdownWithElement: (dropdownId, elem) => {
                        service.methods.getDropdown(dropdownId).elem = elem;
                    },
                    getDropdown: (dropdownId) => {
                        return this.dropdowns.find(
                            dropdown => dropdown.dropdownId === dropdownId
                        );
                    },
                    closeOpenDropdowns: () => {
                        this.openDropdowns.forEach(
                            openDropdown => service.methods.toggleDropdown(openDropdown)
                        );
                    },
                    toggleDropdown: (dropdown) => {
                        dropdown.scope.$apply(dropdown.ctrl.toggle());

                        if (dropdown.ctrl.showMenu) {
                            dropdown.allDropdownElems.on(
                                this.overlayControl.generateNamespacedEvent('focusout', dropdown.dropdownId),
                                (e) => {
                                    if (this.overlayControl.focusIsLeavingElement(e, dropdown.allDropdownElems)) {
                                        service.methods.toggleDropdown(dropdown);
                                    }
                                }
                            );
                        } else {
                            dropdown.allDropdownElems.off(this.overlayControl.generateNamespacedEvent('focusout', dropdown.dropdownId));
                        }
                    }
                }
            },
                button = (() => {
                    const processClick = (e, dropdownId) => {
                        service.methods.toggleDropdown(service.methods.getDropdown(dropdownId));
                    },
                        init = (elem, dropdownId) => {
                            elem.on('click', (e) => {
                                processClick(e, dropdownId);
                            });
                        };
        
                    return {
                        init: init
                    };
                })(),
                menu = (() => {
                    const createWatcher = (elem, dropdownCtrl, dropdown) => {
                            dropdown.scope.$watch('dropdownCtrl.showMenu', (newVal, oldVal) => {
                                if (newVal !== oldVal) {
                                    if (newVal === true) {
                                        elem.removeClass('ng-hide');
                                    } else {
                                        elem.addClass('ng-hide');
                                    }
                                }
                            });
                        },
                        init = (elem, dropdownCtrl, dropdownId) => {
                            createWatcher(elem, dropdownCtrl, service.methods.getDropdown(dropdownId));
                        };
        
                    return {
                        init: init
                    };
                })();
        
            return {
                buttonInit: button.init,
                menuInit: menu.init
            };
        })();
    }
}