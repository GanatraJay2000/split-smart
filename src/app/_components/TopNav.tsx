import React from "react";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

function TopNav() {
  return (
    <div className="flex items-center justify-between border-b border-b-zinc-600 px-3 py-2">
      <div className="text-xl font-semibold">Split-Smart</div>
      <div className="flex items-center">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </div>
  );
}

export default TopNav;
