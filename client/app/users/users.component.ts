import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UserService} from '../../components/services/user.service';
import {User} from '../../components/interfaces/User';
import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'users',
    templateUrl: './users.html',
    styleUrls: ['./users.scss'],
})
export class UsersComponent implements OnInit {

    private user: User;

    static parameters = [ActivatedRoute, UserService];

    constructor(private route: ActivatedRoute, private userService: UserService) {
        this.route = route;
        this.userService = userService;
    }


    ngOnInit() {
        this.route.params.subscribe(params =>{
            this.userService.getUserById(params.id)
                .then(user =>{
                    this.user = user;
                });
        });

    }
}
