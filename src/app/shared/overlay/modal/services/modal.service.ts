import { Injectable, EventEmitter } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { Modal } from '../modal';

@Injectable()
export class ModalService {

  modals: Modal[] = [];
  openModal: EventEmitter<string> = new EventEmitter<string>();
  closeModal: EventEmitter<string> = new EventEmitter<string>();

  constructor(private overlayService: OverlayService) { }

  registerModal(modalName: string, modalElement: any): void {
    const modal = this.getOrCreateModal(modalName);
    modal.modalElement = modalElement;
  }

  registerModalButton(modalName: string, modalButton: any): void {
    const modal = this.getOrCreateModal(modalName);
    modal.modalButton = modalButton;
  }

  registerDocumentClick(event: any, modalName: string): void {
    const modal = this.getOrCreateModal(modalName);
    if (!this.overlayService.clickIsInsideElements(event,
        [modal.modalElement.querySelector('.modal-content'), modal.modalButton])) {
      this.triggerModalClose(modalName);
    }
  }

  triggerModalOpen(modalName: string): void {
    this.openModal.emit(modalName);
  }

  triggerModalClose(modalName: string): void {
    this.closeModal.emit(modalName);
  }

  getOrCreateModal(modalName: string): Modal {
    const foundModal = this.modals.find(
      modal => modal.modalName === modalName
    );

    if (foundModal) {
      return foundModal;
    } else {
      this.modals.push(new Modal(modalName));
      return this.modals[this.modals.length - 1];
    }
  }
}
