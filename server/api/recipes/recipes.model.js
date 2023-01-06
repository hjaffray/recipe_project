import mongoose from 'mongoose';
let Schema = mongoose.Schema;
/*
  This section declares the schemas for the different documents
  that will be used
 */

//recipe schema TBD if/where this should be stored
let recipeSchema = Schema({
    // recipeName, description, and pictureURL are simple String types & are required
    recipeName: {type: String, required: true},
    description: {type: String, required: true},
    pictureURL: {type: String, required: true},
    //prepTime & cookTime are simple Number types & are required
    prepTime: {type: Number, required: true},
    cookTime: {type: Number, required: true},
    //directions is an array of Strings and is required
    directions: [{type: String, required: true}],
    //ingredients is an array of Strings with a subdocument for the quantity of each ingredient & is required
    ingredients: [{type: String, quantity: [{amount: String}], required: true}],
    //userReviews is an array of ObjectIds the reviews collection
    userReviews: [{type: Schema.Types.ObjectId, ref: 'Review'}]
});

let reviews = Schema({
    // reviewDesc is a simple String & is required
    reviewDesc: {type: String, required: true},
    // reviewRating is a Number between 0-5 (to represent stars) & is required
    reviewRating: {type: Number, min: 0, max: 5, required: true},
    //dateOfReview uses the current date & is required
    dateOfReview: {type: Date.now(), required: true},
    //reviewUser is an ObjectId that references the user collection & is required
    reviewUser: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

/*
    Creates interactive models from schemas for use in CRUD ops.
 */

let Recipe = mongoose.model('Recipe', recipeSchema);
let Review = mongoose.model('Review', reviews);

export {Recipe, Review};
