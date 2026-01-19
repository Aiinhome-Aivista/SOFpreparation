import { Trophy } from 'lucide-react'
import React from 'react'

const Footer = () => {
  return (
    <>
       <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <Trophy className="size-6 text-white" />
                </div>
                <span className="text-white font-bold">
                  SOF Prep Excellence
                </span>
              </div>
              <p className="text-sm text-gray-400">
                Empowering students to excel in Science Olympiad Foundation
                exams
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white mb-4 font-bold">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a
                    href="#features"
                    className="hover:text-white transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#subjects"
                    className="hover:text-white transition-colors"
                  >
                    Subjects
                  </a>
                </li>
                <li>
                  <a
                    href="#pricing"
                    className="hover:text-white transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-white transition-colors"
                  >
                    Reviews
                  </a>
                </li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="text-white mb-4 font-bold">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy Policy
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-white mb-4 font-bold">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li>Email: support@sofprep.com</li>
                <li>Phone: +91 80162 99421</li>
                <li>Mon-Sat: 9 AM - 6 PM</li>
              </ul>
            </div>
          </div>
          {/* copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-sm opacity-60">
            <p>© 2026 SOF Prep Excellence. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Footer
