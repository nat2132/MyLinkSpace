import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Button } from "../../components/ui/button"
import { RocketIcon } from 'lucide-react'
import astronant from "../../assets/astronant.png"

export default function Contact_us() {
  return (
    <div className="relative min-h-screen text-white p-8 flex flex-col items-center py-32 overflow-hidden" id="contact_us">
      <div className="relative max-w-fit w-full z-10">
        <h1 className="text-7xl font-black mb-2 text-center">
          <span className="cosmic-text" data-text="Get in">Get in</span>{" "}
          <span className="cosmic-text purple-glow" data-text="Touch">Touch</span>
        </h1>
        <p className="text-xl text-gray-400 mb-12 text-center my-10">
          Reach out, and let&apos;s create a universe of possibilities together!
        </p>
        
        <div className="flex flex-col md:flex-row gap-8 bg-[#0A0D17] p-16 rounded-lg">
          <div className="flex-1 space-y-6">
            <h2 className="text-4xl font-semibold mb-2">Let&apos;s connect constellations</h2>
            <p className="text-gray-400">
              Let&apos;s align our constellations! Reach out and let the magic of collaboration illuminate our skies.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="First Name" className="bg-gray-800 border-gray-700" />
              <Input placeholder="Last Name" className="bg-gray-800 border-gray-700" />
            </div>
            <Input placeholder="Email" className="bg-gray-800 border-gray-700" />
            <Input placeholder="Phone Number" className="bg-gray-800 border-gray-700" />
            <Textarea placeholder="Message" className="bg-gray-800 border-gray-700" rows={4} />
            <Button className="w-full bg-purple-600 hover:bg-purple-700 h-14 text-[18px]">
              Send it to the moon <RocketIcon className="ml-2" />
            </Button>
          </div>
          <div className="w-[600px] h-[600px]">
          <img 
                src={astronant} 
                alt="Astronaut sitting on a rock in space" 
                className="w-full h-full"
              />
          </div>
        </div>
      </div>
    </div>
  )
}