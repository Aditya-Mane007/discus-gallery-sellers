"use server"
import { NextResponse } from "next/server"
import { connectToDB } from "../dbConfig/db"
import Seller from "../models/seller.model"

export const fetchSeller = async (userId: string) => {
  try {
    connectToDB()
    const user = await Seller.findOne({ userId: userId })

    return NextResponse.json({ message: "Get User", user }, { status: 200 })
  } catch (error: any) {
    throw new Error("Failed to fetch error: ", error)
  }
}

export const createSeller = async ({
  userId,
  firstName,
  lastName,
  email,
  profileImage,
  phoneNumber,
  seller
}: {
  userId: string
  firstName: string
  lastName: string
  email: string
  profileImage: string
  phoneNumber: string
  seller: boolean
}) => {
  try {
    connectToDB()
    const sellerExists = await Seller.findOne({ userId: userId })

    if (sellerExists) {
      throw new Error("User Already Exists")
    }

    const newProfile = await Seller.create({
      userId,
      firstName,
      lastName,
      email,
      profileImage,
      phoneNumber,
      seller
    })

    return NextResponse.json(
      { message: "User created", newProfile },
      { status: 201 }
    )
  } catch (error: any) {
    console.log(error)
    throw new Error("Failed to create user", error)
  }
}

export const deleteSeller = async (userId: string | null) => {
  try {
    connectToDB()

    const user = await Seller.findOne({ userId: userId })

    if (!user) {
      throw new Error("User not found")
    }

    const deletedUser = await Seller.deleteOne({ _id: user.id })

    if (!deletedUser) {
      throw new Error("Somthing went wrong ,try again later")
    }

    return NextResponse.json({ message: "User deleted" }, { status: 201 })
  } catch (error: any) {
    console.log(error)
    throw new Error("Failed to delete user", error)
  }
}
