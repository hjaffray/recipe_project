'use strict';
import {Recipe, Review} from './recipes.model';
// Find all Recipes
export function index(req, res) {
    Recipe.find()
        .populate()
        .exec()
        // This then method will only be called if the query was successful, so no need to error check!
        .then(function(recipes) {
            res.json({
                recipes
            });
        })
        /*
         Any errors encountered here must be server side, since there are no arguments
    to the find
         Return 500 (server error) and send the error encountered back to the requester
        */
        .catch(function(err) {
            res.status(500);
            res.send(err);
        });
}
// Find details for one recipe
export function show(req, res) {
    Recipe.findById(req.params.id)
        .populate()
        .exec()
        .then(function(existingRecipe) {
            /*
             findById will return null if the object was not found
             This if check will evaluate to false for a null recipe
            */
            if(existingRecipe) {
                // Recipe was found by Id
                res.status(200);
                res.json(existingRecipe);
            } else {
                // Recipe was not found
                res.status(404);
                res.json({message: 'Recipe Not Found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}
export function showReview(req, res) {
    //find individual review and return it
    Review.findById(req.params.reviewId)
        .populate()
        .exec()
        .then(function(existingReview) {
            if(existingReview) {
                res.status(200);
                res.json(existingReview);
            } else {
                // Recipe was not found
                res.status(404);
                res.json({message: 'Review Not Found'});
            }
        })
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}
// Create a new recipe
export function createReview(req, res) {
    //assign review content from post body then create review
    let review = req.body;
    Review.create(review)
        .then(function(assignReview){
            //then find respective recipe and update userReviews
            // with newly created review
            return Recipe.findByIdAndUpdate(req.params.id,
                {$push :{userReviews: assignReview}})
        })
        .then(function (updatedRecipe){
            //Need to update updateRecipe obj before returning
            if(updatedRecipe){
                res.status(200);
                res.json(updatedRecipe.userReviews);
            } else {
                res.status(404);
                res.json({message: 'Failed to Add Review'})
            }
        })
        .catch(function(err){
            res.status(400);
            res.send(err);
        })
}
export function create(req, res) {
    let recipe = req.body;
    Recipe.create(recipe)
        .then(function(createdRecipe) {
            recipe = createdRecipe;
            return Recipe.create(recipe);
        })
        // User and Address saved successfully! return 201 with the created user object
        .then(function(createdRecipe) {
            res.status(201);
            res.json(createdRecipe);
        })
        // An error was encountered during either the save of the address or the save of the user
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}
// Update a recipe
export function update(req, res) {
    // Start by trying to find the recipe by its id
    Recipe.findById(req.params.id)
        .populate()
        .exec()
        // Update user and address
        .then(function(existingRecipe) {
            // If user exists, update all fields of the object
            if(existingRecipe) {
                existingRecipe.recipeName = req.body.recipeName;
                existingRecipe.description = req.body.description;
                existingRecipe.pictureURL = req.body.pictureURL;
                existingRecipe.prepTime = req.body.prepTime;
                existingRecipe.cookTime = req.body.cookTime;
                existingRecipe.directions = req.body.directions;
                existingRecipe.ingredients = req.body.ingredients;
               // existingRecipe.userReviews = req.body.userReviews;

                return Promise.all([
                    existingRecipe.increment().save()
                ]);
            } else {
                // User was not found
                return existingRecipe;
            }
        })
        // This .then will be called after the Promise.all resolves, or be called with null if the user was not found
        .then(function(savedObjects) {
            // savedObjects should be defined if Promise.all was invoked (user was found)
            if(savedObjects) {
                res.status(201);
                // The order of responses are guaranteed to be the same as the order of the promises, so we can assume
                // the second element of the array is the result of the user update
                res.json(savedObjects[1]);
            } else {
                // User was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        // Error encountered during the save of the user or address
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}
// Update a review
export function updateReview(req, res) {

    Review.findById(req.params.reviewId)
        .populate()
        .exec()
        .then(function(existingReview){
            if(existingReview){
                //console.log(existingReview);
                existingReview.reviewDesc = req.body.reviewDesc;
                existingReview.reviewRating = req.body.reviewRating;
                existingReview.reviewUser = req.body.reviewUser;

                return Promise.all([
                    existingReview.increment().save()

                ]);
            } else{
                //review not found
                return existingReview;
            }
        })
        .then(function (updatedReview){
            //Need to update updateRecipe obj before returning
            if(updatedReview){
                res.status(200);
                res.json(updatedReview);
            } else {
                res.status(404);
                res.json({message: 'Failed to Update Review'})
            }
        })
        .catch(function(err){
            res.status(400);
            res.send(err);
        })
}
// Remove a recipe
export function destroy(req, res) {
    Recipe.findById(req.params.id)
        .populate()
        .exec()
        .then(function(existingRecipe) {
            if(existingRecipe) {
                return Promise.all([
                    existingRecipe.remove()
                ]);
            } else {
                return existingRecipe;
            }
        })
        // Delete was successful
        .then(function(deletedRecipe) {
            if(deletedRecipe) {
                res.status(204).send();
            } else {
                // User was not found
                res.status(404);
                res.json({message: 'Not Found'});
            }
        })
        // Address or user delete failed
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}

export function destroyReview(req, res) {
    Review.findByIdAndDelete(req.params.reviewId)
        .populate()
        .exec()
        .then(function(existingReview) {
            return Recipe.findByIdAndUpdate(req.params.id,
                {$pull :{userReviews: req.params.reviewId}})
        })
        // Delete was successful
        .then(function(deletedReview) {
            if(deletedReview) {
                res.status(204).send();
            } else {

                res.status(404);
                res.json({message: 'Review Not Found'});
            }
        })
        // delete failed
        .catch(function(err) {
            res.status(400);
            res.send(err);
        });
}
