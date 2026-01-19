import React from "react";
import { Card } from "../ui/Cards";
import { Badge } from "../ui/Badge";

const Subject = () => {
  const subjects = [
    {
      name: "IMO",
      fullName: "International Mathematics Olympiad",
      icon: "🔢",
      color: "bg-blue-100 text-blue-700",
    },
    {
      name: "NSO",
      fullName: "National Science Olympiad",
      icon: "🔬",
      color: "bg-green-100 text-green-700",
    },
    {
      name: "IEO",
      fullName: "International English Olympiad",
      icon: "📚",
      color: "bg-purple-100 text-purple-700",
    },
    {
      name: "NCO",
      fullName: "National Cyber Olympiad",
      icon: "💻",
      color: "bg-orange-100 text-orange-700",
    },
  ];
  return (
    <>
      <section id="subjects" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl mb-4 text-blue-900 font-bold">
              Olympiad Exams We Cover
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Comprehensive preparation materials for all major Science Olympiad
              Foundation exams
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {subjects.map((subject, index) => (
              <Card
                key={index}
                className="p-6 text-center hover:shadow-lg transition-shadow cursor-pointer border-2 hover:border-blue-300"
              >
                <div className="text-5xl mb-4">{subject.icon}</div>
                <Badge className={`${subject.color} mb-3`}>
                  {subject.name}
                </Badge>
                <p className="text-sm text-gray-600 font-medium">
                  {subject.fullName}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Subject;
