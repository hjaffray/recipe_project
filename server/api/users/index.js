import express from 'express';
import * as users from './users';

let router = express.Router();

router.get('/', users.listContents);
router.get('/:id', users.findOne);
router.post('/', users.createUser);
router.put('/:id', users.updateUser);
router.delete('/:id', users.removeUser);
export {router};
