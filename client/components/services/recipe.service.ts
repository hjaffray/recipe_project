import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Recipes} from '../interfaces/Recipes';
import {Recipe, Review} from '../interfaces/Recipe';


@Injectable()
export class RecipeService {
    static parameters = [HttpClient];
    constructor(private httpClient: HttpClient) {
        this.httpClient = httpClient;
    }
    getAllRecipes(): Promise<Recipes> {
        return this.httpClient
            .get<Recipes>('/api/recipes')
            .toPromise();
    }

    getRecipeById(recipeId): Promise<Recipe>{
        return this.httpClient
            .get<Recipe>(`/api/recipes/${recipeId}`)
            .toPromise();
    }

    getReviewById(recipeId, reviewId): Promise<Review>{
        return this.httpClient
            .get<Review>(`/api/recipes/${recipeId}/reviews/${reviewId}`)
            .toPromise();
    }

    updateRecipe(recipe: Recipe): Promise<Recipe> {
        let url = `/api/recipes/${recipe._id}`;
        return this.httpClient
            .put<Recipe>(url, recipe)
            .toPromise();
    }

    // updateReview(recipe: Recipe, review: Review): Promise<Review> {
    //     let url = `/api/recipes/${recipe._id}/reviews/${review._id}`;
    //     return this.httpClient
    //         .put<Recipe>(url, recipe, review)
    //         .toPromise();
    // }
    createRecipe(recipe: Recipe): Promise<Recipe> {
        return this.httpClient
            .post<Recipe>(`/api/recipes`, recipe)
            .toPromise();
    }

    createReview(recipeId, review: Review): Promise<Review> {
        return this.httpClient
            .post<Review>(`/api/recipes/${recipeId}/reviews`, review)
            .toPromise();
    }
    deleteRecipe(recipe: Recipe): Promise<Recipe>{
        return this.httpClient
            .delete<Recipe>(`/api/recipes/${recipe._id}`)
            .toPromise();
    }

    deleteReview(recipeId, reviewId): Promise<Review>{
        return this.httpClient
            .delete<Review>(`/api/recipes/${recipeId}/reviews/${reviewId}`)
            .toPromise();
    }
}

