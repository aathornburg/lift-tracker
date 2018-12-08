import { Directive, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { DropdownService } from '../../services/dropdown.service';

@Directive({
  selector: '[ltOpenDropdown]'
})
export class OpenDropdownDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('ltOpenDropdown') dropdownName: string;
  @Input() toggleOnClick: boolean = true;

  constructor(private dropdownService: DropdownService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.dropdownService.registerDropdownButton(this.dropdownName, this.elementRef.nativeElement);
  }

  @HostListener('click', ['$event'])
  elementClick(event: any): void {
    if (this.toggleOnClick) {
      this.dropdownService.toggleDropdown.next(this.dropdownName);
    } else {
      this.dropdownService.openDropdown.next(this.dropdownName)
    }
  }

  @HostListener('focusout', ['$event'])
  elementFocusOut(event: any): void {
    this.dropdownService.registerDropdownFocusOut(event, this.dropdownName);
  }

}
