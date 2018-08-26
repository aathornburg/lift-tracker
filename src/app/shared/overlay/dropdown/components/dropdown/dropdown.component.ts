import { Component, OnInit, Input, ElementRef, HostListener, HostBinding} from '@angular/core';
import { DropdownService } from '../../services/dropdown.service';
import { FadeSlideInOut } from '../../dropdown.animations';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[ltDropdown]',
  template: '<ng-content></ng-content>',
  animations: [ FadeSlideInOut ]
})
export class DropdownComponent implements OnInit {

  animationState = 'closed';
  @Input() dropdownName: string;
  @HostBinding('hidden') hidden = true;
  @HostBinding('@fadeSlideInOut') get fadeSlideInOut() {
    return { value: this.animationState };
  }

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
      if (this.hidden) {
        this.open();
      } else {
        this.close();
      }
    } else {
      this.close();
    }
  }

  open(): void {
    this.hidden = false;
    this.animationState = 'visible';
  }

  close(): void {
    this.animationState = 'closing';
  }

  @HostListener('@fadeSlideInOut.done')
  onAnimationDone(): void {
    if (this.animationState === 'closing') {
      this.hidden = true;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    if (!this.hidden) {
      this.dropdownService.registerDocumentClick(event, this.dropdownName);
    }
  }

  @HostListener('focusout', ['$event'])
  onElementFocusOut(event: any): void {
    this.dropdownService.registerDropdownFocusOut(event, this.dropdownName);
  }

  @HostListener('document:keydown.escape')
  onDocumentEscape(): void {
    if (!this.hidden) {
      this.dropdownService.triggerDropdownClose(this.dropdownName);
    }
  }
}
