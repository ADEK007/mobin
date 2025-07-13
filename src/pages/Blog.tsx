import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const events = [
  {
    id: 1,
    title: 'Ibn Al Hytham Science Fest',
    description: 'Science Fest organized by Bangladeshi Islamic Scholars.',
    date: 'Sunday, 29 December 2024',
    location: 'Dhaka',
    images: [
      'src/data/img/IMG_20241229_095332 (1).jpg',
      'src/data/img/IMG_20241229_131616 (1).jpg'
    ],
    details:
      'I represented my university in the national science fest, showcasing embedded system projects. It was an opportunity to gain exposure and connect with like-minded innovators.'
  },
  {
    id: 2,
    title: 'NITER Islamic Society',
    description: 'Recognition event hosted by NITER Islamic Society.',
    date: 'Tuesday, 12 November 2024',
    location: 'Dhaka',
    images: [
      'src/data/img/466880280_3937403366508140_3057152795093697454_n (1) (1).jpg'

    ],
    details:
      'The event featured keynote speakers and recognized leadership contributions. I was honored for academic and community service efforts.'
  }

];

const Blog: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen pt-28 pb-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-900 mb-12">
          My <span className="text-purple-600">Blog</span>
        </h1>

        <div className="grid md:grid-cols-2 gap-10">
          {events.map((event) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img src={event.images[0]} alt={event.title} className="w-full h-80 object-cover" />
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h2>
                <p className="text-sm text-gray-500 mb-1">{event.date} | {event.location}</p>
                <p className="text-gray-600 text-sm mb-4">{event.description}</p>
                <div className="flex justify-end">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="px-4 py-2 bg-purple-600 text-white text-sm rounded-md hover:bg-purple-700 transition"
                  >
                    Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-[90vw] h-[100vh] p-4 md:p-6 shadow-2xl relative overflow-y-auto"
            >
              <button
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-xl"
              >
                &times;
              </button>

              <div className={`grid ${selectedEvent.images.length > 1 ? 'grid-cols-1 md:grid-cols-2 gap-4' : ''} mb-6`}>
                {selectedEvent.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img}
                    alt={`${selectedEvent.title} image ${idx + 1}`}
                    className="w-full h-[500px] object-cover rounded-lg"
                  />
                ))}
              </div>

              <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedEvent.title}</h2>
              <p className="text-sm text-gray-500 mb-3">{selectedEvent.date} | {selectedEvent.location}</p>
              <p className="text-gray-700 text-base leading-relaxed">{selectedEvent.details}</p>
            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Blog;

