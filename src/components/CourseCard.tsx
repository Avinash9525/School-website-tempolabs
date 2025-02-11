import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Book, ArrowRight } from "lucide-react";

interface CourseCardProps {
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  onLearnMore?: () => void;
}

const CourseCard = ({
  icon = <Book className="w-12 h-12 text-primary" />,
  title = "Mathematics",
  description = "Master fundamental mathematical concepts with our comprehensive course covering algebra, calculus, and more.",
  onLearnMore = () => console.log("Learn more clicked"),
}: CourseCardProps) => {
  return (
    <Card className="w-[350px] h-[400px] bg-white flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <CardHeader>
        <div className="flex items-center justify-center mb-4">{icon}</div>
        <CardTitle className="text-xl text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-center text-gray-600">
          {description}
        </CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center pb-6">
        <Button onClick={onLearnMore} className="flex items-center gap-2">
          Learn More
          <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CourseCard;
