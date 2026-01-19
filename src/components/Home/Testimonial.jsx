import React from "react";
import { Card } from "../ui/Cards";
import { Star } from "lucide-react";

const Testimonial = () => {
  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Parent of IMO Gold Medalist",
      content:
        "The personalized approach helped my daughter improve from 60% to 95% in just 3 months. The analytics feature is incredible!",
      rating: 5,
      avatar: "👩",
    },
    {
      name: "Rajesh Kumar",
      role: "Parent of 2 Students",
      content:
        "Managing both my kids' preparation from one dashboard is so convenient. The AI recommendations are spot-on.",
      rating: 5,
      avatar: "👨",
    },
    {
      name: "Anita Patel",
      role: "Parent",
      content:
        "Best investment for my son's education. The practice tests mirror the actual Olympiad format perfectly.",
      rating: 5,
      avatar: "👩",
    },
  ];
  return (
    <>
      <section id="testimonials" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-blue-900 font-bold">
              What Parents Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of satisfied parents and successful students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="p-6 border-2 hover:shadow-lg transition-shadow"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="size-5 fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  &quot;{testimonial.content}&quot;
                </p>
                <div className="flex items-center gap-3 pt-4 border-t">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-blue-900 font-bold">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
