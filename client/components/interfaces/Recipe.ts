import {User} from "./User";

export interface Recipe{
    _id: string;
    recipeName: string;
    description: string;
    pictureURL: string;
    prepTime: number;
    cookTime: number;
    directions: string[];
    ingredients: Ingredient[];
    userReviews: Review[];
    __v: undefined;


}
export interface Ingredient {
    _id: string;
    ingredient: string;
}

export interface Review {
    _id: string;
    reviewDesc: string;
    reviewRating: number;
    dateOfReview: Date;
    reviewUser: string;
}
