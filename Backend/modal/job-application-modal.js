import mongoose from 'mongoose';

// User Event Schema (Participant Lists)
const jobSchema = new mongoose.Schema({
    company: { type: String, required: true },
    role: { type: String, required: true },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied',
    },
    dateOfApplication: { type: Date, default: Date.now },
    link: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /^https?:\/\/.+/.test(v);
            },
            message: props => `${props.value} is not a valid URL!`
        }
    }
});

const JobApplication = mongoose.model('JobApplication', jobSchema);
export default JobApplication;

