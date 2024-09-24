import About_us from "./About_us";
import Contact_us from "./Contact_us";
import Faqs from "./Faqs";
import Footer from "./Footer";
import Hero_1 from "./Hero-1";
import Hero_2 from "./Hero-2";
import Layout from "./Layout";
import Pricing from "./Pricing";

export const LandingPage = () => {
  return (
    <Layout>
      <Hero_1 />
      <Hero_2 />
      <Pricing />
      <Faqs />
      <About_us />
      <Contact_us />
      <Footer />
    </Layout>
  );
};
