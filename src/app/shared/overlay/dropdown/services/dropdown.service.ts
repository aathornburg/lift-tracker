import { Injectable } from '@angular/core';
import { Dropdown } from '../model/dropdown';
import { OverlayService } from '../../services/overlay.service';
import { FocusService } from '../../../focus/services/focus.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DropdownService {

  dropdowns: Dropdown[] = [];
  openDropdown: BehaviorSubject<string> = new BehaviorSubject<string>('');
  closeDropdown: BehaviorSubject<string> = new BehaviorSubject<string>('');
  toggleDropdown: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private overlayService: OverlayService, private focusService: FocusService) { }

  registerDropdown(dropdownName: string, dropdownMenu: any) {
    const dropdown = this.getOrCreateDropdown(dropdownName);
    dropdown.dropdownMenu = dropdownMenu;
  }

  registerDropdownButton(dropdownName: string, dropdownButton: any) {
    const dropdown = this.getOrCreateDropdown(dropdownName);
    dropdown.dropdownButton = dropdownButton;
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
      this.closeDropdown.next(dropdownName);
    }
  }

  registerDropdownFocusOut(event: any, dropdownName: string): void {
    if (this.focusService.focusOutEventHasRelatedTarget(event)) {
      const dropdown = this.getOrCreateDropdown(dropdownName);
      if (this.focusService.focusIsLeavingElements(event, [dropdown.dropdownButton, dropdown.dropdownMenu])) {
        this.closeDropdown.next(dropdownName);
      }
    }
  }

}
