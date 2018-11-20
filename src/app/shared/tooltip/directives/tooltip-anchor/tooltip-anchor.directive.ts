import { Directive, Input, Renderer2, ElementRef, OnInit, HostListener, OnChanges, SimpleChanges } from '@angular/core';
import { TooltipService } from '../../services/tooltip.service';

@Directive({
  selector: '[ltTooltipAnchor]'
})
export class TooltipAnchorDirective implements OnInit, OnChanges {

  @Input() tooltipName: string = '';
  @Input() showDelay: number = 500; // in milliseconds
  @Input() tooltipBlock: boolean = false;
  private delayTimeoutHandle: NodeJS.Timer;

  constructor(private tooltipService: TooltipService, private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.setPositionIfBlank();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.tooltipBlock && changes.tooltipBlock.currentValue) {
      this.tooltipService.blockTooltip.next(this.tooltipName);
    } else if (changes.tooltipBlock && !changes.tooltipBlock.currentValue) {
      this.tooltipService.freeTooltip.next(this.tooltipName);
    }
  }

  private setPositionIfBlank(): void {
    const computedStyles = window.getComputedStyle(this.elementRef.nativeElement);
    if (computedStyles.position === 'static') { // the default for the position property
      this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
    }
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    this.delayTimeoutHandle = setTimeout(() => { this.tooltipService.openTooltip.next(this.tooltipName); }, this.showDelay);
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    clearTimeout(this.delayTimeoutHandle);
    this.tooltipService.closeTooltip.next(this.tooltipName);
  }

}
