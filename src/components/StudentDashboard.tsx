import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Progress } from "./ui/progress";

interface Course {
  id: string;
  name: string;
  progress: number;
  nextClass: string;
  teacher: string;
}

interface StudentDashboardProps {
  student?: {
    name: string;
    class: string;
    avatarUrl?: string;
    enrolledCourses: Course[];
  };
}

const defaultStudent = {
  name: "John Doe",
  class: "Class 10",
  avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  enrolledCourses: [
    {
      id: "1",
      name: "Mathematics",
      progress: 75,
      nextClass: "Tomorrow at 10:00 AM",
      teacher: "Mr. Smith",
    },
    {
      id: "2",
      name: "Physics",
      progress: 60,
      nextClass: "Today at 2:00 PM",
      teacher: "Mrs. Johnson",
    },
    {
      id: "3",
      name: "Chemistry",
      progress: 85,
      nextClass: "Wednesday at 11:00 AM",
      teacher: "Dr. Williams",
    },
  ],
};

const StudentDashboard = ({
  student = defaultStudent,
}: StudentDashboardProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20 p-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Student Profile Card */}
        <Card>
          <CardContent className="p-6 flex items-center space-x-6">
            <Avatar className="w-24 h-24">
              <AvatarImage src={student.avatarUrl} alt={student.name} />
              <AvatarFallback>
                {student.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold">{student.name}</h2>
              <p className="text-gray-600">{student.class}</p>
            </div>
          </CardContent>
        </Card>

        {/* Enrolled Courses */}
        <Card>
          <CardHeader>
            <CardTitle>Enrolled Courses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {student.enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="border rounded-lg p-4 space-y-4"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-lg">{course.name}</h3>
                      <p className="text-sm text-gray-600">
                        Teacher: {course.teacher}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">Next Class:</p>
                      <p className="text-sm text-gray-600">
                        {course.nextClass}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
