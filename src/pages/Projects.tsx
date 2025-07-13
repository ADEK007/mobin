import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Github, Filter, X, Calendar, Tag } from 'lucide-react';

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'Smart Vending Machine',
      description: 'An automated tea and coffee vending system powered by ESP32 and IoT.',
      longDescription: 'This project involves building a smart vending machine that dispenses tea and coffee on demand using an ESP32 microcontroller. It features an intuitive user interface built with React, real-time order processing via MQTT protocol, temperature monitoring, water level sensing, OLED display feedback, and Telegram bot integration for remote control. Designed with efficiency and modularity in mind, this system bridges embedded hardware and modern web technology for seamless user experience.',
      image: 'mobin/src/data/img/Modern Creative Webinar Facebook Post.png',
      category: 'IoT',
      tags: ['ESP32', 'MicroPython', 'Payment API', 'MQTT', 'HTTP'],
      date: '2024',
      github: 'https://github.com',
      demo: 'https://CLKBX.com',
      featured: true
    },
    {
      id: 2,
      title: 'Manufacturing worker safety device',
      description: 'Developed a real-time safety monitoring system using sensors, Wi-Fi, and alerts with optimized battery management for manufacturing worker safety',
      longDescription: 'Developed an end-to-end real-time safety monitoring system aimed at enhancing manufacturing worker safety. The system integrates multiple environmental and physiological sensors to track conditions such as gas levels, temperature, motion, and worker activity. Data is continuously transmitted over Wi-Fi to a central monitoring dashboard using lightweight communication protocols, enabling supervisors to detect hazardous situations instantly. The system includes real-time alert mechanisms through buzzers, LEDs, and notifications to mobile devices. A key focus was optimizing battery usage by implementing sleep modes, interrupt-driven data collection, and efficient power regulation, ensuring the system remains operational over extended periods without frequent charging. This solution was designed with scalability and modularity in mind, making it suitable for deployment across large industrial environments.',
      image: 'src/data/img/Modern Creative Webinassr Facebook Post.png',
      category: 'Robotics',
      tags: ['C++', 'Worker Safety', 'Microcontroller', 'Autodesk AutoCAD', 'Internet of Things', 'Robotics', 'KiCad'],
      date: '2025',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: true
    },
    {
      id: 3,
      title: 'DC-DC Converter with Optocoupler',
      description: 'Designed a DC-DC converter with optocoupler-based feedback for efficient, isolated voltage regulation, featuring custom PCB and 3D circuit visualization.',
      longDescription: 'This project showcases the complete design, simulation, and implementation of a highly efficient DC-DC converter integrated with an optocoupler for isolated feedback control. The converter is engineered to regulate voltage precisely while maintaining electrical isolation between the input and output stages, enhancing both safety and reliability—especially in sensitive embedded or industrial applications. The design process included schematic development, simulation of power stage performance, and optimization for switching efficiency. A key feature of the design is the use of an optocoupler in the feedback loop, allowing for galvanic isolation while still enabling precise control of output voltage regulation. The final implementation involved creating a custom PCB layout optimized for heat dissipation and minimal noise interference. Visuals include a detailed 3D rendering of the fabricated PCB and a clear circuit diagram outlining the complete topology of the DC-DC converter with optocoupler integration. This project demonstrates a deep understanding of power electronics, control feedback systems, and PCB design best practices.',
      image: 'src/data/img/awe.png',
      category: 'Robotics',
      tags: ['PCB Design', 'BLE', 'Cloud'],
      date: '2024',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      id: 4,
      title: 'Industrial Sensor Network',
      description: 'Sensor network for industrial monitoring with wirelss and edge computing capabilities.',
      longDescription: 'Built a sensor network for industrial environments featuring count and weight, edge computing for real-time analytics, and integration with existing systems. The solution provides predictive maintenance capabilities and reduces downtime.',
      image: 'src/data/img/Modern Creative Webinar Facebook Post (1).png',
      category: 'Industrial',
      tags: ['Python', 'Edge Computing', 'Microcontroller', 'Internet of Things'],
      date: '2025',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      id: 5,
      title: 'Smart Home IoT System',
      description: 'IoT-based home automation with ESP32 and React.',
      image: 'src/data/img/erawer.png',
      tags: ['ESP32', 'MicroPython', 'MQTT'],
      date: '2023',
      category: 'IoT',
      featured: false,
      github: 'https://github.com',
      demo: 'https://demo.com',
    },
    {
      id: 6,
      title: 'Saving Lives with IoT',
      description: 'A life-saving IoT project using NodeMCU with thermal, gas, and humidity sensors to provide real-time data for smarter earthquake rescue operations.',
      longDescription: '"Saving Lives with IoT" is a project that aims to revolutionize earthquake rescue operations using advanced sensor technology. By deploying Node MCU boards equipped with thermal, gas, and temperature/humidity sensors, rescuers can gain real-time data on conditions within collapsed buildings. This information empowers them to make more informed decisions and potentially save lives.',
      image: 'src/data/img/Screenshot 2024-08-12 104540.png',
      category: 'IoT',
      tags: ['Microcontroller', 'AutoCAD', 'Internet of Things', 'Robotics', 'Python'],
      date: '2021',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    },
    {
      id: 7,
      title: 'Future Enginners',
      description: 'A life-saving IoT project using NodeMCU with thermal, gas, and humidity sensors to provide real-time data for smarter earthquake rescue operations.',
      longDescription: '"Saving Lives with IoT" is a project that aims to revolutionize earthquake rescue operations using advanced sensor technology. By deploying Node MCU boards equipped with thermal, gas, and temperature/humidity sensors, rescuers can gain real-time data on conditions within collapsed buildings. This information empowers them to make more informed decisions and potentially save lives.',
      image: 'src/data/img/Modern Creative Webinar Facebook Post (2).png',
      category: 'IoT',
      tags: ['Microcontroller', 'Raspberry Pi ', 'Fusion 360', 'Internet of Things', 'Robotics', 'C', 'C++', 'Python'],
      date: '2025',
      github: 'https://github.com',
      demo: 'https://demo.com',
      featured: false
    }
  ];





  const categories = ['all', 'IoT', 'Robotics', 'Healthcare', 'Industrial', 'Agriculture', 'Automotive'];

  const filteredProjects = filter === 'all'
    ? projects
    : projects.filter(project => project.category === filter);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-24 pb-16 px-4"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Projects</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A showcase of my recent work in embedded systems, IoT, and innovative technology solutions
            that solve real-world problems.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-6 py-3 rounded-full font-semibold transition-all flex items-center space-x-2 ${filter === category
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'bg-white text-gray-600 hover:text-purple-600 shadow-md hover:shadow-lg'
                }`}
            >
              <Filter className="w-4 h-4" />
              <span>{category.charAt(0).toUpperCase() + category.slice(1)}</span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ y: -10 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
                  />
                  {project.featured && (
                    <div className="absolute top-4 left-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold text-gray-700">
                    {project.category}
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-gray-900">{project.title}</h3>
                    <div className="flex items-center space-x-1 text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{project.date}</span>
                    </div>
                  </div>

                  <p className="text-gray-600 mb-4 line-clamp-3">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm font-medium">
                        +{project.tags.length - 3} more
                      </span>
                    )}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 text-gray-600 hover:text-purple-600 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span className="text-sm font-medium">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="text-sm font-medium">Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-64 object-cover"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-gray-900">{selectedProject.title}</h2>
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full font-semibold">
                      {selectedProject.category}
                    </span>
                  </div>

                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    {selectedProject.longDescription}
                  </p>

                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 flex items-center">
                      <Tag className="w-5 h-5 mr-2" />
                      Technologies Used
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {selectedProject.tags.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-lg font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={selectedProject.github}
                      className="flex items-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                      <span>View Code</span>
                    </a>
                    <a
                      href={selectedProject.demo}
                      className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-shadow"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Projects;