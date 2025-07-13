import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code, Wrench, Brain, Users } from 'lucide-react';

const Skills: React.FC = () => {
  const [activeTab, setActiveTab] = useState('hard');

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

  const hardSkills = [

    { name: 'C/C++', level: 95, category: 'Programming', color: 'from-blue-600 to-indigo-700' },
    { name: 'MicroPython', level: 90, category: 'Programming', color: 'from-green-500 to-teal-500' },
    { name: 'JavaScript (ES6+)', level: 85, category: 'Frontend & Scripting', color: 'from-yellow-400 to-orange-500' },
    { name: 'Embedded Systems (ESP32/STM32)', level: 94, category: 'Hardware & Firmware', color: 'from-purple-600 to-pink-600' },
    { name: 'PCB Design (KiCad/Eagle)', level: 92, category: 'Hardware Design', color: 'from-indigo-500 to-purple-600' },
    { name: 'RTOS (FreeRTOS)', level: 88, category: 'Systems & Control', color: 'from-red-500 to-pink-500' },
    { name: 'IoT Protocols (MQTT/HTTP)', level: 85, category: 'Networking', color: 'from-cyan-500 to-blue-600' },
    { name: 'Networking (CCNA Basics)', level: 80, category: 'Networking', color: 'from-sky-500 to-blue-700' },
    { name: 'Git & Version Control', level: 92, category: 'Tools & Collaboration', color: 'from-gray-700 to-gray-900' },
    { name: 'Linux & CLI', level: 84, category: 'Tools & Systems', color: 'from-gray-500 to-gray-800' }


  ];

  const softSkills = [
    { name: 'Problem Solving', level: 95, icon: <Brain className="w-6 h-6" />, color: 'from-yellow-500 to-orange-500' },
    { name: 'Team Collaboration', level: 90, icon: <Users className="w-6 h-6" />, color: 'from-blue-500 to-purple-600' },
    { name: 'Communication', level: 88, icon: <Users className="w-6 h-6" />, color: 'from-green-500 to-blue-500' },
    { name: 'Leadership', level: 85, icon: <Users className="w-6 h-6" />, color: 'from-purple-500 to-pink-500' },
    { name: 'Adaptability', level: 92, icon: <Brain className="w-6 h-6" />, color: 'from-indigo-500 to-purple-500' },
    { name: 'Critical Thinking', level: 89, icon: <Brain className="w-6 h-6" />, color: 'from-red-500 to-pink-500' },
  ];

  const ProgressBar = ({ skill, index }: { skill: any; index: number }) => (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          {skill.icon && (
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center text-white`}>
              {skill.icon}
            </div>
          )}
          <div>
            <h3 className="text-lg font-bold text-gray-900">{skill.name}</h3>
            {skill.category && <p className="text-sm text-gray-500">{skill.category}</p>}
          </div>
        </div>
        <span className="text-2xl font-bold text-gray-700">{skill.level}%</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${skill.level}%` }}
          transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${skill.color} rounded-full relative`}
        >
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute right-0 top-0 w-2 h-full bg-white/30 rounded-full"
          />
        </motion.div>
      </div>
    </motion.div>
  );

  const RadialChart = ({ skill, index }: { skill: any; index: number }) => {
    const radius = 45;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (skill.level / 100) * circumference;

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: index * 0.1 }}
        whileHover={{ scale: 1.05 }}
        className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all"
      >
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-gray-200"
            />
            <motion.circle
              cx="50"
              cy="50"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="8"
              fill="transparent"
              strokeLinecap="round"
              strokeDasharray={strokeDasharray}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, delay: index * 0.1, ease: "easeOut" }}
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#8B5CF6" />
                <stop offset="100%" stopColor="#3B82F6" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-gray-700">{skill.level}%</span>
          </div>
        </div>

        <div className={`w-12 h-12 mx-auto mb-3 rounded-lg bg-gradient-to-r ${skill.color} flex items-center justify-center text-white`}>
          {skill.icon}
        </div>
        <h3 className="text-lg font-bold text-gray-900 mb-2">{skill.name}</h3>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-24 pb-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            My <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Skills</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A comprehensive overview of my technical expertise and soft skills
            that I've developed throughout my journey as an embedded engineer.
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="bg-white rounded-xl shadow-lg p-2">
            <button
              onClick={() => setActiveTab('hard')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${activeTab === 'hard'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-purple-600'
                }`}
            >
              <Code className="w-5 h-5" />
              <span>Hard Skills</span>
            </button>
            <button
              onClick={() => setActiveTab('soft')}
              className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 ${activeTab === 'soft'
                ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                : 'text-gray-600 hover:text-purple-600'
                }`}
            >
              <Wrench className="w-5 h-5" />
              <span>Soft Skills</span>
            </button>
          </div>
        </motion.div>

        {/* Skills Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {activeTab === 'hard' ? (
            <div className="grid md:grid-cols-2 gap-6">
              {hardSkills.map((skill, index) => (
                <ProgressBar key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {softSkills.map((skill, index) => (
                <RadialChart key={skill.name} skill={skill} index={index} />
              ))}
            </div>
          )}
        </motion.div>

        {/* Skills Summary */}
        <motion.div
          variants={itemVariants}
          className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Continuous Learning</h2>
          <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
            Technology evolves rapidly, and I'm committed to staying at the forefront.
            I regularly update my skills through online courses, workshops, and hands-on projects
            to ensure I can tackle any challenge that comes my way.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Skills;