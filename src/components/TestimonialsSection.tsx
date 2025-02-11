import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  quote: string;
  avatarUrl?: string;
}

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "IIT Aspirant",
    quote:
      "The teaching methods at DHI Classes helped me secure a top rank in JEE Advanced. The faculty is extremely supportive and knowledgeable.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
  },
  {
    id: 2,
    name: "Rahul Patel",
    role: "NEET Student",
    quote:
      "Thanks to DHI Classes, I was able to understand complex medical concepts clearly. The study material and mock tests were invaluable.",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Rahul",
  },
  {
    id: 3,
    name: "Priya Sharma",
    role: "Engineering Student",
    quote:
      "The personalized attention and doubt-clearing sessions made a huge difference in my preparation. Highly recommend DHI Classes!",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Priya",
  },
];

const TestimonialsSection = ({
  testimonials = defaultTestimonials,
}: TestimonialsSectionProps) => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Student Success Stories
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from our students about their journey and achievements with DHI
            Classes
          </p>
        </div>

        <Carousel className="w-full max-w-5xl mx-auto">
          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem
                key={testimonial.id}
                className="md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-2">
                  <Card className="bg-white">
                    <CardContent className="p-6">
                      <Quote className="w-8 h-8 text-primary mb-4" />
                      <p className="text-gray-700 mb-6 min-h-[100px]">
                        {testimonial.quote}
                      </p>
                      <div className="flex items-center gap-4">
                        <Avatar>
                          <AvatarImage
                            src={testimonial.avatarUrl}
                            alt={testimonial.name}
                          />
                          <AvatarFallback>
                            {testimonial.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-semibold text-gray-900">
                            {testimonial.name}
                          </h4>
                          <p className="text-sm text-gray-500">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-12" />
          <CarouselNext className="-right-12" />
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
