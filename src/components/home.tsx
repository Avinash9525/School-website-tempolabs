import React from "react";
import Header from "./Header";
import HeroCarousel from "./HeroCarousel";
import CourseSection from "./CourseSection";
import StatsSection from "./StatsSection";
import TestimonialsSection from "./TestimonialsSection";
import ContactSection from "./ContactSection";

interface HomePageProps {
  headerProps?: React.ComponentProps<typeof Header>;
  heroProps?: React.ComponentProps<typeof HeroCarousel>;
  courseProps?: React.ComponentProps<typeof CourseSection>;
  statsProps?: React.ComponentProps<typeof StatsSection>;
  testimonialsProps?: React.ComponentProps<typeof TestimonialsSection>;
  contactProps?: React.ComponentProps<typeof ContactSection>;
}

const HomePage = ({
  headerProps,
  heroProps,
  courseProps,
  statsProps,
  testimonialsProps,
  contactProps,
}: HomePageProps = {}) => {
  return (
    <div className="min-h-screen bg-background">
      <Header {...headerProps} />
      <main className="pt-20">
        <HeroCarousel {...heroProps} />
        <CourseSection {...courseProps} />
        <StatsSection {...statsProps} />
        <TestimonialsSection {...testimonialsProps} />
        <ContactSection {...contactProps} />
      </main>
    </div>
  );
};

export default HomePage;
