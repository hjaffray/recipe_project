import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Recipe, Review} from '../../interfaces/Recipe';
import {RecipeService} from '../../services/recipe.service';

@Component({
    selector: 'update-review',
    templateUrl: './updateReview.html'
})
export class UpdateReviewComponent {
    @Input() recipeId: string;
    @Input() review: Review;
    public formError: String;
    public formInfo: String;

    private modalRef?: BsModalRef;
    static parameters = [BsModalService, RecipeService];

    constructor(private modalService: BsModalService,
                private recipeService: RecipeService) {}

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    updateReview() {
        this.recipeService.updateReview(this.recipeId, this.review)
            .then(updatedReview=> {
                this.formInfo = 'Review successfully updated!';
                this.formError = null;
            })
            .catch(error => {
                this.formInfo = null;
                this.formError = error.toString();
            });
    }
}
