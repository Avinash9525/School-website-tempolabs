import React from "react";
import CourseCard from "./CourseCard";
import {
  Book,
  Code,
  TestTube,
  Calculator,
  Brain,
  Microscope,
} from "lucide-react";

interface CourseSectionProps {
  courses?: {
    icon: React.ReactNode;
    title: string;
    description: string;
  }[];
}

const CourseSection = ({ courses }: CourseSectionProps) => {
  const defaultCourses = [
    {
      icon: <Book className="w-12 h-12 text-primary" />,
      title: "Mathematics",
      description:
        "Master fundamental mathematical concepts with our comprehensive course covering algebra, calculus, and more.",
    },
    {
      icon: <Code className="w-12 h-12 text-primary" />,
      title: "Computer Science",
      description:
        "Learn programming fundamentals, data structures, and algorithms with hands-on coding projects.",
    },
    {
      icon: <TestTube className="w-12 h-12 text-primary" />,
      title: "Chemistry",
      description:
        "Explore chemical reactions, molecular structures, and practical laboratory experiments.",
    },
    {
      icon: <Calculator className="w-12 h-12 text-primary" />,
      title: "Physics",
      description:
        "Understand the fundamental laws of nature through theoretical concepts and practical applications.",
    },
    {
      icon: <Brain className="w-12 h-12 text-primary" />,
      title: "Biology",
      description:
        "Discover the wonders of life sciences from cellular biology to complex ecosystems.",
    },
    {
      icon: <Microscope className="w-12 h-12 text-primary" />,
      title: "Science Lab",
      description:
        "Get hands-on experience with advanced laboratory equipment and experimental procedures.",
    },
  ];

  const displayCourses = courses || defaultCourses;

  return (
    <section className="w-full min-h-[800px] bg-gray-50 py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Courses</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our comprehensive range of courses designed to help you
            excel in your academic journey
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {displayCourses.map((course, index) => (
            <CourseCard
              key={index}
              icon={course.icon}
              title={course.title}
              description={course.description}
              onLearnMore={() =>
                console.log(`Learn more about ${course.title}`)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CourseSection;
