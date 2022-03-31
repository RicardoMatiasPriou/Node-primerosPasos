import { deleteImage, uploadImage } from "../libs/cloudinary.js";
import Post from "../models/post.js";
import  fs  from "fs-extra";

export const getPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.send(posts);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message })
    }

};

export const createPost = async (req, res) => {
    try {
        const { title, description } = req.body;
        let image;

        if (req.files?.image) {
            const result = await uploadImage(req.files.image.tempFilePath)
            await fs.remove(req.files.image.tempFilePath)
            image={
                url:result.secure_url,
                public_id: result.public_id
            }

        }

        const newPost = new Post({ title, description, image });
        await newPost.save();
        return res.json(newPost);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message })

    }
};

export const updatePost = async (req, res) => {
    console.log(req.params.id);
    try {
        const updatePost = await Post.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        console.log(updatePost);
        return res.send(updatePost);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message })
    }
};

export const deletePost = async (req, res) => {
    try {
        const postRemoved = await Post.findByIdAndDelete(req.params.id);
        if (!postRemoved) return res.sendStatus(404);

        if (postRemoved.image.public_id) {
            await deleteImage(postRemoved.image.public_id)
        }

        return res.sendStatus(204);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message })
    }
};

export const getOnePost = async (req, res) => {
    try {
        const post1 = await Post.findById(req.params.id);
        if (!post1) return res.send(405);
        return res.json(post1);
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: error.message })
    }
};
