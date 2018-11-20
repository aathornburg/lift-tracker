import { Directive, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { DropdownService } from '../../services/dropdown.service';

@Directive({
  selector: '[ltOpenDropdown]'
})
export class OpenDropdownDirective implements OnInit {

  // tslint:disable-next-line:no-input-rename
  @Input('ltOpenDropdown') dropdownToToggle: string;

  constructor(private dropdownService: DropdownService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.dropdownService.registerDropdownButton(this.dropdownToToggle, this.elementRef.nativeElement);
  }

  @HostListener('click', ['$event'])
  elementClick(event: any): void {
    this.dropdownService.toggleDropdown.next(this.dropdownToToggle);
  }

  @HostListener('focusout', ['$event'])
  elementFocusOut(event: any): void {
    this.dropdownService.registerDropdownFocusOut(event, this.dropdownToToggle);
  }

}
