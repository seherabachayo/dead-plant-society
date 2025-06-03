import mongoose from 'mongoose';

const plantLogSchema = new mongoose.Schema({
    plant: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    symptoms: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const PlantLog = mongoose.model('PlantLog', plantLogSchema);

export default PlantLog; 