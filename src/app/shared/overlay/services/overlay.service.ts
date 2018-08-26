import { Injectable } from '@angular/core';

@Injectable()
export class OverlayService {

  constructor() { }

  clickIsInsideElement(event: any, element: any): boolean {
    return element.contains(event.target);
  }

  clickIsInsideElements(event: any, elements: any[]): boolean {
    return elements.some(
      element => this.clickIsInsideElement(event, element)
    );
  }

}
