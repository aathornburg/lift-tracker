import { Component, Input } from '@angular/core';
import { Lift } from '../../../model/Lift';
import { DropdownService } from '../../../helper_modules/dropdown/dropdown.service';

@Component({
  selector: 'lt-lift',
  templateUrl: './lift.component.html',
  styleUrls: ['./lift.component.scss']
})
export class LiftComponent {

  @Input() lift: Lift;

  constructor(private dropdownService: DropdownService) { }

  weightDown(): void {

  }

  weightUp(): void {

  }

  remove(): void {

  }

  openDropdown(event: any): void {
    event.stopPropagation();
    this.dropdownService.triggerDropdownOpen(this.getDropdownIdentifier());
  }

  getDropdownIdentifier(): string {
    return 'lift-settings-' + this.lift.id;
  }

}
