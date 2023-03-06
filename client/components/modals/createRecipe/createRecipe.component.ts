import {Component, EventEmitter, Input, Output, TemplateRef} from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Recipe} from '../../interfaces/Recipe';
import {RecipeService} from '../../services/recipe.service';
import {Recipes} from "../../interfaces/Recipes";

@Component({
    selector: 'create-recipe',
    templateUrl: './createRecipe.html'
})
export class CreateRecipeComponent {
    private formError: String;
    private formInfo: String;
    private modalRef?: BsModalRef;

    private recipe: Recipe = {
        __v: undefined,
        _id: undefined,
        recipeName: undefined,
        description: undefined,
        pictureURL: undefined,
        prepTime: undefined,
        cookTime: undefined,
        directions: undefined,
        ingredients: undefined,
        userReviews: undefined
    };

    static parameters = [BsModalService, RecipeService];
    constructor(private modalService: BsModalService, private recipeService: RecipeService) {}

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    createRecipe() {
        this.recipeService.createRecipe(this.recipe)
            .then(createdRecipe => {
                this.recipe = createdRecipe;
                this.formInfo = `Recipe with id ${createdRecipe._id} successfully created!`;
                this.formError = null;
            })
            .catch(error => {
                this.formError = JSON.stringify(error);
                this.formInfo = null;
            });
    }
}
