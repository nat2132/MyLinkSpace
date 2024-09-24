import { Button } from "../../components/ui/button";
import hero_2 from "../../assets/hero_2.png";
import { Cover } from "../../components/ui/cover";
import Layout from "./Layout";

export default function Hero_2() {
  return (
    <Layout backgroundType="blackhole">
    <div className="min-h-screen relative overflow-hidden ">
      <div className="relative z-10 flex items-center justify-center p-20 max-w-full min-h-screen">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 relative mb-8 md:mb-0">
            <img src={hero_2} alt="Hero" width={700} className="rounded-lg shadow-2xl"/>
          </div>
          <div className="md:w-1/2 md:pl-8 md:-mr-24">
            <h1 className="text-7xl md:text-7xl font-black mb-6 text-[#be5f1b] drop-shadow-lg">
              Your Linkspace, your way. Customize <Cover>it in a flash.</Cover>
            </h1>
            <p className="text-xl py-10 font-medium text-[#b86428] drop-shadow-md">
              Bring all your online content together in one place. Link your TikTok, Instagram, Twitter, and more.
            </p>
            <Button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full h-16 text-[20px] shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              Get started for free
            </Button>
          </div>
        </div>
      </div>
    </div>
    </Layout>
  );
}