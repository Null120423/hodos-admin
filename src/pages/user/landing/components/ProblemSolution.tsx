import {
  AlertTriangle,
  Bot,
  Calendar,
  Camera,
  CheckCircle,
  MapPin,
  MessageSquare,
  RefreshCw,
  Share2,
  Users,
} from "lucide-react";

const ProblemSolution = () => {
  const problems = [
    { icon: MessageSquare, text: "Language barriers and communication issues" },
    { icon: MapPin, text: "Difficulty with orientation and navigation" },
    { icon: Calendar, text: "Trouble planning suitable itineraries" },
    { icon: RefreshCw, text: "Lack of updated and reliable information" },
  ];

  const solutions = [
    {
      icon: Bot,
      title: "AI Chatbot",
      description: "Multilingual support for instant communication",
    },
    {
      icon: Calendar,
      title: "Personalized Itineraries",
      description: "Smart travel plans based on your preferences",
    },
    {
      icon: MapPin,
      title: "360° Exploration",
      description: "Virtual location previews before you visit",
    },
    {
      icon: Camera,
      title: "Landmark Recognition",
      description: "Identify places and food through photos",
    },
    {
      icon: Share2,
      title: "Social Sharing",
      description: "Share experiences with the travel community",
    },
    {
      icon: Users,
      title: "Connect with Others",
      description: "Find travel companions with similar interests",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            From Tourist Challenges to AI Solutions
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We understand the pain points foreign tourists face and have created
            intelligent solutions to transform your travel experience.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Problems */}
          <div>
            <div className="bg-red-50 rounded-2xl p-8 h-full">
              <div className="flex items-center mb-6">
                <AlertTriangle className="w-8 h-8 text-red-500 mr-3" />
                <h3 className="text-2xl font-bold text-red-900">
                  Common Tourist Problems
                </h3>
              </div>
              <ul className="space-y-4">
                {problems.map((problem, index) => (
                  <li key={index} className="flex items-start">
                    <problem.icon className="w-6 h-6 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-red-800 font-medium">
                      {problem.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <div className="bg-green-50 rounded-2xl p-8 h-full">
              <div className="flex items-center mb-6">
                <CheckCircle className="w-8 h-8 text-green-500 mr-3" />
                <h3 className="text-2xl font-bold text-green-900">
                  AI-Powered Solutions
                </h3>
              </div>
              <div className="grid gap-4">
                {solutions.map((solution, index) => (
                  <div
                    key={index}
                    className="flex items-start bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <solution.icon className="w-6 h-6 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-900 mb-1">
                        {solution.title}
                      </h4>
                      <p className="text-green-700 text-sm">
                        {solution.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
