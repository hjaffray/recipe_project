import { Component, Input, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import {Recipe} from '../../interfaces/Recipe';
import {RecipeService} from '../../services/recipe.service';

@Component({
    selector: 'update-recipe',
    templateUrl: './updateRecipe.html'
})
export class UpdateRecipeComponent {
    @Input() recipe: Recipe;
    public formError: String;
    public formInfo: String;

    private modalRef?: BsModalRef;
    static parameters = [BsModalService, RecipeService];

    constructor(private modalService: BsModalService,
                private recipeService: RecipeService) {}

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }
    updateRecipe() {
        this.recipeService.updateRecipe(this.recipe)
            .then(updatedRecipe => {
                this.formInfo = 'Recipe successfully updated!';
                this.formError = null;
            })
            .catch(error => {
                this.formInfo = null;
                this.formError = error.toString();
            });
    }
}
