import img from "../../assets/about-us_img.png";

export default function About_us() {
  return (
    <div className="relative min-h-screen px-4 sm:px-8 md:px-16 py-16 sm:py-24 md:py-36 flex flex-col items-center" id="about_us">
      <div className="max-w-7xl w-full">
        <div className="flex flex-col gap-8 lg:gap-16">
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-gray-100 mb-6">
                <span className="glitch" data-text="About Us">About Us</span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-[21px] text-gray-100 font-medium">
                <strong>MyLinkSpace</strong> is a   tool to help you share everything you are,
                in one simple link – making your online content more
                discoverable, easier to manage and more likely to convert.
                Here&apos;s where it all began.
              </p>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <img src={img} alt="About Us" className="max-w-full h-auto" />
            </div>
          </div>
          <div className="space-y-6 text-gray-100 font-medium text-base sm:text-lg">
            <p className="hover:scale-105 transition-transform duration-300 ease-in-out">
              At MyLinkSpace, we understand that in today&apos;s fast-paced digital world, convenience and accessibility are key. That&apos;s why we&apos;ve created a platform that lets you share all your important links in one place, making it easier for your audience to find everything they need with a single click. Whether you&apos;re an influencer, entrepreneur, artist, or business, our tools are designed to help you stand out, with seamless customization options that reflect your personal or professional brand.
            </p>
            <p className="hover:scale-105 transition-transform duration-300 ease-in-out">
              Our mission is to bridge the gap between you and your audience by providing robust features that make managing your digital presence effortless. With powerful analytics, you can track your link performance and gain insights into your audience&apos;s engagement. Our platform also offers exclusive premium features like custom domains, advanced design settings, and enhanced link analytics, allowing you to elevate your online profile and grow your reach like never before.
            </p>
            <p className="hover:scale-105 transition-transform duration-300 ease-in-out">
              As we continue to evolve, our focus remains on providing a user-friendly experience that meets the needs of our diverse community. We are constantly working to improve our platform, offering new features and integrations that help you stay ahead in the ever-changing digital landscape. Join us today and take control of your online presence with MyLinkSpace—where your links, brand, and identity come together.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}