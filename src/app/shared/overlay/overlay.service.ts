import { Injectable, ElementRef } from '@angular/core';

@Injectable()
export class OverlayService {

  constructor() { }

  clickIsInsideElement(event: any, elementRef: ElementRef): boolean {
    return elementRef.nativeElement.contains(event.target);
  }

  clickIsInsideElements(event: any, elementRefs: ElementRef[]): boolean {
    return elementRefs.some(
      elementRef => this.clickIsInsideElement(event, elementRef)
    );
  }

  focusIsLeavingElement(event: any, elementRef: ElementRef): boolean {
    return !elementRef.nativeElement.contains(event.relatedTarget);
  }

  focusIsLeavingElements(event: any, elementRefs: ElementRef[]): boolean {
    return elementRefs.every(
      elementRef => this.focusIsLeavingElement(event, elementRef)
    );
  }
}
