import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import { TooltipService } from '../../services/tooltip.service';
import { fadeSlideInOut } from '../../tooltip.animations';
import { Direction } from 'src/app/shared/model/direction';

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
  private blocked = false;
  @Input() forTooltip: string;
  @Input() tooltipDirection: Direction = Direction.Up;
  @Input() tooltipText: string;

  constructor(private tooltipService: TooltipService) { }

  ngOnInit() {
    this.tooltipService.openTooltip.subscribe(
      tooltipName => tooltipName === this.forTooltip ? this.showTooltip() : ''
    );

    this.tooltipService.closeTooltip.subscribe(
      tooltipName => tooltipName === this.forTooltip ? this.hideTooltip() : ''
    );

    this.tooltipService.blockTooltip.subscribe(
      tooltipName => tooltipName === this.forTooltip ? this.blockTooltip() : ''
    );

    this.tooltipService.freeTooltip.subscribe(
      tooltipName => tooltipName === this.forTooltip ? this.freeTooltip() : ''
    );

    this.bubbleAnimationState = this.determineBubbleAnimationState();
  }

  private showTooltip(): void {
    if (!this.blocked) {
      this.hidden = false;
      this.bubbleAnimationState = 'open';
    }
  }

  private hideTooltip(): void {
    this.bubbleAnimationState = this.determineBubbleAnimationState();
  }

  private blockTooltip(): void {
    this.hidden = true;
    this.blocked = true;
  }

  private freeTooltip(): void {
    this.blocked = false;
  }

  private onBubbleAnimationDone(): void {
    if (this.bubbleAnimationState.startsWith('closedFrom')) {
      setTimeout(() => { this.hidden = true; });
    }
  }

  private determineDirectionClass(): string {
    return Direction[this.tooltipDirection].toLowerCase();
  }

  private determineBubbleAnimationState(): string {
    return 'closedFrom' + Direction[this.tooltipDirection];
  }

}
