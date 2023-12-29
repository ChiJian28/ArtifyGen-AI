const Post = require('../models/post');

const shareImage = async (req, res) => {
    try {
        const { name, img, prompt_user } = req.body;
        const user = await Post.create({ name, prompt_user, img });
        console.log(user)
        return res.status(201).send(user);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}

module.exports = {
    shareImage
}