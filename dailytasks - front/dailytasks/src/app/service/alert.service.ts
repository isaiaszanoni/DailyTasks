import { Injectable } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AlertsComponent } from '../alerts/alerts.component';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private modalService: BsModalService
  ) { 
  }

  private alert(message: string, type: string){
    const bsModal: BsModalRef = this.modalService.show(AlertsComponent)
    bsModal.content.type = type
    bsModal.content.message = message
  }

  success(message: string){
    this.alert(message, 'success')
  }

  danger(message: string){
    this.alert(message, 'danger')
  }
}
