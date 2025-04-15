import express from 'express';
import { getUserProfileCtrl, loginUserCtrl, registerUserCtrl, logoutUserCtrl, getUserByIdCtrl, getAllUsersCtrl, deleteUserCtrl } from '../controllers/userController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';

const userRoutes = express.Router();

userRoutes.post('/register', registerUserCtrl);
userRoutes.post('/login', loginUserCtrl);
userRoutes.post('/logout', isLoggedIn, logoutUserCtrl);
userRoutes.get('/profile', isLoggedIn, getUserProfileCtrl);
userRoutes.get('/', getAllUsersCtrl);
userRoutes.get('/:id', getUserByIdCtrl);
userRoutes.delete('/:id', deleteUserCtrl);

export default userRoutes;