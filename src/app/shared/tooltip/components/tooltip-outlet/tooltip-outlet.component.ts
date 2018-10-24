import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { TooltipDirection } from '../../model/tooltip-direction';
import { TooltipService } from '../../services/tooltip.service';
import { fadeSlideInOut } from '../../tooltip.animations';

@Component({
  selector: 'lt-tooltip-outlet',
  templateUrl: './tooltip-outlet.component.html',
  styleUrls: ['./tooltip-outlet.component.scss'],
  animations: [
    fadeSlideInOut
  ]
})
export class TooltipOutletComponent implements OnInit {

  private animationState: string;
  private hidden = true;
  @Input() forTooltip: string;
  @Input() tooltipDirection: TooltipDirection = TooltipDirection.Up;
  @Input() tooltipText: string;

  constructor(private tooltipService: TooltipService) { }

  ngOnInit() {
    this.tooltipService.showTooltip.subscribe(
      tooltipName => tooltipName === this.forTooltip ? this.showTooltip() : ''
    );

    this.tooltipService.hideTooltip.subscribe(
      tooltipName => tooltipName === this.forTooltip ? this.hideTooltip() : ''
    );

    this.animationState = this.determineAnimationState();
  }

  private showTooltip(): void {
    this.hidden = false;
    this.animationState = 'open';
  }

  private hideTooltip(): void {
    this.animationState = this.determineAnimationState();
  }

  private onAnimationDone(): void {
    if (this.animationState.startsWith('closedFrom')) {
      this.hidden = true;
    }
  }

  private determineDirectionClass(): string {
    return TooltipDirection[this.tooltipDirection].toLowerCase();
  }

  private determineAnimationState(): string {
    return 'closedFrom' + TooltipDirection[this.tooltipDirection];
  }

}
