import mongoose from 'mongoose';
let Schema = mongoose.Schema;
/*
  This section declares the schemas for the different documents
  that will be used
 */

//recipe schema TBD if/where this should be stored
let recipeSchema = Schema({
    recipeName: {type: String, required: true},
    description: {type: String, required: true},
    pictureURL: {type: String, required: true},
    prepTime: {type: Number, required: true},
    cookTime: {type: Number, required: true},
    directions: [{type: String, required: true}],
    //ingredients:
    //userReviews:
});

let reviews = Schema({
    reviewDesc: {type: String, required: true},
    reviewRating: {type: Number, min: 0, max: 5, required: true},
    dateOfReview: {}
});

/*
    Creates interactive models from schemas for use in CRUD ops.
 */

let Recipe = mongoose.model('Recipe', recipeSchema);
//export {}
