import { v4 as uuidv4} from 'uuid';
let users = [];

export function listContents(req, res){
    res.json({users: users});
}

function findUser(id){
    let foundUsers = users.filter(function(user){
        if(user.id === id){
            return true;
        }
        return false;
    });

    if(foundUsers.length > 0){
        return foundUsers[0];
    } else {
        return null;
    }
}
export function findOne(req, res){
    // console.log("user length " + users.length);
    // console.log("param id " + req.params.id);
   // var found = false;
    let existingUser = findUser(req.params.id);
    if (existingUser){
        res.status(200);
        res.json(existingUser);
    } else {
        res.status(404);
        res.json({message: 'Not Found'});
    }
    // var foundID;
    // for (let i = 0; i < users.length; i++){
    //     // console.log("find one id " + users[i].id);
    //     if (users[i].id == req.params.id){
    //         found = true;
    //         foundID = users[i].id;
    //     }
    // }
    // if(found == true){
    //     console.log("true");
    //     res.status(200);
    //     res.json({'id':foundID});
    // }
    // else {
    //     res.status(404);
    //     res.json({message: 'Not Found'});
    // }

}

export function createUser(req, res){
    let id = uuidv4();
    let name = req.body.name;
    if (!name || typeof name !== 'string'){
        res.status(400);
        return res.json({
            error: 'name(String) is required'
        });
    }
    let address = req.body.address;
    if (!address || typeof address !== 'string'){
        res.status(400);
        return res.json({
            error: 'address(String) is required'
        });
    }
    let age = req.body.age;
    if (!age || typeof age !== 'number'){
        res.status(400);
        return res.json({
            error: 'age(Number) is required'
        });
    }
    let user = {
        id,
        name,
        address,
        age
    };
    users.push(user);
    res.status(201);
    res.json(user);
}

export function updateUser(req, res){
    let existingUser = findUser(req.params.id);

    if(existingUser){
        existingUser.name = req.body.name;
        existingUser.address = req.body.address;
        existingUser.age = req.body.age;
        res.status(200);
        res.json(existingUser);
    } else { //if the user doesn't exist
        let id = req.params.id;
        let name = req.body.name;
        let address = req.body.address;
        let age = req.body.age;
        let user = {
            id,
            name,
            address,
            age
        }
        users.push(user);
        res.status(201);
        res.json(user);

    }
}

export function removeUser(req, res){
    let existingUser = findUser(req.params.id);

    if (existingUser){
        users.pop(existingUser);
        res.status(204).send();
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
}
