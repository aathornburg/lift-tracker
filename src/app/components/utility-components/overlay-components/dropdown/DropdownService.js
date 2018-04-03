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

    createPublicMethods() {
        return (() => {
            const service = {
                props: {
                    dropdowns: {
                        add: (scope, menuElem, openElems, ctrl) => {
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

                            return this.dropdowns[this.dropdowns.length - 1];
                        }
                    }
                },
                methods: {
                    getDropdown: (dropdownId) => {
                        return this.dropdowns.find(
                            dropdown => dropdown.dropdownId === dropdownId
                        );
                    },
                    openDropdown: (dropdown) => {
                        dropdown.menuElem.removeClass('ng-hide');
                        this.overlayControl.createFocusLeavingElementListener(
                            dropdown.dropdownId,
                            dropdown.allDropdownElems,
                            directive.dropdown.toggle.bind(this, dropdown)
                        );
                        this.overlayControl.createEscapeKeyListener(
                            dropdown.dropdownId,
                            directive.dropdown.toggle.bind(this, dropdown)
                        );
                    },
                    closeDropdown: (dropdown) => {
                        this.overlayControl.removeFocusLeavingElementListener(dropdown.dropdownId, dropdown.allDropdownElems);
                        this.overlayControl.removeEscapeKeyListener(dropdown.dropdownId);
                        dropdown.menuElem.addClass('ng-hide');
                    }
                }
            },
                directive = {
                    button: {
                        processClick: (dropdown) => {
                            directive.dropdown.toggle(dropdown);
                        },
                        init: (dropdown) => {
                            dropdown.openElems.on('click', (e) => {
                                directive.button.processClick(dropdown);
                            });
                        }
                    },
                    dropdown: {
                        toggle: (dropdown) => {
                            dropdown.scope.$apply(dropdown.ctrl.toggle());
                        },
                        createWatcher: (scope, dropdown) => {
                            scope.$watch('dropdownCtrl.showMenu', (newVal, oldVal) => {
                                if (newVal !== oldVal) {
                                    if (newVal === true) {
                                        service.methods.openDropdown(dropdown);
                                    } else {
                                        service.methods.closeDropdown(dropdown);
                                    }
                                }
                            });
                        },
                        init: (scope, menuElem, openElems, ctrl) => {
                            let dropdown = service.props.dropdowns.add(scope, menuElem, openElems, ctrl);
                            directive.dropdown.createWatcher(scope, dropdown);
                            directive.button.init(dropdown);
                        }
                    }
                }
        
            return {
                dropdownInit: directive.dropdown.init,
            };
        })();
    }
}