import connectDb from "@/lib/connectDB";
import Store from "@/lib/Schemas/storeSchema";
import { useUser } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";

export const GET = async (req: Request) => {
  try {
    connectDb();
    const reqBody = await req.json();

    const { id } = reqBody;

    const userExists = await Store.findById(id);

    if (userExists) {
      throw new Error("User Already Exists");
    }
  } catch (error) {
    return new Response("Error Fetching store", {
      status: 500,
    });
  }
};

export const POST = async (req: Request) => {
  try {
    connectDb();
    const reqBody = await req.json();

    const { email, phone, owner, id, image } = reqBody;

    const userExists = await Store.findOne({ email: email });

    if (userExists) {
      return new Response(userExists, {
        status: 200,
      });
    }

    const newUser = await Store.create({
      storeLogo: image,
      ownerName: owner,
      clerkId: id,
      email: email,
      phone: phone,
      onboarded: false,
    });

    return new Response(newUser, {
      status: 200,
    });
  } catch (error) {
    return new Response(`${error}`, {
      status: 500,
    });
  }
};

export const PATCH = async (req: Request) => {
  try {
    connectDb();
    const { userId } = await auth();
    const reqBody = await req.formData();

    const storeId = await Store.findOne({ clerkId: userId });

    if (!storeId) {
      throw new Error("Store Does not exists");
    }

    

    const existingStore = await Store.findByIdAndUpdate(storeId._id, {
      // storeLogo: reqBody.get("image"),
      storeName: reqBody.get("name"),
      description: reqBody.get("description"),
    });
    return new Response(existingStore, {
      status: 200,
    });
  } catch (error) {
    return new Response(error, {
      status: 500,
    });
  }
};

export const DELETE = async (req: Request) => {};
