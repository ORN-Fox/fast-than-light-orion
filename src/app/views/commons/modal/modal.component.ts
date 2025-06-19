import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss'],
    standalone: false
})
export class ModalComponent {

  @Input() show = false;
  @Input() customClass = '';

  @Output() closeCallback: EventEmitter<void> = new EventEmitter();

  constructor() { }

  close() {
    this.closeCallback.emit();
  }

}
