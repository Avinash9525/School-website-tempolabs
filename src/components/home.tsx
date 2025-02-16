import React, { lazy, Suspense } from "react";
import Header from "./Header";

// Lazy load components
const HeroCarousel = lazy(() => import("./HeroCarousel"));
const CourseSection = lazy(() => import("./CourseSection"));
const StatsSection = lazy(() => import("./StatsSection"));
const TestimonialsSection = lazy(() => import("./TestimonialsSection"));
const ContactSection = lazy(() => import("./ContactSection"));

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
        <Suspense
          fallback={
            <div className="min-h-[600px] flex items-center justify-center">
              Loading...
            </div>
          }
        >
          <HeroCarousel {...heroProps} />
          <CourseSection {...courseProps} />
          <StatsSection {...statsProps} />
          <TestimonialsSection {...testimonialsProps} />
          <ContactSection {...contactProps} />
        </Suspense>
      </main>
    </div>
  );
};

export default HomePage;
