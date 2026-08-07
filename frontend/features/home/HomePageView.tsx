
import { FAQ } from "../faq";
import { Testimonials } from "../testimonials";
import { Training } from "../training";
import { WhyUs } from "../why-us";
import { ContactForm, ContactInfo } from "../contact/sections";
import Hero from "./sections/Hero";
import Projects from "./sections/Projects";
import Services from "./sections/Services";
import AboutStory from "../about/sections/AboutStory";

export default function HomePageView() {
  return (
    <>
      <Hero />
      <Services />
      <Projects />
      <AboutStory />
      <Training />
      <WhyUs /> {/* 2. Render WhyUs here */}
      <Testimonials />
      <FAQ />
      <ContactInfo />


    </>
  );
}
