import React from 'react';
import { MessageSquare, Calendar, Globe, Camera, FileText, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: MessageSquare,
      title: "Communication & Orientation",
      description: "AI-powered multilingual chatbot helps you navigate the city and communicate with locals effortlessly.",
      color: "bg-sky-100 text-sky-600",
      image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: Calendar,
      title: "Smart Itineraries",
      description: "Personalized travel plans based on your interests, budget, and time constraints with AI recommendations.",
      color: "bg-yellow-100 text-yellow-600",
      image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: Globe,
      title: "360° Location Exploration",
      description: "Virtual tours of destinations before you visit, helping you make informed decisions about your journey.",
      color: "bg-green-100 text-green-600",
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: Camera,
      title: "Landmark & Food Recognition",
      description: "Take photos to instantly identify landmarks, dishes, and cultural sites with detailed information.",
      color: "bg-purple-100 text-purple-600",
      image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: FileText,
      title: "Experience Sharing",
      description: "Share your travel stories, photos, and reviews with the community to help other travelers.",
      color: "bg-pink-100 text-pink-600",
      image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: Users,
      title: "Connect with Travelers",
      description: "Find like-minded travelers, join groups, and share experiences to make new friends during your journey.",
      color: "bg-indigo-100 text-indigo-600",
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  return (
    <section id="features" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Every Traveler
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover Ho Chi Minh City with confidence using our comprehensive suite of AI-powered travel tools.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 transform hover:-translate-y-3 animate-slide-up group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Feature Image */}
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={feature.image} 
                  alt={feature.title}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className={`absolute top-4 left-4 w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-6 h-6" />
                </div>
              </div>
              
              {/* Feature Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-sky-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Travel Images Section */}
        <div className="mt-20 animate-fade-in-up animation-delay-800">
          <div className="bg-white rounded-2xl p-8 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Experience Vietnam's Rich Culture</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="relative group overflow-hidden rounded-xl animate-slide-in-left">
                <img 
                  src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Vietnamese Cuisine"
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sky-600/80 to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">Authentic Cuisine</h4>
                    <p className="text-sm opacity-90">Discover local flavors</p>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl animate-slide-in-up animation-delay-200">
                <img 
                  src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Historic Landmarks"
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/80 to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">Historic Sites</h4>
                    <p className="text-sm opacity-90">Explore rich history</p>
                  </div>
                </div>
              </div>
              <div className="relative group overflow-hidden rounded-xl animate-slide-in-right animation-delay-400">
                <img 
                  src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=600" 
                  alt="Local Markets"
                  className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-green-600/80 to-transparent">
                  <div className="absolute bottom-4 left-4 text-white">
                    <h4 className="font-bold text-lg">Vibrant Markets</h4>
                    <p className="text-sm opacity-90">Shop like a local</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;