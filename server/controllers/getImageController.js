const Post = require('../models/post');

const getImage = async (req, res) => {
    try {
        const allUser = await Post.findAll();
        return res.status(200).json(allUser);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error.message);
    }
}

module.exports = {
    getImage
}