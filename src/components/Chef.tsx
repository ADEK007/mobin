import React from 'react';
import { Award, Star, ChefHat } from 'lucide-react';

const Chef: React.FC = () => {
  const achievements = [
    { icon: <Award className="w-6 h-6" />, text: "Michelin Star Winner" },
    { icon: <Star className="w-6 h-6" />, text: "James Beard Award" },
    { icon: <ChefHat className="w-6 h-6" />, text: "25+ Years Experience" }
  ];

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <span className="text-amber-400 font-semibold text-lg">Meet Our Chef</span>
            <h2 className="text-4xl md:text-5xl font-bold mt-2 mb-6">
              Chef <span className="text-amber-400">Marcus Beaumont</span>
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-6">
              With over 25 years of culinary excellence, Chef Marcus Beaumont brings 
              world-class expertise to every dish at Savoria.
            </p>
            <p className="text-gray-400 leading-relaxed mb-8">
              Trained in the finest kitchens of Paris and New York, Chef Beaumont combines 
              classical French techniques with modern innovation. His passion for perfection 
              and commitment to using only the finest ingredients has earned him recognition 
              from culinary institutions worldwide.
            </p>

            {/* Achievements */}
            <div className="space-y-4 mb-8">
              {achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 text-amber-400">
                  {achievement.icon}
                  <span className="font-semibold">{achievement.text}</span>
                </div>
              ))}
            </div>

            <blockquote className="border-l-4 border-amber-400 pl-6 italic text-gray-300 mb-8">
              "Cooking is not just about feeding the body, but nourishing the soul. 
              Every dish tells a story, and I'm honored to share mine with you."
            </blockquote>

            <button className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg">
              Meet the Team
            </button>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="relative z-10">
              <img
                src="https://images.pexels.com/photos/887827/pexels-photo-887827.jpeg?auto=compress&cs=tinysrgb&w=600&h=800&fit=crop"
                alt="Chef Marcus Beaumont"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
            
            {/* Decorative Elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-amber-600 rounded-full opacity-20"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-amber-400 rounded-full opacity-10"></div>
            
            {/* Stats Card */}
            <div className="absolute bottom-8 left-8 bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-3xl font-bold text-amber-400 mb-2">15+</div>
              <div className="text-sm text-gray-300">Awards Won</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Chef;