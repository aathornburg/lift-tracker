import { Injectable, EventEmitter } from '@angular/core';
import { Dropdown } from '../model/dropdown';
import { OverlayService } from '../../services/overlay.service';
import { FocusService } from '../../../focus/services/focus.service';

@Injectable()
export class DropdownService {

  dropdowns: Dropdown[] = [];
  openDropdown: EventEmitter<string> = new EventEmitter<string>();
  closeDropdown: EventEmitter<string> = new EventEmitter<string>();
  toggleDropdown: EventEmitter<string> = new EventEmitter<string>();

  constructor(private overlayService: OverlayService, private focusService: FocusService) { }

  registerDropdown(dropdownName: string, dropdownMenu: any) {
    const dropdown = this.getOrCreateDropdown(dropdownName);
    dropdown.dropdownMenu = dropdownMenu;
  }

  registerDropdownButton(dropdownName: string, dropdownButton: any) {
    const dropdown = this.getOrCreateDropdown(dropdownName);
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

  getOrCreateDropdown(dropdownName: string): Dropdown {
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
    const dropdown = this.getOrCreateDropdown(dropdownName);
    if (!this.overlayService.clickIsInsideElements(event, [dropdown.dropdownButton, dropdown.dropdownMenu])) {
      this.triggerDropdownClose(dropdownName);
    }
  }

  registerDropdownFocusOut(event: any, dropdownName: string): void {
    const dropdown = this.getOrCreateDropdown(dropdownName);
    if (this.focusService.focusIsLeavingElements(event, [dropdown.dropdownButton, dropdown.dropdownMenu])) {
      this.triggerDropdownClose(dropdownName);
    }
  }

}
