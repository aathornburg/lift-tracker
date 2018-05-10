export class Swappable {
    /* @ngInject */
    constructor(swappableSectionService) {
        this.swappableId = swappableSectionService.generateSwappableSectionId();
    }

}