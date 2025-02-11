import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";

interface ImageCarouselProps {
  images?: Array<{
    url: string;
    alt: string;
  }>;
}

const defaultImages = [
  {
    url: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80",
    alt: "Students studying together",
  },
  {
    url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80",
    alt: "Modern classroom",
  },
  {
    url: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80",
    alt: "Science lab",
  },
  {
    url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80",
    alt: "Library",
  },
];

const ImageCarousel = ({ images = defaultImages }: ImageCarouselProps) => {
  return (
    <Carousel className="w-full max-w-5xl mx-auto">
      <CarouselContent>
        {images.map((image, index) => (
          <CarouselItem key={index}>
            <Card className="border-0 bg-transparent">
              <CardContent className="p-0">
                <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                  <img
                    src={image.url}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="-left-12" />
      <CarouselNext className="-right-12" />
    </Carousel>
  );
};

export default ImageCarousel;
