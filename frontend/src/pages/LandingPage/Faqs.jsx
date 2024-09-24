import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '../../components/ui/collapsible'
import { ChevronDown } from 'lucide-react'


const faqs = [
  {
    question: "Why do I need a link in bio tool?",
    answer: "A link in bio tool like MyLinkSpace allows you to share multiple links through a single URL. This is especially useful for platforms like Instagram where you can only have one clickable link in your profile. It helps you direct your audience to various content, products, or pages efficiently."
  },
  {
    question: "Is MyLinkSpace the original link in bio tool?",
    answer: "While MyLinkSpace isn't the original link in bio tool, it's designed to be a comprehensive and user-friendly alternative. We've incorporated features based on user feedback and industry best practices to create a tool that meets the evolving needs of content creators and businesses."
  },
  {
    question: "Can you get paid and sell things from a MyLinkSpace?",
    answer: "Yes! MyLinkSpace offers e-commerce integration, allowing you to sell products or services directly through your link in bio. You can connect your existing online store or use our built-in features to accept payments and manage sales."
  },
  {
    question: "Is MyLinkSpace safe to use on all of my social media profiles?",
    answer: "Absolutely. MyLinkSpace is designed with security in mind and is safe to use across all your social media profiles. We use encryption to protect your data and regularly update our security measures to ensure your information remains safe."
  },
  {
    question: "What makes MyLinkSpace better than the other link in bio options?",
    answer: "MyLinkSpace stands out with its user-friendly interface, customizable designs, detailed analytics, and seamless integration with various platforms. We also offer unique features like A/B testing for your links and AI-powered content suggestions to help optimize your bio link performance."
  },
  {
    question: "How can I drive more traffic to and through my MyLinkSpace?",
    answer: "To increase traffic, regularly update your content, use eye-catching designs, leverage our analytics to understand your audience, utilize our SEO optimization tools, and actively promote your MyLinkSpace across your social media channels. We also provide guides and tips to help you maximize your link's effectiveness."
  },
  {
    question: "How many links should I have on my MyLinkSpace?",
    answer: "The ideal number of links can vary, but we generally recommend 5-7 links for optimal user engagement. However, MyLinkSpace allows you to add as many links as you need, and you can easily organize them into categories to keep your page clean and navigable."
  },
  {
    question: "Do I need a website to use MyLinkSpace?",
    answer: "No, you don't need a website to use MyLinkSpace. Our platform can serve as a mini-website for your online presence. However, if you do have a website, MyLinkSpace can complement it by providing a convenient hub for all your important links."
  },
  {
    question: "Where can I download the app?",
    answer: "The MyLinkSpace app is available for both iOS and Android devices. You can download it from the Apple App Store or Google Play Store. Simply search for 'MyLinkSpace' and look for our official app. We also offer a fully functional web version that you can access from any browser."
  }
]

export default function Faqs() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-12" id='faqs'>
      <div className="w-full max-w-6xl space-y-4 relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white my-16 sm:my-20 md:my-24 lg:my-32 text-center">FAQs</h1>
        {faqs.map((faq, index) => (
          <Collapsible 
            key={index} 
            className="max-w-full"
            open={openIndex === index}
            onOpenChange={() => setOpenIndex(openIndex === index ? null : index)}
          >
            <CollapsibleTrigger className="w-full h-auto min-h-[4rem] sm:min-h-[5rem] md:min-h-[6rem] lg:min-h-[7rem] bg-white bg-opacity-80 rounded-lg p-3 sm:p-4 md:p-5 flex justify-between items-center text-left hover:bg-opacity-90 transition-colors">
              <span className="font-extrabold pl-2 sm:pl-4 md:pl-6 lg:pl-8 text-base sm:text-lg md:text-xl lg:text-[22px] pr-4">{faq.question}</span>
              <ChevronDown className={`h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 text-gray-500 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} />
            </CollapsibleTrigger>
            <CollapsibleContent className="bg-white bg-opacity-80 mt-1 rounded-lg overflow-hidden transition-all duration-300 ease-in-out">
              <p className="text-gray-700 text-sm sm:text-base md:text-lg lg:text-[21px] font-medium p-3 sm:p-4 md:p-6 lg:p-8 transform transition-all duration-300 ease-in-out">
                {faq.answer}
              </p>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </div>
    </div>
  )
}