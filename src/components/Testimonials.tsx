import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Isabella Rodriguez",
      role: "Food Critic",
      rating: 5,
      text: "Savoria delivers an unparalleled dining experience. Every dish is a masterpiece, and the service is impeccable. This is fine dining at its absolute best.",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "James Wellington",
      role: "Michelin Guide Inspector",
      rating: 5,
      text: "Chef Beaumont's culinary artistry is extraordinary. The attention to detail, flavor combinations, and presentation exceed all expectations. Truly deserving of its accolades.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    },
    {
      name: "Sophie Chen",
      role: "Culinary Enthusiast",
      rating: 5,
      text: "An unforgettable evening at Savoria. From the moment we walked in, we were treated like royalty. The tasting menu was a journey through culinary perfection.",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="text-amber-600 font-semibold text-lg">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2 mb-6">
            What Our <span className="text-amber-600">Guests</span> Say
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Don't just take our word for it. Here's what culinary experts and discerning diners 
            have to say about their Savoria experience.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:shadow-xl transition-shadow relative">
              <div className="flex items-center mb-6">
                <Quote className="w-8 h-8 text-amber-600 mr-3" />
                <div className="flex">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
              
              <p className="text-gray-700 mb-8 leading-relaxed italic text-lg">
                "{testimonial.text}"
              </p>
              
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-amber-600 text-sm font-semibold">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Awards Section */}
        <div className="mt-20 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-8">Recognized Excellence</h3>
          <div className="flex justify-center items-center space-x-12 opacity-60">
            <div className="text-center">
              <div className="text-4xl mb-2">⭐</div>
              <div className="text-sm font-semibold">Michelin Star</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🏆</div>
              <div className="text-sm font-semibold">James Beard Award</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">🥇</div>
              <div className="text-sm font-semibold">Best Restaurant 2024</div>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-2">👨‍🍳</div>
              <div className="text-sm font-semibold">Chef of the Year</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;