import { v4 as uuidv4} from 'uuid';
let users = [];

export function listContents(req, res){
    res.json({users});
}
export function findOne(req, res){
    // console.log("user length " + users.length);
    // console.log("param id " + req.params.id);
    var found = false;
    var foundID;
    for (let i = 0; i < users.length; i++){
        // console.log("find one id " + users[i].id);
        if (users[i].id == req.params.id){
            found = true;
            foundID = users[i].id;
        }
    }
    if(found == true){
        console.log("true");
        res.status(200);
        res.json({'id':foundID});
    }
    else {
        res.status(404);
        res.json({message: 'Not Found'});
    }

}

export function createUser(req, res){
    let newId = uuidv4();
    let newName = req.body.name;
    let newAddress = req.body.address;
    let newAge = req.body.age;
    let user = {
        'id': newId,
        'name': newName,
        'address': newAddress,
        'age': newAge,
    };
    users.push(user);
    res.status(201);
    res.json({'id': user.id});
}
