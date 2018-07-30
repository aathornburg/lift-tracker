import { Component, OnInit, Input, ElementRef, HostListener } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'lt-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalName: string;
  show = false;

  constructor(private modalService: ModalService, private elementRef: ElementRef) { }

  ngOnInit() {
    this.modalService.registerModal(this.modalName, this.elementRef.nativeElement);

    this.modalService.openModal.subscribe(
      modalName => this.openModalIfNameMatches(modalName)
    );

    this.modalService.closeModal.subscribe(
      modalName => this.closeModalIfNameMatches(modalName)
    );
  }

  openModalIfNameMatches(modalName: string): void {
    if (this.modalName === modalName) {
      this.open();
    }
  }

  closeModalIfNameMatches(modalName: string): void {
    if (this.modalName === modalName) {
      this.close();
    }
  }

  open(): void {
    this.show = true;
    this.modalService.forceFocusIntoElement(this.elementRef.nativeElement);
  }

  close(): void {
    this.show = false;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: any): void {
    if (this.show) {
      this.modalService.registerDocumentClick(event, this.modalName);
    }
  }

  @HostListener('focusout', ['$event'])
  onElementFocusOut(event: any): void {
    this.modalService.trapFocus(event, this.elementRef.nativeElement);
  }

  @HostListener('document:keydown.escape')
  onDocumentKeypress(): void {
    if (this.show) {
      this.modalService.triggerModalClose(this.modalName);
    }
  }

}
