import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../../components/services/recipe.service';
import {Recipe, Review} from '../../components/interfaces/Recipe';

import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'recipe',
    templateUrl: './recipes.html',
    styleUrls: ['./recipes.scss'],
})
export class RecipesComponent implements OnInit {

    private recipe: Recipe;
    private reviews: Review[];
    private reviewId;
    private recipeId;
    static parameters = [ActivatedRoute, RecipeService];

    constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
        this.route = route;
        this.recipeService = recipeService;

    }


    ngOnInit() {
        this.route.params.subscribe(params => {
            this.recipeService.getRecipeById(params.id)
                .then(recipe => {
                    this.recipe = recipe;
                    this.reviews = recipe.userReviews;
                    // console.log(recipe);

                })
        });
    }

    goBack(){
        window.history.back();
    }


}
