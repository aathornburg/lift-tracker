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

  private bubbleAnimationState: string;
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

    this.bubbleAnimationState = this.determineBubbleAnimationState();
  }

  private showTooltip(): void {
    this.hidden = false;
    this.bubbleAnimationState = 'open';
  }

  private hideTooltip(): void {
    this.bubbleAnimationState = this.determineBubbleAnimationState();
  }

  private onBubbleAnimationDone(): void {
    if (this.bubbleAnimationState.startsWith('closedFrom')) {
      setTimeout(() => { this.hidden = true; });
    }
  }

  private determineDirectionClass(): string {
    return TooltipDirection[this.tooltipDirection].toLowerCase();
  }

  private determineBubbleAnimationState(): string {
    return 'closedFrom' + TooltipDirection[this.tooltipDirection];
  }

}
