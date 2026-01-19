import { FileText, Star, Trophy, Users } from 'lucide-react';
import React from 'react'

const Stats = () => {
      const stats = [
    { value: "50,000+", label: "Active Students", icon: Users },
    { value: "2M+", label: "Questions Solved", icon: FileText },
    { value: "95%", label: "Success Rate", icon: Trophy },
    { value: "4.9/5", label: "Parent Rating", icon: Star },
  ];
  return (
    <>
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <stat.icon className="size-8 mx-auto mb-3 opacity-90" />
                <div className="text-3xl md:text-4xl mb-2 font-bold">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-blue-100">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Stats
