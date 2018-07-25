import { Injectable, EventEmitter } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';

@Injectable()
export class ModalService {

  openModal: EventEmitter<string> = new EventEmitter<string>();
  closeModal: EventEmitter<string> = new EventEmitter<string>();

  constructor(private overlayService: OverlayService) { }

  triggerModalOpen(modalName: string): void {
    this.openModal.emit(modalName);
  }

  triggerModalClose(modalName: string): void {
    this.closeModal.emit(modalName);
  }
}
