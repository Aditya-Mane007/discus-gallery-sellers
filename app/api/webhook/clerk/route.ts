import { Webhook } from "svix"
import { headers } from "next/headers"
import { WebhookEvent } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { createSeller, deleteSeller } from "@/lib/actions/seller.action"

export async function POST(req: Request) {
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    )
  }

  // Get the headers
  const headerPayload = headers()
  const svix_id = headerPayload.get("svix-id")
  const svix_timestamp = headerPayload.get("svix-timestamp")
  const svix_signature = headerPayload.get("svix-signature")

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400
    })
  }

  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload)

  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET)

  let evt: WebhookEvent

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    }) as WebhookEvent
  } catch (err) {
    console.error("Error verifying webhook:", err)
    return new Response("Error occured", {
      status: 400
    })
  }

  // Get the ID and type
  const { id } = evt.data
  const eventType = evt.type

  if (eventType === "user.created") {
    const {
      id,
      first_name,
      last_name,
      email_addresses,
      phone_numbers,
      image_url
    } = evt?.data
    try {
      const newUser = await createSeller({
        userId: id,
        firstName: first_name,
        lastName: last_name,
        email: email_addresses[0].email_address,
        profileImage: image_url,
        phoneNumber: phone_numbers[0].phone_number,
        seller: false
      })
      return NextResponse.json({ message: "user created", user: newUser })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: error }, { status: 500 })
    }
  }

  if (eventType === "user.deleted") {
    try {
      const { id } = evt.data
      const deletedUser = await deleteSeller(id!)

      if (!deletedUser) {
        throw new Error("something went wrong")
      }
      return NextResponse.json({ message: "user deleted" }, { status: 200 })
    } catch (error) {
      console.log(error)
      return NextResponse.json({ message: error }, { status: 500 })
    }
  }

  return new Response("", { status: 200 })
}
