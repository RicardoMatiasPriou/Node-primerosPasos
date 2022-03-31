import { Router } from "express";
import { getPosts, createPost, deletePost, getOnePost, updatePost } from '../controllers/post.controllers.js';


const router = Router();


router.get('/posts', getPosts);
router.post('/posts', createPost);
router.put('/posts/:id', updatePost);
router.delete('/posts/:id', deletePost);
router.get('/posts/:id', getOnePost);






export default router