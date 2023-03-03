import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {User} from '../../interfaces/User';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'create-user',
    templateUrl: './createUser.html'
})
export class CreateUserComponent {
    private formError: String;
    private formInfo: String;
    private modalRef?: BsModalRef;

    private user: User = {
        __v: undefined,
        _id: undefined,
        address: {
            _id: undefined,
            addressLine1: undefined,
            addressLine2: undefined,
            city: undefined,
            state: undefined,
            zip: undefined,
            __v: undefined
        },
        age: undefined,
        name: {
            _id: undefined,
            firstName: undefined,
            middleName: undefined,
            lastName: undefined
        }
    };

    static parameters = [BsModalService, UserService];
    constructor(private modalService: BsModalService, private userService: UserService) {}

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    createUser() {
        this.userService.createUser(this.user)
            .then(createdUser => {
                this.user = createdUser;
                this.formInfo = `User with id ${createdUser._id} successfully created!`;
                this.formError = null;
            })
            .catch(error => {
                this.formError = JSON.stringify(error);
                this.formInfo = null;
            });
    }
}
