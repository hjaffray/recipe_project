import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Recipe, Review} from "../../interfaces/Recipe";
import {RecipeService} from '../../services/recipe.service';

@Component({
    selector: 'create-review',
    templateUrl: './createReview.html'
})
export class CreateReviewComponent {
    @Input() recipeId: string;
    private formError: String;
    private formInfo: String;
    private modalRef?: BsModalRef;


    private review: Review = {
        _id: undefined,
        reviewDesc: undefined,
        reviewRating: undefined,
        dateOfReview: undefined,
        reviewUser: undefined,
    };

    static parameters = [BsModalService, RecipeService];
    constructor(private modalService: BsModalService, private recipeService: RecipeService) {}

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    setRecipeId(recipeId: string){
        this.recipeId = recipeId;
    }
    createReview() {

        this.recipeService.createReview(this.recipeId, this.review)
            .then(createdReview => {
                this.review = createdReview;
                this.formInfo = `Review with successfully created!`;
                this.formError = null;
            })
            .catch(error => {
                this.formError = JSON.stringify(error);
                this.formInfo = null;
            });
    }
}
