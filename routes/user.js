var express = require('express');
var router = express.Router();
const uploadFile = require('../middleware/uploadImage');
const uploadMultipleFiles = require('../middleware/uploadMultipleFiles');
const controller = require('../controller/user.Controller');
const { verifyToken } = require('../controller/product.Controller');

//localhost:3000/users/saveUser
router.post('/saveUser', controller.createUser);

//localhost:3000/users/login
router.post('/login', controller.login);

//localhost:3000/users
router.get('/', controller.readUser);

//localhost:3000/users/userById/:user_id
router.get('/userById/:user_id', controller.readUserById);

//localhost:3000/users/tagsByUsersId/:user_id
router.get('/tagsByUserId/:user_id', controller.getTagsByUserId);

//localhost:3000/users/disciplines
router.get('/disciplines', controller.getDisciplines);

//localhost:3000/users/disciplines/:user_id
router.get('/disciplines/:user_id', controller.getDisciplinesByUserId);

// localhost:3000/users/updateProfile/:user_id
router.put('/updateProfile/:user_id', uploadMultipleFiles([ {name: 'avatar', maxCount: 1 }, { name: 'front', maxCount: 1 }]), controller.updateUser);

// localhost: 3000/users/updateUserData/:user_id
router.put('/updateUserData/:user_id', controller.updateUserData);

//localhost:3000/users/find
router.post('/find', controller.searchUser)

//localhost:3000/users/delete/:user_id
router.delete('/delete/:user_id', controller.UpdateDeleted);

//localhost:3000/users/deleteByAdmin/:user_id
router.delete('/deleteByAdmin/:user_id', controller.deleteUser);


//localhost:3000/users/avatar/:user_id
router.post('/avatar/:user_id', uploadFile('avatar'), controller.updateAvatar);

module.exports = router;