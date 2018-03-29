import util from 'util';

export class DropdownService {
    constructor() {
        this.dropdowns = [];
        this.openDropdowns = [];
        this.public = this.createPublicMethods();
        this.public.serviceInit();
    }

    generateDropdownId() {
        return this.dropdowns.length + 1;
    }

    register(scope, ctrl) {
        this.dropdowns.push({
            dropdownId: ctrl.dropdownId,
            scope,
            ctrl
        });
    }

    createPublicMethods() {
        return (() => {
            const service = {
                props: {
                    clickListenerCreated: false,
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
                getDropdown: (dropdownId) => {
                    return this.dropdowns.find(
                        dropdown => dropdown.dropdownId === dropdownId
                    );
                },
                closeOpenDropdowns: () => {
                    this.openDropdowns.forEach(
                        openDropdown => toggleDropdown(openDropdown)
                    );
                },
                createDocumentClickListener: () => {
                    if (!service.props.clickListenerCreated) {
                        service.props.clickListenerCreated = true;
                        $(document).on('click', service.closeOpenDropdowns);
                    }
                },
                init: () => {
                    service.createDocumentClickListener();
                }
            },
                toggleDropdown = (dropdown) => {
                    dropdown.scope.$apply(dropdown.ctrl.toggle());

                    if (dropdown.ctrl.showMenu) {
                        service.closeOpenDropdowns();
                        service.props.openDropdowns.add(dropdown);
                    } else {
                        service.props.openDropdowns.remove(dropdown);
                    }
                },
                button = (() => {
                    const processClick = (e, dropdownId) => {
                        e.stopPropagation();
                        toggleDropdown(service.getDropdown(dropdownId));
                    },
                        init = (elem, dropdownId) => {
                            elem.on('click', (e) => {
                                processClick(e, dropdownId);
                            });
                        }
        
                    return {
                        init: init
                    };
                })(),
                menu = (() => {
                    const createClickListener = (elem) => {
                        elem.on('click', (e) => {
                            e.stopPropagation(); // Prevent closing of dropdown on menu click
                        })
                    },
                        createWatcher = (elem, dropdownCtrl, dropdown) => {
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
                            createClickListener(elem);
                            createWatcher(elem, dropdownCtrl, service.getDropdown(dropdownId));
                        }
        
                    return {
                        init: init
                    };
                })();
        
            return {
                serviceInit: service.init,
                buttonInit: button.init,
                menuInit: menu.init
            };
        })();
    }
}