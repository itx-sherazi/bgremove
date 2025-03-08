import UserModel from '../models/UserModel.js';
import { Webhook } from 'svix';

export const clerkWebhooks = async (req, res) => {
    try {
        // Webhook secret from environment variables
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        // Extract headers
        const headers = {
            "svix-id": req.headers['svix-id'],
            "svix-timestamp": req.headers['svix-timestamp'], // ✅ Fixed typo
            "svix-signature": req.headers['svix-signature']
        };

const {data, type} = req.body

switch (type) {
    case "user.created":{
        const userData = {
            clerkId: data.id,
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            photo:data.image_url

        }
        // Save user data to the database
        await UserModel.create(userData);
res.json({})     
        break;
    }
    case "user.updated":{
        const userData = {
           
            email: data.email_addresses[0].email_address,
            firstName: data.first_name,
            lastName: data.last_name,
            photo:data.image_url

        }
        // Update user data in the database
        await UserModel.findOneAndUpdate({clerkId:data.id},userData);
        res.json({})
     
        break;
    }
    case "user.deleted":{
        await UserModel.findOneAndDelete({clerkId:data.id});
     
        break;
    }
   

    default:
        break;
}





}catch (error) {
        console.error("Webhook verification failed:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
