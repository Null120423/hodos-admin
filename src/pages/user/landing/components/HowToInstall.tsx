import React from 'react';
import { Download, UserPlus, MapPin, Apple, Play } from 'lucide-react';

const HowToInstall = () => {
  const steps = [
    {
      step: "1",
      icon: Download,
      title: "Download",
      description: "Get the app from App Store or Google Play Store",
      color: "bg-sky-500"
    },
    {
      step: "2",
      icon: UserPlus,
      title: "Sign up",
      description: "Create your account and set your travel preferences",
      color: "bg-yellow-500"
    },
    {
      step: "3",
      icon: MapPin,
      title: "Start exploring!",
      description: "Begin your AI-powered journey through Ho Chi Minh City",
      color: "bg-green-500"
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            How to Get Started
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Getting started with your AI travel companion is simple and takes just minutes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg`}>
                <step.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {step.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {step.description}
              </p>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gradient-to-r from-gray-300 to-gray-300 transform translate-x-8">
                  <div className="absolute right-0 w-3 h-3 bg-gray-300 rounded-full transform -translate-y-1"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Download Now
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Apple className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="text-xs">Download on the</div>
                <div className="text-lg font-semibold">App Store</div>
              </div>
            </button>
            <button className="bg-black text-white px-8 py-4 rounded-lg flex items-center justify-center hover:bg-gray-800 transition-colors">
              <Play className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div className="text-xs">Get it on</div>
                <div className="text-lg font-semibold">Google Play</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowToInstall;