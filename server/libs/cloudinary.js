import cloudinary from 'cloudinary'

cloudinary.config({
    cloud_name : "ricardo3874",
    api_key : "378861831432973",
    api_secret : "d8x6lALQEd87zuHfBvRz3D1zTWU"
})

export const uploadImage = async filePath=>{ 
   return await cloudinary.v2.uploader.upload(filePath,{
        folder:'posts'
    })
}

export const deleteImage = async id =>{
    return await cloudinary.uploader.destroy(id)
}