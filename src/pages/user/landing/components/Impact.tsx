import React from 'react';
import { Heart, Users, Smartphone, Globe } from 'lucide-react';

const Impact = () => {
  const impacts = [
    {
      icon: Heart,
      title: "Promote Vietnam's culture",
      description: "Showcase the rich heritage and vibrant culture of Ho Chi Minh City to international visitors",
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: Users,
      title: "Empower solo travelers",
      description: "Give confidence to independent travelers exploring the city on their own",
      image: "https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: Smartphone,
      title: "Build friendly tech experiences",
      description: "Create intuitive and accessible technology that enhances rather than complicates travel",
      image: "https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400"
    },
    {
      icon: Globe,
      title: "Connect people through AI",
      description: "Foster meaningful connections between travelers and locals through intelligent technology",
      image: "https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400"
    }
  ];

  const travelStats = [
    { number: "50K+", label: "Happy Travelers", icon: "👥" },
    { number: "200+", label: "Locations Covered", icon: "📍" },
    { number: "15+", label: "Languages Supported", icon: "🌐" },
    { number: "4.9", label: "App Rating", icon: "⭐" }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-sky-900 via-sky-800 to-sky-900 text-white overflow-hidden relative">
      {/* Background Images */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 rounded-full overflow-hidden animate-float">
          <img src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute top-1/2 right-20 w-24 h-24 rounded-full overflow-hidden animate-float animation-delay-300">
          <img src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=200" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute bottom-20 left-1/4 w-28 h-28 rounded-full overflow-hidden animate-float animation-delay-600">
          <img src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=200" alt="" className="w-full h-full object-cover" />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Enhancing Tourism & Cultural Connection through Technology
          </h2>
          <p className="text-xl text-sky-100 max-w-3xl mx-auto">
            Our mission goes beyond just helping tourists navigate the city. We're building bridges between cultures and creating memorable experiences that last a lifetime.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {travelStats.map((stat, index) => (
            <div 
              key={index}
              className="text-center bg-white/10 backdrop-blur-sm rounded-2xl p-6 transform hover:scale-105 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-3xl mb-2 animate-bounce-gentle">{stat.icon}</div>
              <div className="text-2xl font-bold text-yellow-400 mb-1">{stat.number}</div>
              <div className="text-sky-100 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {impacts.map((impact, index) => (
            <div 
              key={index} 
              className="text-center group animate-slide-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-4 group-hover:bg-white/20 transition-all duration-300 transform group-hover:scale-105 relative overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 opacity-20">
                  <img 
                    src={impact.image} 
                    alt={impact.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="relative z-10">
                  <impact.icon className="w-12 h-12 mx-auto mb-4 text-yellow-400 animate-bounce-gentle" />
                  <h3 className="text-lg font-bold mb-3">
                    {impact.title}
                  </h3>
                  <p className="text-sky-100 text-sm leading-relaxed">
                    {impact.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Cultural Showcase */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
          <h3 className="text-2xl font-bold mb-6 text-center">Smart travel, meaningful connection – powered by AI</h3>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="relative group overflow-hidden rounded-xl">
              <img 
                src="https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Vietnamese Culture"
                className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-600/80 to-transparent">
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                  Local Cuisine
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl">
              <img 
                src="https://images.pexels.com/photos/2901209/pexels-photo-2901209.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="City Life"
                className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-600/80 to-transparent">
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                  Urban Adventures
                </div>
              </div>
            </div>
            <div className="relative group overflow-hidden rounded-xl">
              <img 
                src="https://images.pexels.com/photos/1320684/pexels-photo-1320684.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Cultural Heritage"
                className="w-full h-32 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sky-600/80 to-transparent">
                <div className="absolute bottom-2 left-2 text-white text-sm font-semibold">
                  Heritage Sites
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sky-100 text-lg text-center">
            Join thousands of travelers who have discovered the magic of Ho Chi Minh City with our AI-powered assistant. 
            Experience Vietnam like never before with personalized guidance that adapts to your unique travel style.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Impact;