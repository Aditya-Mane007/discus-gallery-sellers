"use client";
import { useUser, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const IsUser = () => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isSignedIn || !isLoaded) {
    return (
      <Link href="/sign-in" className="my-4">
        Sign In
      </Link>
    );
  }

  return (
    <div className="my-4">
      <UserButton />
    </div>
  );
};

export default IsUser;
