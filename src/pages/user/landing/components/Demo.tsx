import React from 'react';
import { Play, Image, Star, Clock, MapPin, Camera, Navigation, MessageCircle } from 'lucide-react';

const Demo = () => {
  const appScreens = [
    "https://pub-8522858fd58049a6b24d543265789c51.r2.dev/app-img-banner/3.png",
    "https://pub-8522858fd58049a6b24d543265789c51.r2.dev/app-img-banner/Screenshot%202025-07-15%20at%2020.58.34.png",
    "https://pub-8522858fd58049a6b24d543265789c51.r2.dev/app-img-banner/Screenshot%202025-07-15%20at%2020.58.43.png",
    "https://pub-8522858fd58049a6b24d543265789c51.r2.dev/app-img-banner/Screenshot%202025-07-15%20at%2020.58.51.png"
  ];

  const features = [
    { icon: Star, text: "AI-powered recommendations", color: "text-yellow-500" },
    { icon: Clock, text: "Real-time updates", color: "text-green-500" },
    { icon: MapPin, text: "Precise navigation", color: "text-red-500" },
    { icon: Camera, text: "Visual recognition", color: "text-purple-500" }
  ];

  const travelImages = [
    {
      url: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Street Food Tours"
    },
    {
      url: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "City Exploration"
    },
    {
      url: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400",
      title: "Cultural Sites"
    }
  ];

  return (
    <section id="demo" className="py-20 bg-gradient-to-br from-gray-50 to-sky-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            See the App in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Experience the power of AI-guided travel through our intuitive interface designed specifically for Ho Chi Minh City explorers.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-slide-in-left">
            <div className="bg-white rounded-2xl p-8 shadow-xl transform hover:scale-105 transition-transform duration-500">
              <div className="aspect-video bg-gradient-to-br from-sky-500 to-sky-600 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden group">
                <img 
                  src={appScreens[0]} 
                  alt="App Demo" 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors transform hover:scale-110 duration-300 animate-pulse">
                    <Play className="w-12 h-12 text-white" />
                  </button>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Interactive Demo</h3>
              <p className="text-gray-600 mb-6">
                Watch how our AI assistant helps you discover hidden gems, plan your itinerary, and navigate Ho Chi Minh City like a local.
              </p>
              <button className="bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Watch Full Demo
              </button>
            </div>
          </div>

          <div className="space-y-8 animate-slide-in-right">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What You'll Experience
              </h3>
              <div className="grid gap-4">
                {features.map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300 transform hover:scale-105 animate-slide-in-right"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <feature.icon className={`w-6 h-6 ${feature.color} mr-3 animate-bounce-gentle`} />
                    <span className="text-gray-700 font-medium">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {appScreens.slice(1).map((screen, index) => (
                <div 
                  key={index} 
                  className="bg-white rounded-xl p-3 shadow-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105 animate-slide-up group"
                  style={{ animationDelay: `${(index + 1) * 150}ms` }}
                >
                  <img 
                    src={screen} 
                    alt={`App Screenshot ${index + 1}`}
                    className="w-full h-32 object-cover rounded-lg transform group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Travel Experience Gallery */}
        <div className="mt-20 animate-fade-in-up animation-delay-600">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Real Travel Experiences</h3>
            <p className="text-gray-600">See how travelers are exploring Ho Chi Minh City with our AI assistant</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {travelImages.map((image, index) => (
              <div 
                key={index}
                className="relative group overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-slide-up"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <img 
                  src={image.url}
                  alt={image.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent">
                  <div className="absolute bottom-6 left-6 text-white">
                    <h4 className="text-lg font-bold mb-2">{image.title}</h4>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex items-center">
                        <Navigation className="w-4 h-4 mr-1" />
                        <span>AI Guided</span>
                      </div>
                      <div className="flex items-center">
                        <MessageCircle className="w-4 h-4 mr-1" />
                        <span>Live Chat</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Camera className="w-5 h-5 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Interactive Features Preview */}
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-lg animate-fade-in-up animation-delay-800">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">AI-Powered Features</h3>
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-sky-50 rounded-lg animate-slide-in-left">
                  <MessageCircle className="w-6 h-6 text-sky-500 mr-3 animate-bounce-gentle" />
                  <span className="text-gray-700">Real-time chat with AI assistant</span>
                </div>
                <div className="flex items-center p-3 bg-yellow-50 rounded-lg animate-slide-in-left animation-delay-100">
                  <MapPin className="w-6 h-6 text-yellow-500 mr-3 animate-bounce-gentle" />
                  <span className="text-gray-700">Smart location recommendations</span>
                </div>
                <div className="flex items-center p-3 bg-green-50 rounded-lg animate-slide-in-left animation-delay-200">
                  <Camera className="w-6 h-6 text-green-500 mr-3 animate-bounce-gentle" />
                  <span className="text-gray-700">Instant photo recognition</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-gradient-to-br from-sky-100 to-yellow-100 rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
                <img 
                  src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=500"
                  alt="AI Travel Assistant"
                  className="w-full h-48 object-cover rounded-lg shadow-md"
                />
                <div className="absolute -top-2 -right-2 bg-sky-500 text-white rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                  <span className="text-sm font-bold">AI</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;