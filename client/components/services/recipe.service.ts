import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recipes} from '../interfaces/Recipes';
import {Recipe} from '../interfaces/Recipe';

@Injectable()
export class RecipeService {
    static parameters = [HttpClient];
    constructor(private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }
    getAllRecipes(): Promise<Recipe> {
        return this.httpClient
            .get<Recipes>('/api/recipes')
            .toPromise();
    }

    getRecipeById(recipeId): Promise<Recipe>{
        return this.httpClient
            .get<Recipe>(`/api/recipes/${recipeId}`)
            .toPromise();
    }

    updateRecipe(recipe: Recipe): Promise<Recipe> {
        let url = `/api/recipes/${recipe._id}`;
        return this.httpClient
            .put<Recipe>(url, recipe)
            .toPromise();
    }
    createRecipe(recipe: Recipe): Promise<Recipe> {
        return this.httpClient
            .post<Recipe>('/api/recipes', recipe)
            .toPromise();
    }

    deleteRecipe(recipeId): Promise<Recipe>{
        return this.httpClient
            .delete<Recipe>(`/api/recipes/${recipeId}`)
    }
}

