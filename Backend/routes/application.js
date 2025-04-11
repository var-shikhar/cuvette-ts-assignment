import express from "express";
import applicationController from '../controller/application.js';

const router = express.Router();

router.route('api/job-application/:id?').get(applicationController.getApplicationList).post(applicationController.postApplication).put(applicationController.putApplicationStatus).delete(applicationController.deleteApplication);

export default router;