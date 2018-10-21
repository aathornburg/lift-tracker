import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { TooltipDirection } from '../../model/tooltip-direction';
import { TooltipService } from '../../services/tooltip.service';

@Component({
  selector: 'lt-tooltip-outlet',
  templateUrl: './tooltip-outlet.component.html',
  styleUrls: ['./tooltip-outlet.component.scss']
})
export class TooltipOutletComponent implements OnInit {

  @Input() forTooltip: string;
  @Input() tooltipDirection: TooltipDirection = TooltipDirection.Up;
  @Input() tooltipText: string;
  @HostBinding('hidden') hidden: boolean = true;

  constructor(private tooltipService: TooltipService) { }

  ngOnInit() {
    this.tooltipService.showTooltip.subscribe(
      tooltipName => tooltipName === this.forTooltip ? this.showTooltip() : ''
    );

    this.tooltipService.hideTooltip.subscribe(
      tooltipName => tooltipName === this.forTooltip ? this.hideTooltip() : ''
    );
  }

  private showTooltip(): void {
    this.hidden = false;
  }

  private hideTooltip(): void {
    this.hidden = true;
  }

}
