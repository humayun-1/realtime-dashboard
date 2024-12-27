import Link from "next/link";
import { Button } from "./components/ui/button";

export default function Home() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Link href={"/dashboard"}>
        <Button variant="outline">Open Dashboard</Button>
      </Link>
    </div>
  );
}
