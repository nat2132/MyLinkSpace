import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import hero_1 from "../../assets/hero_1.png"
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { TypeAnimation } from 'react-type-animation';
import { useSpring, animated } from '@react-spring/web';
import Layout from './Layout';
import {Tilt} from 'react-tilt';

export default function Hero_1() {
  const headingRef = useRef(null);
  const [typingDone, setTypingDone] = useState(false);

  // Fade-in image effect
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  useEffect(() => {
    if (typingDone && headingRef.current) {
      const heading = headingRef.current;
      const letters = heading.innerText.split('');
      
      heading.innerHTML = letters.map(letter => 
        letter === ' ' ? ' ' : `<span>${letter}</span>`
      ).join('');

      const spans = heading.querySelectorAll('span');

      spans.forEach(span => {
        span.addEventListener('mouseenter', () => {
          gsap.to(span, {
            color: '#FF00FF', // Change to desired hover color
            y: -20, // Increased vertical movement
            scale: 1.2, // Added scale for more emphasis
            duration: 0.3,
            ease: 'back.out(1.7)' // Changed easing for a more bouncy effect
          });
        });

        span.addEventListener('mouseleave', () => {
          gsap.to(span, {
            color: '#3F56A9', // Change back to original color
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'back.out(1.7)'
          });
        });
      });
    }
  }, [typingDone]);

  return (
    <Layout backgroundType="blackhole">
    <div className="min-h-screen w-screen relative">
      <div className="relative z-10">
        <main className="container px-32 flex flex-col lg:flex-row items-center max-w-full">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 ref={headingRef} className="text-5xl lg:text-[100px] font-black mb-6 text-[#BAD7E9]">
              {!typingDone ? (
                <TypeAnimation
                  sequence={[
                    'All that you are, captured in one simple bio link.',
                    () => setTypingDone(true)
                  ]}
                  wrapper="span"
                  cursor={false}
                  speed={40}
                />
              ) : (
                'All that you are, captured in one simple bio link.'
              )}
            </h1>
            <p className="text-2xl mb-8 text-[#BAD7E9] py-5">
              Join the community using MyLinkSpace for their bio links. <br /> One link to share everything you create, curate, and sell across <br /> Instagram, TikTok, Twitter, YouTube, and other social platforms.
            </p>
            <div className="flex space-x-4">
              <Input placeholder="linkspace.co/yourusername" className="bg-white text-black text-[16px] w-60 h-16" />
              <Button className="bg-[#EB455F] hover:bg-purple-700 rounded-full h-16 text-[20px]">Claim your MyLinkspace</Button>
            </div>
          </div>

          <div className="lg:w-1/2 relative">
            <animated.div style={fadeIn}>
              <Tilt className="Tilt" options={{ max: 25, scale: 1.05 }}>
                <img src={hero_1} alt={hero_1} className="w-full h-auto rounded-lg shadow-lg" />
              </Tilt>
            </animated.div>
          </div>
        </main>
      </div>
    </div>
    </Layout>
  )
}