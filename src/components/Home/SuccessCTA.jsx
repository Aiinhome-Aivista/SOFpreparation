import React from 'react'
import { Button } from '../ui/Button'
import { ArrowRight } from 'lucide-react'

const SuccessCTA = () => {
  return (
    <>
       <section className="py-20 bg-gradient-to-r from-blue-600 to-green-600 text-white shadow-inner">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl mb-6 font-bold">
            Ready to Start Your Success Journey?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-blue-100">
            Join 50,000+ students who are already excelling in their Olympiad
            preparation
          </p>
          <Button
            onClick={openRegisterModal}
            size="lg"
            className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-10 py-6"
          >
            Get Started Free
            <ArrowRight className="ml-2 size-5" />
          </Button>
        </div>
      </section>
    </>
  )
}

export default SuccessCTA
