import { Component, OnInit, Input, ElementRef, HostListener} from '@angular/core';
import { DropdownService } from '../../services/dropdown.service';

@Component({
  selector: 'lt-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {

  @Input() dropdownName: string;
  show = false;

  constructor(private dropdownService: DropdownService, public elementRef: ElementRef) { }

  ngOnInit(): void {
    this.dropdownService.registerDropdown(this.dropdownName, this.elementRef.nativeElement);

    this.dropdownService.openDropdown.subscribe(
      dropdownName => this.openDropdownIfNameMatches(dropdownName)
    );

    this.dropdownService.closeDropdown.subscribe(
      dropdownName => this.closeDropdownIfNameMatches(dropdownName)
    );

    this.dropdownService.toggleDropdown.subscribe(
      dropdownName => this.toggleDropdownIfNameMatches(dropdownName)
    );
  }

  openDropdownIfNameMatches(dropdownName: string): void {
    if (this.dropdownName === dropdownName) {
      this.open();
    }
  }

  closeDropdownIfNameMatches(dropdownName: string): void {
    if (this.dropdownName === dropdownName) {
      this.close();
    }
  }

  toggleDropdownIfNameMatches(dropdownName: string): void {
    if (this.dropdownName === dropdownName) {
      if (this.show) {
        this.close();
      } else {
        this.open();
      }
    } else {
      this.close();
    }
  }

  open(): void {
    this.show = true;
  }

  close(): void {
    this.show = false;
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: any): void {
    if (this.show) {
      this.dropdownService.registerDocumentClick(event, this.dropdownName);
    }
  }

  @HostListener('focusout', ['$event'])
  elementFocusOut(event: any): void {
    this.dropdownService.registerDropdownFocusOut(event, this.dropdownName);
  }
}
