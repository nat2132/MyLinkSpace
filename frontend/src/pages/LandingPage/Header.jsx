import { useState } from "react";
import { Button } from "../../components/ui/button"
import space from "../../assets/space.png"
import { Link } from "react-router-dom"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 lg:p-10">
      <nav className="container mx-auto flex flex-wrap justify-between items-center bg-[#FFFFFF] p-4 lg:p-5 rounded-full">
        <div className="flex items-center justify-between w-full lg:w-auto">
          <div className="w-8 h-8 lg:w-10 lg:h-10 ml-2 lg:ml-5">
            <img src={space} alt="Space" className="w-full h-full"/>
          </div>
          <button onClick={toggleMenu} className="lg:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex flex-col lg:flex-row items-center w-full lg:w-auto mt-4 lg:mt-0 space-y-4 lg:space-y-0 lg:space-x-8`}>
          <Link to="#home" className="text-base lg:text-[22px] font-medium text-[#676B5F]">Home</Link>
          <Link to="#pricing" className="text-base lg:text-[22px] font-medium text-[#676B5F]">Pricing</Link>
          <Link to="#faqs" className="text-base lg:text-[22px] font-medium text-[#676B5F]">FAQ</Link>
          <Link to="/about" className="text-base lg:text-[22px] font-medium text-[#676B5F]">About Us</Link>
          <Link to="/contact" className="text-base lg:text-[22px] font-medium text-[#676B5F]">Contact Us</Link>
        </div>
        <div className={`${isMenuOpen ? 'flex' : 'hidden'} lg:flex items-center space-y-4 lg:space-y-0 lg:space-x-4 w-full lg:w-auto mt-4 lg:mt-0 flex-col lg:flex-row`}>
          <Button 
            variant="outline" 
            className="text-black text-sm lg:text-[22px] bg-[#EFF0EC] px-3 py-2 lg:p-5 h-10 lg:h-16 w-full lg:w-auto"
            asChild
          >
            <Link to="/login">Log in</Link>
          </Button>
          <Button 
            className="bg-[#EB455F] text-sm lg:text-[22px] text-white hover:bg-gray-200 h-10 lg:h-16 rounded-full px-3 py-2 lg:p-5 w-full lg:w-auto"
            asChild
          >
            <Link to="/signup">Sign up free</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
