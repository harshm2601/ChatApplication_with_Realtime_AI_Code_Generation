import { generateResult } from '../services/ai.service.js'

export const getResult = async (req, res) => {
    try {
        const { prompt } = req.query;
        const result = await generateResult(prompt);
        res.status(200).json(result);
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
}

