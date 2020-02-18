import { Injectable } from '@angular/core';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { AlertModalComponent } from './alert-modal.component';

export enum AlertType {
  DANGER = 'danger',
  SUCCESS = 'success'
}

@Injectable({
  providedIn: 'root'
})
export class AlertModalService {

  constructor(private modalService: BsModalService) { }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertType.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertType.SUCCESS, 2000);
  }

  private showAlert(message: string, type: string, dismissTimeout?: number)  {
    const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if(dismissTimeout){
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }
}
