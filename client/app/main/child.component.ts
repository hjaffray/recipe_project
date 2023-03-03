import {Component, Input, Output, EventEmitter} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../components/services/user.service';
import {User} from '../../components/interfaces/User';


@Component({
    selector: 'child',
    template: '<h4>{{name}}</h4><br><button (click)="clicked($event)">Child Button</button>'


})
export class ChildComponent {

    @Input() name: string;
    @Output() selected = new EventEmitter<boolean>();
    static parameters = [];

    constructor() {

    }
    public clicked($event){
        this.selected.emit(true);
    }
    ngOnInit() {
    }
}
