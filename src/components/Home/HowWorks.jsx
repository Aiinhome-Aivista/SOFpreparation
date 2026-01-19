import React from 'react'

const HowWorks = () => {
  return (
    <>
    <section className="py-20 bg-gradient-to-br from-blue-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-blue-900 font-bold">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h4 className="text-blue-900 mb-2 font-bold">
                Sign Up & Create Profile
              </h4>
              <p className="text-gray-600">
                Register as a parent and add your children's accounts with their
                grade levels
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h4 className="text-blue-900 mb-2 font-bold">
                Take Diagnostic Test
              </h4>
              <p className="text-gray-600">
                AI analyzes performance and creates personalized study plans for
                each subject
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h4 className="text-blue-900 mb-2 font-bold">Practice & Excel</h4>
              <p className="text-gray-600">
                Follow adaptive learning paths, track progress, and ace your
                Olympiad exams
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HowWorks
