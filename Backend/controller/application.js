import { CustomError } from "../middleware/errorMiddleware.js";
import JobApplication from "../modal/job-application-modal.js";

// Get Job Application List
const getApplicationList = async (req, res, next) => {
    try {
        const jobList = await JobApplication.find().sort({ dateOfApplication: -1 });

        // Prepare a list of job applications
        const finalList = jobList?.reduce((acc, cur) => {
            acc.push({
                id: cur._id,
                company: cur.company,
                role: cur.role,
                status: cur.status,
                dateOfApplication: cur.dateOfApplication,
                link: cur.link
            });
            return acc;
        }, []);

        // Return the list of job applications
        return res.status(200).json(finalList);
    } catch (error) {
        next(error);
    }
}

// Create New Job Application
const postApplication = async (req, res, next) => {
    // Get the required fields from the request body
    const { companyName, jobRole, applicationStatus, dateOfApplication, applicationLink } = req.body;
    if (!companyName || !jobRole || !applicationStatus || !dateOfApplication || !applicationLink) return next(new CustomError('Please fill all the required fields!', 400));

    try {
        // Create a new job application
        const newApplication = new JobApplication({
            company: companyName.trim(),
            role: jobRole.trim(),
            status: applicationStatus,
            dateOfApplication: dateOfApplication,
            link: applicationLink.trim()
        });

        await newApplication.save();
        return res.status(200).json({ message: 'Job Application created successfully!' });
    } catch (error) {
        next(error);
    }
}

// Update Job Application Status
const putApplicationStatus = async (req, res, next) => {
    const { id, status } = req.body;
    if (!id || !status) return next(new CustomError('Please provide a valid job application ID and status!', 400));

    try {
        // Find the job application by ID
        const foundApplication = await JobApplication.findById(id);
        if (!foundApplication) return next(new CustomError("Job Application not found!", 404));

        // Update the job application status
        foundApplication.status = status;
        await foundApplication.save();
        return res.status(200).json({ message: 'Job Application status updated successfully!' });
    } catch (error) {
        next(error);
    }
}

// Delete Job Application
const deleteApplication = async (req, res, next) => {
    const { id } = req.params;
    if (!id) return next(new CustomError('Please provide a valid job application ID!', 400));
    try {
        // Find the job application by ID
        const foundApplication = await JobApplication.findById(id);
        if (!foundApplication) return next(new CustomError("Job Application not found!", 404));

        // Delete the job application
        await foundApplication.deleteOne();
        return res.status(200).json({ message: 'Job Application deleted successfully!' });
    } catch (error) {
        next(error)
    }
}

export default {
    getApplicationList, postApplication, putApplicationStatus, deleteApplication
}