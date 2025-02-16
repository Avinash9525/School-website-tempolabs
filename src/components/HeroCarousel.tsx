import React from "react";
import AutoplayPlugin from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface HeroSlide {
  image: string;
  title: string;
  subtitle: string;
  ctaText: string;
}

interface HeroCarouselProps {
  slides?: HeroSlide[];
  onCtaClick?: () => void;
}

const defaultSlides: HeroSlide[] = [
  {
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80",
    title: "Empowering Futures Through Excellence in Education",
    subtitle:
      "Join DHI Classes to unlock your potential with expert guidance and proven success strategies.",
    ctaText: "Start Your Journey",
  },
  {
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
    title: "State-of-the-Art Learning Facilities",
    subtitle:
      "Experience modern classrooms and advanced labs designed for optimal learning.",
    ctaText: "Explore Facilities",
  },
  {
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80",
    title: "Expert Faculty & Personalized Attention",
    subtitle:
      "Learn from experienced educators who are passionate about your success.",
    ctaText: "Meet Our Faculty",
  },
];

const HeroCarousel = ({
  slides = defaultSlides,
  onCtaClick = () => console.log("CTA clicked"),
}: HeroCarouselProps) => {
  return (
    <Carousel
      className="w-full h-[600px] relative"
      plugins={[
        AutoplayPlugin({
          delay: 5000,
          stopOnInteraction: false,
        }),
      ]}
      opts={{
        align: "start",
        loop: true,
      }}
    >
      <CarouselContent>
        {slides.map((slide, index) => (
          <CarouselItem key={index} className="relative">
            {/* Background Image with Overlay */}
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="absolute inset-0 bg-black/50" />
            </div>

            {/* Content */}
            <div className="relative h-[600px] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
              <div className="max-w-3xl">
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
                >
                  {slide.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-xl md:text-2xl text-gray-200 mb-8"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  <Button
                    size="lg"
                    className="text-lg px-8 py-6 bg-primary hover:bg-primary/90"
                    onClick={onCtaClick}
                  >
                    {slide.ctaText}
                  </Button>
                </motion.div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2" />
      <CarouselNext className="absolute right-4 top-1/2" />

      {/* Gradient Overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </Carousel>
  );
};

export default HeroCarousel;
