export class DropdownService {
    constructor() {
        this.dropdowns = [];
        this.openDropdowns = [];
        this.public = this.createPublicMethods();
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
                    generateNamespacedClickEvent: (dropdownId) => {
                        return 'click.' + dropdownId;
                    },
                    toggleDropdown: (dropdown) => {
                        dropdown.scope.$apply(dropdown.ctrl.toggle());
    
                        if (dropdown.ctrl.showMenu) {
                            $(document).on(
                                service.methods.generateNamespacedClickEvent(dropdown.dropdownId),
                                service.methods.toggleDropdown.bind(this, dropdown)
                            );
                            service.methods.closeOpenDropdowns();
                            service.props.openDropdowns.add(dropdown);
                        } else {
                            $(document).off(
                                service.methods.generateNamespacedClickEvent(dropdown.dropdownId)
                            );
                            service.props.openDropdowns.remove(dropdown);
                        }
                    }
                }
            },
                button = (() => {
                    const processClick = (e, dropdownId) => {
                        e.stopPropagation();
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