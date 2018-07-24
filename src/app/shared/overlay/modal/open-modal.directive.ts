import { Directive, Input, HostListener } from '@angular/core';
import { ModalService } from './modal.service';

@Directive({
  selector: '[ltOpenModal]'
})
export class OpenModalDirective {

  // tslint:disable-next-line:no-input-rename
  @Input('ltOpenModal') modalToOpen: string;

  constructor(private modalService: ModalService) { }

  @HostListener('click', ['$event'])
  elementClick(event: any): void {
    this.modalService.triggerModalOpen(this.modalToOpen);
  }
}
