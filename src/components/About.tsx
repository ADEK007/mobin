import React from 'react';
import { Clock, Users, Utensils, Heart } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: <Utensils className="w-8 h-8 text-amber-600" />,
      title: "Gourmet Cuisine",
      description: "Expertly crafted dishes using premium ingredients sourced from local farms and international markets."
    },
    {
      icon: <Users className="w-8 h-8 text-amber-600" />,
      title: "Expert Service",
      description: "Our professional staff provides impeccable service to ensure your dining experience is unforgettable."
    },
    {
      icon: <Clock className="w-8 h-8 text-amber-600" />,
      title: "Fine Dining",
      description: "An elegant atmosphere perfect for romantic dinners, business meetings, and special celebrations."
    },
    {
      icon: <Heart className="w-8 h-8 text-amber-600" />,
      title: "Passion for Food",
      description: "Every dish is prepared with love and attention to detail, reflecting our passion for culinary excellence."
    }
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <div className="mb-8">
              <span className="text-amber-600 font-semibold text-lg">About Savoria</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
                Where Culinary Art Meets <span className="text-amber-600">Excellence</span>
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed mb-6">
                For over two decades, Savoria has been at the forefront of fine dining, 
                creating extraordinary culinary experiences that celebrate the art of gastronomy.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our commitment to excellence extends beyond the kitchen to every aspect of your dining experience. 
                From our carefully curated wine selection to our elegant ambiance, every detail is designed 
                to create memories that last a lifetime.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-amber-600 mb-2">25+</div>
                <div className="text-gray-600">Years of Excellence</div>
              </div>
              <div className="text-center p-6 bg-white rounded-xl shadow-lg">
                <div className="text-3xl font-bold text-amber-600 mb-2">15</div>
                <div className="text-gray-600">Master Chefs</div>
              </div>
            </div>

            <button className="bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-amber-700 transition-colors shadow-lg">
              Learn More About Us
            </button>
          </div>

          {/* Right Images */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-6">
              <img
                src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
                alt="Chef preparing food"
                className="w-full h-64 object-cover rounded-2xl shadow-xl"
              />
              <img
                src="https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop"
                alt="Elegant dining setup"
                className="w-full h-48 object-cover rounded-2xl shadow-xl"
              />
            </div>
            <div className="mt-12">
              <img
                src="https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&fit=crop"
                alt="Restaurant interior"
                className="w-full h-80 object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20">
          {features.map((feature, index) => (
            <div key={index} className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="flex justify-center mb-6">
                {feature.icon}
              </div>
              <h4 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h4>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;