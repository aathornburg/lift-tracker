import { ElementRef } from '@angular/core';

export class Dropdown {

    public dropdownMenu: ElementRef;
    public dropdownButton: ElementRef;

    constructor(public dropdownName?: string) { }
}
