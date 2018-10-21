import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TooltipService {

  // TODO:  Fix this naming.  Subject/BehaviorSubject?
  public showTooltip: EventEmitter<string> = new EventEmitter<string>();
  public hideTooltip: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  public openTooltip(tooltipName: string): void {
    this.showTooltip.emit(tooltipName);
  }

  public closeTooltip(tooltipName: string): void {
    this.hideTooltip.emit(tooltipName);
  }
}
