import { Directive, Input, Renderer2, ElementRef, OnInit, HostListener } from '@angular/core';
import { TooltipService } from '../../services/tooltip.service';

@Directive({
  selector: '[ltTooltipAnchor]'
})
export class TooltipAnchorDirective implements OnInit {

  @Input() tooltipName: string = '';

  constructor(private tooltipService: TooltipService, private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.setPositionIfBlank();
  }

  private setPositionIfBlank(): void {
    const computedStyles = window.getComputedStyle(this.elementRef.nativeElement);
    if (computedStyles.position === 'static') { // the default for the position property
      this.renderer.setStyle(this.elementRef.nativeElement, 'position', 'relative');
    }
  }

  @HostListener('mouseenter')
  private onMouseEnter(): void {
    this.tooltipService.openTooltip(this.tooltipName);
  }

  @HostListener('mouseleave')
  private onMouseLeave(): void {
    this.tooltipService.closeTooltip(this.tooltipName);
  }

}
