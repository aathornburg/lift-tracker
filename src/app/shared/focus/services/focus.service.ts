import { Injectable } from '@angular/core';

@Injectable()
export class FocusService {

  constructor() { }

  /* This function  requires a focusout listener instead of a tab keypress
  ** listener.  I prefer focusout because it is more generalized - it will
  ** always trigger a call to this function (and subsequently trap focus)
  ** focus no matter how a user changes the focus, whether it's pressing
  ** the tab key, using dev tools, or another option.
  **
  ** However, the one caveat with this (using the tab key, that I found through
  ** testing) is that this requires any focusable item to be on the webpage before
  ** and after the element that focus is being trapped into.  During testing,
  ** I was able to tab into the website status indicator on Chrome (the icon in
  ** the address bar that shows security information) despite "trapping" focus.
  ** I am thinking that, once the webpage itself loses focus, I cannot force focus
  ** into any elements contained within the webpage.
  **
  ** Despite this caveat, I'm keeping the focusout-centric version of this
  ** function (again, instead of tab-centric) due to its more general nature.
  */
  trapFocus(event: any, element: any): void {
    if (this.focusIsLeavingElement(event, element)) {
      const focusableElements = this.getFocusableElements(element);
      if (focusableElements[0] === event.target) {
        focusableElements[focusableElements.length - 1].focus();
      } else if (focusableElements[focusableElements.length - 1] === event.target) {
        focusableElements[0].focus();
      }
    }
  }

  focusIsLeavingElement(event: any, element: any): boolean {
    return !element.contains(event.relatedTarget);
  }

  focusIsLeavingElements(event: any, elements: any[]): boolean {
    return elements.every(
      element => this.focusIsLeavingElement(event, element)
    );
  }

  getFocusableElements(element: any): any[] {
    return Array.from(element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
  }

  forceFocusIntoElement(element: any): void {
    const focusableElements = this.getFocusableElements(element);
    if (focusableElements.length) {
      focusableElements[0].focus();
    }
  }

}
