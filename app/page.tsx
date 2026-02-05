//Default page which gets rendered or gets rendered during app startup

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>UI UX MOCK</h1>
      <Button>Welcome to my website</Button>
      <UserButton></UserButton>
    </div>
  );
}
