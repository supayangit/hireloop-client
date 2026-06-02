import Banner from "@/components/home/banner";
import Roles from "@/components/home/Roles";
import Need from "@/components/home/Need";
import Pricing from "@/components/home/Pricing";
import Looking from "@/components/home/Looking";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center font-sans dark:bg-black">
      <Banner />
      <Roles />
      <Need />
      <Pricing />
      <Looking />
    </div>
  );
}
