export class DropdownHelper {

    /** Static variables at bottom */
    constructor(scope, dropdownCtrl) {
        this.scope = scope;
        this.ctrl = dropdownCtrl;
        this.public = this.createPublicMethods();
    }

    /** Module pattern (https://toddmotto.com/mastering-the-module-pattern/) for public/private methods */
    createPublicMethods() {
        return (() => {
            const _static = {
                vars: {
                    openDropdowns: {
                        add: (openDropdownInst) => {
                            DropdownHelper.openDropdowns.push(openDropdownInst);
                        },
                        remove: (openDropdownInst) => {
                            DropdownHelper.openDropdowns = DropdownHelper.openDropdowns.filter(
                                openDropdown => openDropdown != openDropdownInst
                            );
                        }
                    }
                },
                closeOpenDropdowns: () => {
                    DropdownHelper.openDropdowns.forEach(
                        openDropdown => openDropdown.getHelper().public.toggleDropdown()
                    );
                }
            },
                toggleDropdown = () => {
                    this.scope.$apply(this.ctrl.toggle());
            
                    if (this.ctrl.showMenu) {
                        $(document).on('click', toggleDropdown);
                        _static.closeOpenDropdowns();
                        _static.vars.openDropdowns.add(this.ctrl);
                    } else {
                        $(document).off('click', toggleDropdown);
                        _static.vars.openDropdowns.remove(this.ctrl);
                    }
                },
                button = (() => {
                    const processClick = (e) => {
                        e.stopPropagation();
                        toggleDropdown();
                    },
                        init = (elem) => {
                            elem.on('click', (e) => {
                                processClick(e);
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
                        createWatcher = (elem, dropdownCtrl) => {
                            this.scope.$watch('dropdownCtrl.showMenu', (newVal, oldVal) => {
                                if (newVal !== oldVal) {
                                    if (newVal === true) {
                                        elem.removeClass('ng-hide');
                                    } else {
                                        elem.addClass('ng-hide');
                                    }
                                }
                            });
                        },
                        init = (elem, dropdownCtrl) => {
                            createClickListener(elem);
                            createWatcher(elem, dropdownCtrl);
                        }

                    return {
                        init: init
                    };
                })();
        
            return {
                toggleDropdown: toggleDropdown,
                buttonInit: button.init,
                menuInit: menu.init
            };
        })();
    }
}

DropdownHelper.openDropdowns = [];