import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'update-user',
    templateUrl: './updateUser.html'
})
export class UpdateUserComponent {
    modalRef?: BsModalRef;
    static parameters = [BsModalService];
    constructor(private modalService: BsModalService) {}

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
}
