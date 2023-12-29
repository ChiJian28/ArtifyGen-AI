const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
const createImage = async (req, res) => {
    try {
        const { prompt_user, amount } = req.body;
        const response = await openai.images.generate({
            prompt: prompt_user,
            n: amount,
            size: '1024x1024',
        })
        const data = response.data;
        console.log(data)
        return res.status(201).send(data);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
}

module.exports = {
    createImage
}