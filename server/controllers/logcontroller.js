import PlantLog from '../models/plantLog.js';

export const createLog = async (req, res) => {
    const { Plant, Category, Symptoms, Body, userId, username } = req.body;

    const newLog = new PlantLog({
        plant: Plant,
        category: Category,
        symptoms: Symptoms,
        body: Body,
        user: userId,
        username: username
    });

    try {
        await newLog.save();
        res.status(201).json({ success: true, data: newLog });
    } catch (error) {
        console.error('Error creating log:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getLogs = async (req, res) => {
    try {
        const logs = await PlantLog.find().sort({ date: -1 });
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        console.error('Error fetching logs:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
};

export const getLogsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const logs = await PlantLog.find({ user: userId }).sort({ date: -1 });
        res.status(200).json({ success: true, data: logs });
    } catch (error) {
        console.error('Error fetching user logs:', error.message);
        res.status(500).json({ success: false, message: 'Server Error' });
    }
}; 