import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class TooltipService {

  public openTooltip: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public closeTooltip: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public blockTooltip: BehaviorSubject<string> = new BehaviorSubject<string>('');
  public freeTooltip: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

}
