const { OpenAI } = require('openai');
const cloudinary = require('cloudinary').v2;
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// 配置 Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const createImage = async (req, res) => {
    try {
        const { prompt_user, amount } = req.body;
        const response = await openai.images.generate({
            prompt: prompt_user,
            n: amount,
            size: '1024x1024',
        });
        const data = response.data;

        // 上传到 Cloudinary
        const uploadedUrls = await uploadCloudinary(data);

        // console.log('Uploaded to Cloudinary:', uploadedUrls);
        return res.status(201).send({ uploadedUrls });
    } catch (error) {
        console.error(error);
        return res.status(500).send(error?.response?.data?.error?.message || 'Something went wrong');
    }
}

const uploadCloudinary = async (imageArray) => {
    try {
        // 上传所有图片到 Cloudinary
        const uploadPromises = imageArray.map(async item => {
            const cloudinaryResponse = await cloudinary.uploader.upload(item.url, {
                folder: 'Artify Images', // 替换为你希望的 Cloudinary 文件夹
            });
            return cloudinaryResponse.secure_url;
        });

        // 等待所有上传完成
        const uploadedUrls = await Promise.all(uploadPromises);

        return uploadedUrls;
    } catch (error) {
        console.error('Cloudinary Upload Error:', error);
        return null;
    }
}

module.exports = {
    createImage,
};
