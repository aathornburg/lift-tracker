export class DropdownHelper {
    constructor(scope, dropdownCtrl) {
        this.scope = scope;
        this.ctrl = dropdownCtrl;
        this.public = this.createPublicMethods();
    }

    createPublicMethods() {
        return (() => {
            const button = {
                toggleDropdown: (e) => {
                    this.scope.$apply(this.ctrl.toggle());
            
                    if (this.ctrl.showMenu) {
                        $(document).on('click', button.toggleDropdown);
                    } else {
                        $(document).off('click', button.toggleDropdown);
                    }
                },
                processClick: (e) => {
                    e.stopPropagation();
                    button.toggleDropdown(e);
                }
            },
                menu = {
                    init: (elem, dropdownCtrl) => {
                        this.scope.$watch('dropdownCtrl.showMenu', (newVal, oldVal) => {
                            if (newVal !== oldVal) {
                                if (newVal === true) {
                                    elem.removeClass('ng-hide');
                                } else {
                                    elem.addClass('ng-hide');
                                }
                            }
                        });
                    }
                };
        
            return {
                processButtonClick: button.processClick,
                menuInit: menu.init
            };
        })();
    }

    // methods = (() => {
    //     test = () => {
    //         console.log("in test");
    //     };

    //     return {
    //         test: test
    //     };
    // });
}


// const dropdownHelper = (($) => {
//     let state = {
//         scope: null,
//         ctrl: null
//     },
//         methods = (() => {
//             const toggleDropdown = (e) => {
//                 state.scope.$apply(state.ctrl.toggle());
        
//                 if (state.ctrl.showMenu) {
//                     $(document).on('click', toggleDropdown);
//                 } else {
//                     $(document).off('click', toggleDropdown);
//                 }
//             },
//                 processButtonClick = (e) => {
//                     e.stopPropagation();
        
//                     toggleDropdown(e);
//                 },
//                 init = (scope, dropdownCtrl) => {
//                     console.log("In init");
//                     state.scope = scope;
//                     state.ctrl = dropdownCtrl;
//                 };
        
//             return {
//                 init: init,
//                 processButtonClick: processButtonClick
//             };
//         })();
    
//     return {
//         init: methods.init,
//         processButtonClick: methods.processButtonClick
//     };
// })(jQuery);