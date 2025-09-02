import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from "../models/User.model.js";
// Create a client to send and receive events
export const inngest = new Inngest({ id: "talkspace" });


const syncUser = inngest.createFunction(
    {id:"sync-user"},
    {event:"clerk/user.created"},
    async ({ event })=> {
        await connectDB();
        const {id, email_addresses, first_name, last_name} = event.data;

        const newUseer ={
            clerkId: id,
            email: email_addresses[0].email_address,
            name: `${first_name || ""} ${last_name|| ""}`.trim(),
            image: image_url,
        };
        await User.create(newUseer);
        //to do more things
    }
);

const delteUserFromDB = inngest.createFunction(
    {id:"delete-user-from-db"},
    {event:"clerk/user.deleted"},
    async ({ event })=> {
        await connectDB();
        const {id}= event.data;
        await User.deleteOne({clerkId: id});
        // await deleteStreamUser(id.toString());
    }
)

export const functions = [syncUser, delteUserFromDB];