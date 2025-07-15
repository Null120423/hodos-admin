import {
  Download,
  Luggage,
  MapPin,
  MessageCircle,
  Play,
  Sparkles,
} from "lucide-react";

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-sky-50 via-white to-yellow-50 pt-16 pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left animate-fade-in-up">
            <div className="inline-flex items-center bg-sky-100 text-sky-700 px-4 py-2 rounded-full text-sm font-medium mb-6 animate-bounce-gentle">
              <Sparkles className="w-4 h-4 mr-2" />
              New AI-Powered Travel Experience
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight animate-slide-in-left">
              AI Travel Assistant for Foreign Tourists in
              <span className="text-sky-500 animate-gradient-text">
                {" "}
                Ho Chi Minh City
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-slide-in-left animation-delay-200">
              Personalized, Smart, Easy-to-use App for Exploring Vietnam's Most
              Vibrant City
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-in-left animation-delay-400">
              <button className="bg-sky-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sky-600 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-pulse-button">
                <Download className="inline-block w-5 h-5 mr-2" />
                Get the App
              </button>
              <button className="bg-white text-sky-500 px-8 py-4 rounded-lg text-lg font-semibold border-2 border-sky-500 hover:bg-sky-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                <Play className="inline-block w-5 h-5 mr-2" />
                View Demo
              </button>
            </div>
          </div>

          <div className="relative animate-fade-in-right">
            {/* Background Travel Images */}
            <div className="absolute inset-0 grid grid-cols-2 gap-4 opacity-20 animate-float">
              <img
                alt="Vietnam Street Food"
                className="w-full h-32 object-cover rounded-lg"
                src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              <img
                alt="Ho Chi Minh City"
                className="w-full h-32 object-cover rounded-lg mt-8"
                src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              <img
                alt="Vietnamese Temple"
                className="w-full h-32 object-cover rounded-lg -mt-4"
                src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              <img
                alt="Vietnam Market"
                className="w-full h-32 object-cover rounded-lg mt-4"
                src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
            </div>

            {/* Main App Interface */}
            <div className="bg-gradient-to-r from-sky-400 to-sky-600 rounded-3xl p-8 shadow-2xl relative z-10 animate-slide-in-right">
              <div className="bg-white rounded-2xl p-6 mb-6 transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <MessageCircle className="w-8 h-8 text-sky-500 mr-3 animate-bounce" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      AI Assistant
                    </h3>
                    <p className="text-sm text-gray-600">
                      Always ready to help
                    </p>
                  </div>
                </div>
                <div className="bg-sky-50 rounded-lg p-4 animate-typing">
                  <p className="text-gray-700">
                    "Hi! I'm your AI travel guide. Where would you like to
                    explore in Ho Chi Minh City today?"
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transform hover:scale-110 transition-all duration-300 animate-float animation-delay-100">
                  <MapPin className="w-6 h-6 text-white mx-auto mb-2" />
                  <p className="text-white text-sm">Navigation</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transform hover:scale-110 transition-all duration-300 animate-float animation-delay-200">
                  <Luggage className="w-6 h-6 text-white mx-auto mb-2" />
                  <p className="text-white text-sm">Itinerary</p>
                </div>
                <div className="bg-white/20 backdrop-blur-sm rounded-lg p-4 text-center transform hover:scale-110 transition-all duration-300 animate-float animation-delay-300">
                  <MessageCircle className="w-6 h-6 text-white mx-auto mb-2" />
                  <p className="text-white text-sm">Chat</p>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-yellow-400 rounded-full w-16 h-16 flex items-center justify-center shadow-lg animate-bounce-slow">
              <span className="text-2xl">🎯</span>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-yellow-400 rounded-full w-12 h-12 flex items-center justify-center shadow-lg animate-spin-slow">
              <span className="text-xl">✨</span>
            </div>
            <div className="absolute top-1/2 -left-8 bg-pink-400 rounded-full w-8 h-8 flex items-center justify-center shadow-lg animate-pulse">
              <span className="text-sm">🗺️</span>
            </div>
          </div>
        </div>

        {/* Travel Images Carousel */}
        <div className="mt-20 animate-fade-in-up animation-delay-600">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Discover Ho Chi Minh City
            </h3>
            <p className="text-gray-600">
              Experience the vibrant culture and hidden gems
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="relative group overflow-hidden rounded-xl animate-slide-up animation-delay-100">
              <img
                alt="Ho Chi Minh City Skyline"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">City Skyline</p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl animate-slide-up animation-delay-200">
              <img
                alt="Vietnamese Street Food"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Street Food</p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl animate-slide-up animation-delay-300">
              <img
                alt="Vietnamese Temple"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Temples</p>
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl animate-slide-up animation-delay-400">
              <img
                alt="Vietnam Culture"
                className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">Culture</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
