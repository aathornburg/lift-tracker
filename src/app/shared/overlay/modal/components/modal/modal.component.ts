import { Component, OnInit, Input } from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'lt-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {

  @Input() modalName: string;
  show = false;

  constructor(private modalService: ModalService) { }

  ngOnInit() {
    this.modalService.openModal.subscribe(
      modalName => this.openModalIfNameMatches(modalName)
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
  }

  close(): void {
    this.show = false;
  }

}
