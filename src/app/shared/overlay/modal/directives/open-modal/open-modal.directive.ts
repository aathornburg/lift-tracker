import { Directive, Input, OnInit, ElementRef, HostListener } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Directive({
  selector: '[ltOpenModal]'
})
export class OpenModalDirective implements OnInit {

  @Input() modalName: string;

  constructor(private modalService: ModalService, private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.modalService.registerModalButton(this.modalName, this.elementRef.nativeElement);
  }

  @HostListener('click', ['$event'])
  onElementClick(event: any): void {
    this.modalService.triggerModalOpen(this.modalName);
  }
}
