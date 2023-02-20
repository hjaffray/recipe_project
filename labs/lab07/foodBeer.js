db.towns.find({name: {$regex: /e/}, famousFor: {$regex: /food|beer/}})
