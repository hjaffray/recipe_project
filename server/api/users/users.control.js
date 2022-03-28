import { v4 as uuidv4} from 'uuid';

import User from './users.model';

let usersControl = [];

export function index(req, res){
    // res.json({users: usersControl}
    res.json({
        users: User.find()
    });
}

// function findUser(id){
//     let foundUsers = usersControl.filter(function(user){
//         if(user.id === id){
//             return true;
//         }
//         return false;
//     });
//
//     if(foundUsers.length > 0){
//         return foundUsers[0];
//     } else {
//         return null;
//     }
// }
export function show(req, res){
    // console.log("user length " + usersControl.length);
    // console.log("param id " + req.params.id);
   // var found = false;
   //  let existingUser = findUser(req.params.id);
    let existingUser = User.findById(req.params.id)
    if (existingUser){
        res.status(200);
        res.json(existingUser);
    } else {
        res.status(404);
        res.json({message: 'Not Found'});
    }
    // var foundID;
    // for (let i = 0; i < usersControl.length; i++){
    //     // console.log("find one id " + usersControl[i].id);
    //     if (usersControl[i].id == req.params.id){
    //         found = true;
    //         foundID = usersControl[i].id;
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

export function create(req, res){
    // let id = uuidv4();
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
        name,
        address,
        age
    };
    //usersControl.push(user);
    let newUser = User.create(user)
    res.status(201);
    res.json(newUser);
}

export function upsert(req, res){
    let existingUser = User.findOneAndUpdate(req.params.id);

    if(existingUser){
        // existingUser.name = req.body.name;
        // existingUser.address = req.body.address;
        // existingUser.age = req.body.age;
        let updatedUser = User.findById(req.params.id);
        updatedUser.name = req.body.name;
        updatedUser.address = req.body.address;
        updatedUser.age = req.body.age;
        res.status(200);
        res.json(updatedUser);
    } else { //if the user doesn't exist
        let id = req.params.id;
        let name = req.body.name;
        let address = req.body.address;
        let age = req.body.age;
        let user = {
            name,
            address,
            age
        }
        //usersControl.push(user);
        let newUser = User.create(user);
        newUser.id = id; //creating user then reassigning the ID passed
        res.status(201);
        res.json(newUser);
    }
}

export function destroy(req, res){
    let existingUser = User.findById(req.params.id);
    //User.remove(existingUser);
    // let userIndex = usersControl.map(function(user){
    //     return user.id;
    // }).indexOf(req.params.id);
    //
   // let removedUser = User.remove(existingUser);
    if (existingUser){
        // //usersControl.pop(existingUser);
        // // usersControl.splice()
        // usersControl.splice(userIndex, 1);
        User.remove(req.params.id);
        res.status(204).send();
    } else {
        res.status(404);
        res.json({message: "Not Found"});
    }
}
