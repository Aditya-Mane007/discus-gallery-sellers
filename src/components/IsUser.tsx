"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const IsUser = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isSignedIn || !isLoaded) {
    return <Link href="/sign-in" className="my-4">Sign In</Link>;
  }
  // TODO 1 : Check if user is present in database , if present set state and return user

  // TODO 2 : User is not present in database create user and return

  return (
    <div className="my-4">
      <UserButton />
    </div>
  );
};

export default IsUser;
