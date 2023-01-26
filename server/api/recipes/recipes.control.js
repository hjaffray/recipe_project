'use strict';
import {Recipe} from './recipes.model';
// Find all Recipes
export function index(req, res) {
    Recipe.find()
        .populate('userReviews')
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
        .populate('recipeName')
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
// Create a new recipe
export function create(req, res) {
    let recipe = req.body;
    // Start off by saving the address
    Recipe.create(recipe)
        /*
         Address was successfully saved, now associate saved address to the
         user we are about to create and then save the user
        */
        .then(function(createdRecipe) {
            recipe = createdRecipe;
            /*
             This return statement will return a promise object.
             That means that the following .then in this chain
             will not occur until after the user is saved, and will be given the result
             of this promise resolving, which is the created user object
            */
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
// Update a user
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
                existingRecipe.userReviews = req.body.userReviews;

                /*
                 Promise.all takes an array of promises as an argument
                 It ensures that all the promises in the array have successfully resolved
        before
                 continuing the promise chain. It will pass to the next .then an array of
        results, one
                 for each promise that was passed
                */
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
                res.status(200);
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
