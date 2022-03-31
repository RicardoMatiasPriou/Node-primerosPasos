import express from "express";
import postsRoutes from './routes/posts.routes.js'
import fileUpload from "express-fileupload";


const app = express()

// middelwares
app.use(express.json())
app.use(fileUpload({
    useTempFiles: true,
    tempFileDir: './upload',
}))
//routes
app.use(postsRoutes)




export default app