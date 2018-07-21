import { Injectable, EventEmitter, ElementRef } from '@angular/core';
import { Dropdown } from './Dropdown';

@Injectable()
export class DropdownService {

  dropdowns: Dropdown[] = [];
  openDropdown: EventEmitter<string> = new EventEmitter<string>();
  closeDropdown: EventEmitter<string> = new EventEmitter<string>();
  toggleDropdown: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  registerDropdown(dropdownName: string, dropdownMenu: ElementRef) {
    const dropdown = this.getOrRegisterDropdown(dropdownName);
    dropdown.dropdownMenu = dropdownMenu;
  }

  registerDropdownButton(dropdownName: string, dropdownButton: ElementRef) {
    const dropdown = this.getOrRegisterDropdown(dropdownName);
    dropdown.dropdownButton = dropdownButton;
  }

  triggerDropdownOpen(dropdownName: string): void {
    this.openDropdown.emit(dropdownName);
  }

  triggerDropdownClose(dropdownName: string): void {
    this.closeDropdown.emit(dropdownName);
  }

  triggerDropdownToggle(dropdownName: string): void {
    this.toggleDropdown.emit(dropdownName);
  }

  getOrRegisterDropdown(dropdownName: string): Dropdown {
    const foundDropdown = this.dropdowns.find(
      dropdown => dropdown.dropdownName === dropdownName
    );

    if (foundDropdown) {
      return foundDropdown;
    } else {
      this.dropdowns.push(new Dropdown(dropdownName));
      return this.dropdowns[this.dropdowns.length - 1];
    }
  }

  registerDocumentClick(event: any, dropdownName: string): void {
    const dropdown = this.getOrRegisterDropdown(dropdownName);
    if (!dropdown.dropdownMenu.nativeElement.contains(event.target)
        && !dropdown.dropdownButton.nativeElement.contains(event.target)) {
      this.triggerDropdownClose(dropdownName);
    }
  }

}
