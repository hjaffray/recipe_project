import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../../components/services/recipe.service';
import {Recipe, Review} from '../../components/interfaces/Recipe';

import {ActivatedRoute} from '@angular/router';


@Component({
    selector: 'review',
    templateUrl: './reviews.html',
    styleUrls: ['./reviews.scss'],
})
export class ReviewsComponent implements OnInit {

    public review: Review;
    public recipeId;
    static parameters = [ActivatedRoute, RecipeService];

    constructor(private route: ActivatedRoute, private recipeService: RecipeService) {
        this.route = route;
        this.recipeService = recipeService;
    }


    ngOnInit() {
        this.route.params.subscribe(params =>{
            this.recipeService.getReviewById(params.id, params.reviewId)
                .then(review => {
                    this.review = review;
                })

        })
        this.recipeId = this.route.snapshot.paramMap.get('id');
    }

    public goBack(){
        window.history.back();
    }


}
