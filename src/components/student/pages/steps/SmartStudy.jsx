import React from "react";
import { Card } from "../ui/Cards";       // <-- Make sure file name matches!
import { Badge } from "../ui/Badge";      // <-- Your simple Badge
import { Progress } from "../ui/progress";
import {
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Lightbulb,
  TrendingUp,
  Target,
} from "lucide-react";

export default function SmartStudy() {
  const weakAreas = [
    {
      id: "1",
      topic: "Geometry - Triangles",
      subject: "Mathematics",
      accuracy: 58,
      testsAttempted: 5,
      improvement: -3,
    },
    {
      id: "2",
      topic: "Chemistry - Acids & Bases",
      subject: "Science",
      accuracy: 65,
      testsAttempted: 4,
      improvement: +5,
    },
    {
      id: "3",
      topic: "Passive Voice",
      subject: "English",
      accuracy: 62,
      testsAttempted: 6,
      improvement: +2,
    },
  ];

  const strongAreas = [
    {
      id: "1",
      topic: "Algebra - Linear Equations",
      subject: "Mathematics",
      accuracy: 95,
      testsAttempted: 8,
    },
    {
      id: "2",
      topic: "Grammar - Tenses",
      subject: "English",
      accuracy: 92,
      testsAttempted: 7,
    },
    {
      id: "3",
      topic: "Biology - Plant Kingdom",
      subject: "Science",
      accuracy: 88,
      testsAttempted: 5,
    },
  ];

  const improvementTips = [
    {
      id: "1",
      topic: "Geometry - Triangles",
      tips: [
        "Practice identifying different types of triangles",
        "Focus on properties of isosceles and equilateral triangles",
        "Review angle sum property and exterior angle theorem",
      ],
    },
    {
      id: "2",
      topic: "Chemistry - Acids & Bases",
      tips: [
        "Memorize common acids and bases with their formulas",
        "Understand pH scale and indicators",
        "Practice balancing neutralization reactions",
      ],
    },
  ];

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
          <Sparkles className="size-6 text-white" />
        </div>
        <div>
          <h2 className="text-blue-900">Smart Study - AI Insights</h2>
          <p className="text-sm text-gray-600">Personalized recommendations based on your performance</p>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid sm:grid-cols-3 gap-4">
        
        <Card className="p-4 bg-gradient-to-br from-red-50 to-orange-50 border-red-100">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="size-5 text-red-600" />
            <span className="text-sm text-gray-700">Needs Attention</span>
          </div>
          <p className="text-2xl text-red-700">{weakAreas.length} Topics</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-100">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="size-5 text-green-600" />
            <span className="text-sm text-gray-700">Strong Areas</span>
          </div>
          <p className="text-2xl text-green-700">{strongAreas.length} Topics</p>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-100">
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="size-5 text-blue-600" />
            <span className="text-sm text-gray-700">Overall Progress</span>
          </div>
          <p className="text-2xl text-blue-700">78%</p>
        </Card>

      </div>

      {/* Weak Areas */}
      <Card className="p-6 border-red-200">
        <div className="flex items-center gap-2 mb-4">
          <AlertTriangle className="size-5 text-red-600" />
          <h3 className="text-blue-900">Areas Needing Attention</h3>

          {/* SIMPLE BADGE */}
          <Badge className="ml-auto bg-red-50 text-red-700 border border-red-200">
            Focus Here
          </Badge>
        </div>

        <div className="space-y-4">
          {weakAreas.map((area) => (
            <div key={area.id} className="p-4 bg-red-50 rounded-lg">
              
              <div className="flex items-start justify-between mb-3">

                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-blue-900">{area.topic}</h4>

                    {/* improvement badge */}
                    {area.improvement > 0 && (
                      <Badge className="text-xs bg-green-100 text-green-700 border border-green-200">
                        +{area.improvement}%
                      </Badge>
                    )}
                    {area.improvement < 0 && (
                      <Badge className="text-xs bg-red-100 text-red-700 border border-red-200">
                        {area.improvement}%
                      </Badge>
                    )}
                  </div>

                  <p className="text-sm text-gray-600">{area.subject}</p>
                  <p className="text-sm text-gray-600">{area.testsAttempted} tests attempted</p>
                </div>

                <div className="text-right">
                  <p className="text-2xl text-red-700">{area.accuracy}%</p>
                  <p className="text-xs text-gray-600">Accuracy</p>
                </div>

              </div>

              <Progress value={area.accuracy} className="h-2" />

            </div>
          ))}
        </div>
      </Card>

      {/* Improvement Tips */}
      <Card className="p-6 border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="size-5 text-blue-600" />
          <h3 className="text-blue-900">Tips for Improvement</h3>
        </div>

        <div className="space-y-4">
          {improvementTips.map((item) => (
            <div key={item.id} className="p-4 bg-white rounded-lg border border-blue-100">

              <h4 className="text-blue-900 mb-3 flex items-center gap-2">
                <Target className="size-4 text-blue-600" />
                {item.topic}
              </h4>

              <ul className="space-y-2">
                {item.tips.map((tip, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="text-blue-600">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}
        </div>
      </Card>

      {/* Strong Areas */}
      <Card className="p-6 border-green-200">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle className="size-5 text-green-600" />
          <h3 className="text-blue-900">Strong Areas - Keep it Up!</h3>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {strongAreas.map((area) => (
            <div key={area.id} className="p-4 bg-green-50 rounded-lg border border-green-100">

              <div className="flex items-center justify-between mb-2">
                <CheckCircle className="size-5 text-green-600" />

                {/* simple badge */}
                <Badge className="bg-green-100 text-green-700 border border-green-200">
                  {area.accuracy}%
                </Badge>
              </div>

              <h4 className="text-blue-900 mb-1">{area.topic}</h4>
              <p className="text-sm text-gray-600">{area.subject}</p>
              <p className="text-xs text-gray-500 mt-2">
                {area.testsAttempted} tests attempted
              </p>

            </div>
          ))}
        </div>
      </Card>

      {/* Recommendation */}
      <Card className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start gap-4">

          <div className="w-12 h-12 bg-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="size-6 text-white" />
          </div>

          <div>
            <h3 className="text-blue-900 mb-2">Today's Recommendation</h3>
            <p className="text-gray-700 mb-3">
              Focus on <strong>Geometry - Triangles</strong> for 30 minutes.
              Improve accuracy from 58% → 70%.
            </p>
            <p className="text-sm text-gray-600">
              Best study time: <strong>9–11 AM</strong>.
            </p>
          </div>

        </div>
      </Card>
    </div>
  );
}
