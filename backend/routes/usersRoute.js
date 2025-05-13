import express from 'express';
import { getUserProfileCtrl, loginUserCtrl, registerUserCtrl, logoutUserCtrl, getUserByIdCtrl, getAllUsersCtrl, deleteUserCtrl, promoteUserCtrl } from '../controllers/userController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
import { createXmlUser, deleteXmlUser, getAllXmlUsers, getXmlUserById, updateXmlUser } from '../controllers/xml/usersXmlController.js';

const userRoutes = express.Router();

//XML
userRoutes.post('/xml-users', createXmlUser);
userRoutes.get('/xml-users', getAllXmlUsers);
userRoutes.get('/xml-users/:id', getXmlUserById);
userRoutes.put('/xml-users/:id', updateXmlUser);
userRoutes.delete('/xml-users/:id', deleteXmlUser);

//MongoDB
userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.post('/logout', isLoggedIn, logoutUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfileCtrl);
userRoutes.get('/', getAllUsersCtrl);
userRoutes.get('/:id', getUserByIdCtrl);
userRoutes.delete('/:id', deleteUserCtrl);

userRoutes.put('/promote/:id', promoteUserCtrl);

export default userRoutes;