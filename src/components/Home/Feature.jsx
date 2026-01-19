import React from "react";
import { Card } from "../ui/Cards";
import { Award, BarChart3, BookOpen, Brain, Clock, Target } from "lucide-react";

const Feature = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Learning",
      description:
        "Smart algorithms analyze performance and create personalized study plans for each student.",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      icon: BookOpen,
      title: "Comprehensive Content Library",
      description:
        "Access thousands of practice questions, video lessons, and study materials for all Olympiad exams.",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      icon: BarChart3,
      title: "Detailed Performance Analytics",
      description:
        "Track progress with interactive dashboards, detailed reports, and improvement insights.",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      icon: Target,
      title: "Adaptive Practice Tests",
      description:
        "Dynamic difficulty adjustment ensures students are always challenged at the right level.",
      color: "bg-orange-50 border-orange-200",
      iconColor: "text-orange-600",
    },
    {
      icon: Clock,
      title: "Flexible Learning Schedule",
      description:
        "Study anytime, anywhere with our mobile-friendly platform and offline access.",
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-600",
    },
    {
      icon: Award,
      title: "Expert-Curated Content",
      description:
        "All materials reviewed and created by experienced Olympiad trainers and educators.",
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600",
    },
  ];
  
  return (
    <>
      <section id="features" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-blue-900 font-bold">
              Why Parents & Students Love Us
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to excel in Olympiad exams, all in one
              platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => (
              <Card
                key={index}
                className={`p-8 ${feature.color} border-2 hover:shadow-lg transition-shadow`}
              >
                <div
                  className={`w-14 h-14 bg-white rounded-xl flex items-center justify-center mb-6 border shadow-sm`}
                >
                  <feature.icon className={`size-7 ${feature.iconColor}`} />
                </div>
                <h4 className="text-blue-900 mb-3 font-bold">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Feature;
