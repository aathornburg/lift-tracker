import { Injectable } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { Modal } from '../modal';
import { FocusService } from '../../../focus/services/focus.service';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class ModalService {

  modals: Modal[] = [];
  openModal: BehaviorSubject<string> = new BehaviorSubject<string>('');
  closeModal: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private overlayService: OverlayService, private focusService : FocusService) { }

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
      this.closeModal.next(modalName);
    }
  }

  trapFocus(event: any, element: any): void {
    this.focusService.trapFocus(event, element);
  }

  forceFocusIntoElement(element: any): void {
    // https://stackoverflow.com/questions/779379/why-is-settimeoutfn-0-sometimes-useful
    setTimeout(() => { this.focusService.forceFocusIntoElement(element); }, 0);
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
