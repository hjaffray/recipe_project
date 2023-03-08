import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {UserService} from '../../components/services/user.service';
import {User} from '../../components/interfaces/User';
import {RecipeService} from "../../components/services/recipe.service";
import {Recipe, Review} from "../../components/interfaces/Recipe";


@Component({
    selector: 'main',
    templateUrl: './main.html',
    styleUrls: ['./main.scss'],
})
export class MainComponent implements OnInit {

    public values: string[];
    // public valueToSquare: number;
    public users: User[];
    public recipes: Recipe[];
    public reviews: Review[];
    public input: string;
    static parameters = [HttpClient, UserService, RecipeService];

    constructor(private http: HttpClient, private userService: UserService,
                private recipeService: RecipeService) {
        this.http = http;
        this.userService = userService;
        this.recipeService = recipeService;
        //this.setData();
        this.getUserData();
        this.getRecipeData();
    }

    // private setData() {
    //     this.values = ['first', 'second', 'third'];
    //     this.valueToSquare = 4;
    // }

    public getUserData() {
        this.userService.getAllUsers()
            .then(response => {
                this.users = response.users as User[];
            })
            .catch(this.handleError);
    }
    public getRecipeData() {
        this.recipeService.getAllRecipes()
            .then(response => {
                this.recipes = response.recipes as Recipe[];
            })
            .catch(this.handleError);
    }

    // public getReviewData(){
    //     this.recipeService.getReviewById()
    //         .then(response => {
    //             this.reviews = response.review as Review[];
    //         })
    // }


    private handleError(error: any): Promise<any> {
        console.error('Something has gone wrong', error);
        return Promise.reject(error.message || error);
    }

    public reloadPage(){
        window.location.reload();
    }

    ngOnInit() {
    }
}
