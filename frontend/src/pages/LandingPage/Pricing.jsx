import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Check, X } from "lucide-react"
import PropTypes from 'prop-types';
import { GlareCard } from "../../components/ui/glare-card";

export default function Pricing() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative" id="pricing">
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black mt-10 md:mt-20 text-center">
          <span className="cosmic-title relative" data-text="Pick the perfect plan">
            Pick the perfect plan
          </span>
        </h1>
        <div className="flex flex-col lg:flex-row gap-8 w-full border-transparent mt-8 md:mt-16 lg:mt-32 justify-center">
          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 max-w-md mx-auto">
            <GlareCard>
              <Card className="w-full bg-white min-h-[600px] lg:min-h-[700px]">
                <CardHeader className="bg-[#FFD700]">
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">Free</CardTitle>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold">0 <span className="text-sm sm:text-base font-normal">Birr/month</span></div>
                </CardHeader>
                <CardContent className="pt-6 md:pt-10">
                  <ul className="space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg lg:text-[21px]">
                    <FeatureItem included>Limited Links</FeatureItem>
                    <FeatureItem included>Simple Profile Customization</FeatureItem>
                    <FeatureItem included>Social Media Icons</FeatureItem>
                    <FeatureItem>Advanced Customization</FeatureItem>
                    <FeatureItem>Link Scheduling and Expiration</FeatureItem>
                    <FeatureItem>Analytics</FeatureItem>
                    <FeatureItem>Unlimited links</FeatureItem>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full h-10 sm:h-12 text-sm sm:text-base md:text-[17px]">Join for free</Button>
                </CardFooter>
              </Card>
            </GlareCard>
          </div>

          <div className="w-full sm:w-4/5 md:w-3/4 lg:w-1/2 max-w-md mx-auto mt-8 lg:mt-0">
            <GlareCard>
              <Card className="w-full bg-white min-h-[600px] lg:min-h-[700px] rounded-lg">
                <CardHeader className="bg-gray-900 text-white relative">
                  <Badge className="absolute top-2 right-2 bg-[#D2E823] text-gray-900 text-xs sm:text-sm md:text-[17px] m-2 sm:m-4">Recommended</Badge>
                  <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold">Premium</CardTitle>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold">500 <span className="text-sm sm:text-base font-normal">Birr/month</span></div>
                </CardHeader>
                <CardContent className="pt-6 md:pt-10">
                  <ul className="space-y-3 md:space-y-4 text-sm sm:text-base md:text-lg lg:text-[21px]">
                    <FeatureItem included>Social Media Icons</FeatureItem>
                    <FeatureItem included>Advanced Customization</FeatureItem>
                    <FeatureItem included>Link Scheduling and Expiration</FeatureItem>
                    <FeatureItem included>Analytics</FeatureItem>
                    <FeatureItem included>Unlimited links</FeatureItem>
                  </ul>
                </CardContent>
                <CardFooter className="flex flex-col">
                  <Button className="w-full bg-orange-500 hover:bg-orange-600 h-10 sm:h-12 md:h-15 text-sm sm:text-base md:text-[20px] mt-6 md:mt-10">Get Premium</Button>
                  <p className="text-gray-500 mt-4 flex items-center text-xs sm:text-sm md:text-[17px]">
                    <Check size={16} className="mr-2" /> Premium users get more visitors
                  </p>
                </CardFooter>
              </Card>
            </GlareCard>
          </div>
        </div>
      </div>
    </div>
  )
}

function FeatureItem({ children, included = false }) {
  return (
    <li className="flex items-center">
      {included ? (
        <Check className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
      ) : (
        <X className="mr-2 h-4 w-4 sm:h-5 sm:w-5 text-red-500" />
      )}
      <span className={included ? 'text-gray-900' : 'text-gray-400'}>{children}</span>
    </li>
  )
}

FeatureItem.propTypes = {
  children: PropTypes.node.isRequired,
  included: PropTypes.bool
};