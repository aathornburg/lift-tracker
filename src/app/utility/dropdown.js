/** Module pattern to allow public/private separation of functions */
export const dropdown = (() => {
    const methods = {
        init: ($element, lockTabKey) => {
            // TODO:  Implement lockTabKey functionality
        }
    };

    return {
        init: methods.init
    };
})();