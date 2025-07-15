import { Download, Rocket, Star } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-sky-500 to-sky-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-6">
            <Rocket className="w-8 h-8 text-sky-700" />
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Start Your Journey in Ho Chi Minh City with AI!
          </h2>
          <p className="text-xl text-sky-100 max-w-3xl mx-auto mb-8">
            Join thousands of travelers who have discovered the magic of
            Vietnam's most vibrant city with our AI-powered travel companion.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button className="bg-yellow-400 text-sky-900 px-8 py-4 rounded-lg text-lg font-bold hover:bg-yellow-300 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl">
            <Download className="inline-block w-5 h-5 mr-2" />
            Download Now
          </button>
          <button className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-lg text-lg font-semibold border-2 border-white/30 hover:bg-white/30 transform hover:scale-105 transition-all duration-200">
            Learn More
          </button>
        </div>

        <div className="flex items-center justify-center space-x-6 text-sky-100">
          <div className="flex items-center">
            <Star className="w-5 h-5 text-yellow-400 mr-1" />
            <span className="font-semibold">4.8/5 Rating</span>
          </div>
          <div className="w-px h-6 bg-sky-400" />
          <div>
            <span className="font-semibold">10,000+</span> Downloads
          </div>
          <div className="w-px h-6 bg-sky-400" />
          <div>
            <span className="font-semibold">Available</span> on iOS & Android
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
