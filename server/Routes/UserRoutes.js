import express from 'express';
import { clerkWebhooks } from '../controller/UserController.js';

const router = express.Router();  


router.post('/webhooks',clerkWebhooks)






export default router