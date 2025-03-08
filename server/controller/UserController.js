import UserModal from '../models/UserModel.js';
import { Webhook } from 'svix';

export const clerkWebhooks = async (req, res) => {
    try {
        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
        
        // Verify Clerk Webhook Signature
        const payload = whook.verify(
            JSON.stringify(req.body),  // Clerk's webhook payload
            {
                "svix-id": req.headers['svix-id'],
                "svix-timestamp": req.headers['svix-timestamp'],
                "svix-signature": req.headers['svix-signature']
            }
        );

        console.log("Webhook Payload:", payload);

        // Extract User Data from Webhook
        const { id, email_addresses, first_name, last_name } = payload.data;

        // Check if user already exists in DB
        let existingUser = await UserModal.findOne({ clerkId: id });

        if (!existingUser) {
            // Create and Save New User
            const newUser = new UserModal({
                clerkId: id,
                email: email_addresses[0].email_address, // Taking first email
                firstName: first_name || "Unknown",
                lastName: last_name || "Unknown",
            });

            await newUser.save();
            console.log("User saved to MongoDB:", newUser);
        } else {
            console.log("User already exists in MongoDB.");
        }

        res.status(200).json({ success: true, message: "Webhook processed successfully." });

    } catch (error) {
        console.error("Error in webhook processing:", error);
        res.status(500).json({ success: false, error: error.message });
    }
};
