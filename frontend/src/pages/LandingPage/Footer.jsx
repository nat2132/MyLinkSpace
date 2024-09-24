import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import app_store from "../../assets/apple.svg";
import play_store from "../../assets/google-play.svg";
import twitter from "../../assets/twitter.svg";
import tiktok from "../../assets/tiktok.svg";
import instagram from "../../assets/instagram.svg";
import spaces from "../../assets/token_spaces.svg";
import space from "../../assets/token_space.png"
import { FlipWords } from "../../components/ui/flip-words";
import { FloatingDock } from "../../components/ui/floating-dock";
import { useEffect, useRef } from 'react';

const StarryBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const createStar = () => {
      const star = document.createElement('div');
      star.className = 'star';
      star.style.width = `${Math.random() * 2 + 1}px`;
      star.style.height = star.style.width;
      star.style.left = `${Math.random() * 100}%`;
      star.style.top = `${Math.random() * 100}%`;
      star.style.animationDuration = `${Math.random() * 2 + 1}s`;
      container.appendChild(star);
    };

    for (let i = 0; i < 50; i++) {
      createStar();
    }

    return () => {
      while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 overflow-hidden" />;
};

const words = ["internet", "web", "world"];
const links = [
  {
    title: "Apple Store",
    icon: <img src={app_store} alt="App Store" className="h-36 w-auto" />,
    href: "#",
  },

  {
    title: "Play Store",
    icon: <img src={play_store} alt="Google Play" className="h-36 w-auto" />,
    href: "#",
  },
  {
    title: "MyLinkSpace",
    icon: <img src={spaces} alt="Social Icon 1" className="h-20 w-auto" />,
    href: "#",
  },
  {
    title: "Twitter",
    icon: <img src={twitter} alt="Social Icon 2" className="h-20 w-auto" />,
    href: "#",
  },
  {
    title: "TikTok",
    icon: <img src={tiktok} alt="Social Icon 3" className="h-20 w-auto" />,
    href: "#",
  },

  {
    title: "Instagram",
    icon: <img src={instagram} alt="Social Icon 4" className="h-20 w-auto" />,
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="flex flex-col items-center p-4 sm:p-8 md:p-16 lg:p-20 pt-16 sm:pt-24 md:pt-32 z-50 ">
      <div className="max-w-[90rem] w-full space-y-16">
        <h1 className="text-5xl md:text-7xl font-black text-center text-[#00A1FF]">
          Jumpstart your corner of the{" "}
          <FlipWords words={words} className="text-[#00A1FF]" /> <br /> today
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-32">
          <Input
            placeholder="linkspa.ce/yourname"
            className="bg-white text-black max-w-xs w-full h-16 text-[20px]"
          />
          <Button className="bg-cyan-400 text-black hover:bg-cyan-500 w-full sm:w-auto h-16 text-[20px]">
            Claim your MyLinkSpace
          </Button>
        </div>

        <Card className="bg-white w-full">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-[20px]">
              <div className="flex flex-col items-center ">
                <h2 className="font-bold mb-4">Company</h2>
                <ul className="space-y-2">
                  <li>The MyLinkSpace Blog</li>
                  <li>What&apos;s New</li>
                  <li>About</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div className="flex flex-col items-center ">
                <h2 className="font-bold mb-4">Support</h2>
                <ul className="space-y-2">
                  <li>Help Topics</li>
                  <li>Getting Started</li>
                  <li>MyLinkSpace Premium</li>
                  <li>Features & How-Tos</li>
                  <li>FAQs</li>
                  <li>Report a Violation</li>
                </ul>
              </div>
              <div className="flex flex-col items-center">
                <h2 className="font-bold mb-4">Trust & Legal</h2>
                <ul className="space-y-2">
                  <li>Terms & Conditions</li>
                  <li>Privacy Notice</li>
                  <li>Cookie Notice</li>
                  <li>Trust Center</li>
                </ul>
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <div className="space-x-4 flex flex-wrap justify-center gap-2">
                <Button
                  variant="outline"
                  className="bg-gray-100 h-14 w-40 text-[19px]"
                >
                  Log in
                </Button>
                <Button className="bg-purple-400 hover:bg-purple-500 h-14 text-[19px] rounded-full">
                  Get started for free
                </Button>
              </div>
              <div className="flex flex-wrap justify-center gap-6 items-center">
                <FloatingDock
                  mobileClassName="translate-y-20" // only for demo, remove for production
                  items={links}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-blue-300 w-full">
          <CardContent className="cosmic-bg p-6 sm:p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-center rounded-xl sm:flex-row sm:relative sm:gap-2 overflow-hidden">
            <StarryBackground />
            <div className="z-10 flex flex-col lg:flex-row items-center justify-center">
              <h2 className="cosmic-texts text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-bold text-center lg:text-left mb-4 lg:mb-0 text-white">
                MyLinkSpace
              </h2>
              <img src={space} alt="MyLinkSpace" className="cosmic-images w-32 sm:w-20 md:w-48 lg:w-auto lg:max-w-[200px] mt-4 lg:mt-0 lg:ml-8 sm:bottom-3 sm:relative" />
            </div>
          </CardContent>
        </Card>

        <p className="text-center text-lg text-white">
          © 2024 MyLinkSpace. All rights reserved. Unauthorized use,
          reproduction, or distribution of this website and its contents without
          prior written consent is prohibited. All trademarks, logos, and brand
          names are the property of their respective owners.
        </p>
      </div>
    </footer>
  );
}
