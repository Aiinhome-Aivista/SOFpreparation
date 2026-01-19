import { Button } from "./ui/Button";
import { Card } from "./ui/cards";
import { Badge } from "./ui/badge";
import {
  CheckCircle,
  Play,
   Sparkles,
  ArrowRight,
} from "lucide-react";

import { useState, useEffect } from "react";
import { useAuth } from "../common/helper/AuthContext";
import PaymentGateway from "./PaymentGateway";
import AuthSelectionModal from "./AuthSelectionModal";
import Subject from "./Home/Subject";
import Feature from "./Home/Feature";
import HowWorks from "./Home/HowWorks";
import Testimonial from "./Home/Testimonial";
import Footer from "./Home/Footer";
import Stats from "./Home/Stats";

// Removed: interface HomeProps { ... }

export default function Home() {
  const { openLoginModal, openRegisterModal, user } = useAuth();
  const [selectedPlanIndex, setSelectedPlanIndex] = useState(1);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentPlan, setSelectedPaymentPlan] = useState(null);
  const [pendingPaymentPlan, setPendingPaymentPlan] = useState(null);
  const [showAuthSelectionModal, setShowAuthSelectionModal] = useState(false);

  useEffect(() => {
    if (user && pendingPaymentPlan) {
      setSelectedPaymentPlan(pendingPaymentPlan);
      setShowPaymentModal(true);
      setPendingPaymentPlan(null);
    }
  }, [user, pendingPaymentPlan]);

  const pricingPlans = [
    {
      name: "Basic",
      price: "Free",
      description: "Perfect for getting started",
      features: [
        "100 practice questions/month",
        "Basic performance tracking",
        "1 child account",
        "Community support",
      ],
      buttonText: "Start Free",
      popular: false,
    },
    {
      name: "Premium",
      price: "₹999/month",
      description: "Most popular choice",
      features: [
        "Unlimited practice questions",
        "AI-powered recommendations",
        "Up to 3 child accounts",
        "Detailed analytics & reports",
        "Video lessons & tutorials",
        "Priority support",
      ],
      buttonText: "Get Premium",
      popular: true,
    },
    {
      name: "Family",
      price: "₹1,499/month",
      description: "Best value for families",
      features: [
        "Everything in Premium",
        "Unlimited child accounts",
        "Custom test generation",
        "Parent-teacher consultation",
        "Offline access",
        "24/7 dedicated support",
      ],
      buttonText: "Go Family",
      popular: false,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-green-50">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-green-100 text-blue-700 px-4 py-2 rounded-full mb-6 border border-blue-200">
              <Sparkles className="size-4" />
              <span className="text-sm">
                Trusted by 50,000+ Students Nationwide
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl mb-6 text-blue-900 leading-tight font-bold">
              Ace Your Olympiad Exams with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                AI-Powered
              </span>{" "}
              Learning
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
              Comprehensive preparation platform for IMO, NSO, IEO & NCO. Get
              personalized study plans, adaptive practice tests, and detailed
              analytics.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Button
                onClick={openRegisterModal}
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 w-full sm:w-auto"
              >
                Start Free Trial
                <ArrowRight className="ml-2 size-5" />
              </Button>
              <Button
                onClick={openLoginModal}
                size="lg"
                variant="outline"
                className="text-lg px-8 py-6 border-gray-300 w-full sm:w-auto"
              >
                <Play className="mr-2 size-5" />
                Watch Demo
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-600" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-600" />
                <span>Cancel Anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="size-5 text-green-600" />
                <span>Money-back Guarantee</span>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-green-200 rounded-full filter blur-3xl opacity-20 -z-10"></div>
      </section>

      {/* Stats Section */}
      <Stats />

      {/* Subjects Section */}
      <Subject />

      {/* Features Section */}
      <Feature />

      {/* How It Works Section */}
      <HowWorks />

      {/* Testimonials Section */}
      <Testimonial />

      {/* Pricing Section */}
      <section id="pricing" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl mb-4 text-blue-900 font-bold">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the plan that works best for your family
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <Card
                key={index}
                onClick={() => setSelectedPlanIndex(index)}
                className={`p-8 relative cursor-pointer transition-all hover:-translate-y-1 hover:shadow-lg ${selectedPlanIndex === index ? "border-4 border-blue-600 shadow-xl" : "border-2 hover:border-blue-300"}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white px-4 py-1">
                      Most Popular
                    </Badge>
                  </div>
                )}
                <h3 className="text-2xl text-blue-900 mb-2 font-bold">
                  {plan.name}
                </h3>
                <p className="text-gray-600 mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl text-blue-900 font-bold">
                    {plan.price}
                  </span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2">
                      <CheckCircle className="size-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={(e) => {
                    e?.stopPropagation();
                    if (!user) {
                      if (plan.price !== "Free") {
                        setPendingPaymentPlan(plan);
                        setShowAuthSelectionModal(true);
                      } else {
                        openRegisterModal();
                      }
                    } else {
                      if (plan.price === "Free") {
                        openRegisterModal();
                      } else {
                        setSelectedPaymentPlan(plan);
                        setShowPaymentModal(true);
                      }
                    }
                  }}
                  className={`w-full ${selectedPlanIndex === index ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA/ CallToAction Section */}
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

      {/* Footer */}
      <Footer />

      {showPaymentModal && selectedPaymentPlan && (
        <PaymentGateway
          plan={selectedPaymentPlan}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={() => {
            alert("Payment Successful!");
            setShowPaymentModal(false);
          }}
        />
      )}

      {showAuthSelectionModal && (
        <AuthSelectionModal
          onClose={() => {
            setShowAuthSelectionModal(false);
            setPendingPaymentPlan(null);
          }}
          onLogin={() => {
            setShowAuthSelectionModal(false);
            openLoginModal();
          }}
          onRegister={() => {
            setShowAuthSelectionModal(false);
            openRegisterModal();
          }}
        />
      )}
    </div>
  );
}