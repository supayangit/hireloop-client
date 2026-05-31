import Image from "next/image";
import Banner from "@/components/home/banner";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-sans dark:bg-black">
      <Banner></Banner>
    </div>
  );
}
