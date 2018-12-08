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
  public trapFocus(event: any, element: any): void {
    if (this.focusIsLeavingElement(event, element)) {
      const tabbableElements = this.getTabbableElements(element);
      if (tabbableElements[0] === event.target) {
        tabbableElements[tabbableElements.length - 1].focus();
      } else if (tabbableElements[tabbableElements.length - 1] === event.target) {
        tabbableElements[0].focus();
      }
    }
  }

  public focusIsLeavingElement(event: any, element: any): boolean {
    return !element.contains(event.relatedTarget);
  }

  public focusIsLeavingElements(event: any, elements: any[]): boolean {
    return elements.every(
      element => this.focusIsLeavingElement(event, element)
    );
  }

  public focusOutEventHasRelatedTarget(event: any): boolean {
    return !!event.relatedTarget;
  }

  public getTabbableElements(element: any): any[] {
    return this.getFocusableElements(element)
      .filter(focusableElement => {
        const computedStyles = window.getComputedStyle(focusableElement);
        return focusableElement.tabIndex !== '-1'
            && computedStyles.display !== 'none'
            && computedStyles.visibility !== 'hidden'
            && computedStyles.opacity !== '0';
      });
  }

  public getFocusableElements(element: any): any[] {
    return Array.from(element.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
  }

  public forceFocusIntoElement(element: any): void {
    const focusableElements = this.getFocusableElements(element);
    if (focusableElements.length) {
      focusableElements[0].focus();
    }
  }

  public preventFocusForFocusableElements(element: any): void {
    this.getFocusableElements(element).forEach(
      focusableElement => {
        focusableElement.tabIndex = -1;
      }
    );
  }

  public allowFocusForFocusableElements(element: any): void {
    this.getFocusableElements(element).forEach(
      focusableElement => {
        if (focusableElement.tabindex === -1) {
          focusableElement.removeAttribute('tabIndex');
        }
      }
    );
  }

}
