import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';

// Your projects data import
import { projects } from '../data/projects';

// Your projects image import
import myImage from '../data/img/IMG_20240513_123827_902-01.jpeg.jpg';




// Animation Variants for main container and items
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 50, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const floatingAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);

// About section data & softSkills timeline
const timeline = [
  {
    year: '2021',
    title: 'Started Electrical and Electronics Engineering',
    description: 'Began my journey at Dhaka University (Affiliated College), focusing on embedded systems and hardware design.',
    icon: <svg className="w-6 h-6" />, // Ideally import GraduationCap icon instead (Lucide icon)
    type: 'education',
  },
  {
    year: '2022',
    title: 'Executive Director of Robotics-Self Employed',
    description: 'Joined NITER Computer Club - NCC as a Robotics segment Head, working on Automation, IoT device prototypes.',
    icon: <svg className="w-6 h-6" />, // Briefcase icon placeholder
    type: 'career',
  },
  {
    year: '2023',
    title: 'Lead Student Project',
    description: 'Led a team of 5 students in developing a line follow robot using Arduino mega and Won nationally in Technoxian Bangladesh.',
    icon: <svg className="w-6 h-6" />, // Users icon placeholder
    type: 'achievement',
  },
  {
    year: '2024',
    title: 'Junior Researcher (Intern)',
    description: "Served as a Junior Researcher at Research Expert, contributing to research and development initiatives",
    icon: <svg className="w-6 h-6" />, // GraduationCap icon placeholder
    type: 'career',
  },
  {
    year: '2025',
    title: 'Junior Embedded Engineer',
    description: 'Embedded System Intern at Drishti, working on ESP32-based IoT solutions, firmware development, sensor integration, and PCB design.',
    icon: <svg className="w-6 h-6" />, // Briefcase icon placeholder
    type: 'career',
  },
  {
    year: '2025',
    title: 'Present',
    description: 'Founder of CLKBX, a startup focused on automating tea and coffee vending machines and IoT solutions.',
    icon: <svg className="w-6 h-6" />, // Target icon placeholder
    type: 'current',
  },
];

const softSkills = [
  {
    skill: 'Problem Solving',
    description: 'Breaking down complex technical challenges into manageable solutions',
    icon: <svg className="w-8 h-8" />, // Lightbulb icon placeholder
    color: 'from-yellow-400 to-orange-500',
  },
  {
    skill: 'Team Leadership',
    description: 'Leading cross-functional teams and mentoring junior developers',
    icon: <svg className="w-8 h-8" />, // Users icon placeholder
    color: 'from-blue-400 to-purple-500',
  },
  {
    skill: 'Communication',
    description: 'Translating technical concepts for diverse stakeholders',
    icon: <svg className="w-8 h-8" />, // MessageCircle icon placeholder
    color: 'from-green-400 to-blue-500',
  },
  {
    skill: 'Adaptability',
    description: 'Quickly learning new technologies and adapting to changing requirements',
    icon: <svg className="w-8 h-8" />, // Target icon placeholder
    color: 'from-purple-400 to-pink-500',
  },
];

// For actual icons, import these from lucide-react like you did for Home:
// import { GraduationCap, Briefcase, Users, Target, Lightbulb, MessageCircle } from 'lucide-react';

const Home: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-20 px-4"
    >
      <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT: Intro Text */}
        <div className="text-center lg:text-left">
          <motion.div variants={itemVariants} className="mb-10">
            <span className="inline-block px-4 py-4 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 rounded-full text-sm font-medium mb-10">
              Welcome to my portfolio
            </span>
            <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-10">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Hasibul Hassan Mobin
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-10">Embedded Engineer | Problem Solver</p>
            <p className="text-lg text-gray-500 leading-relaxed max-w-2xl">
              Passionate about creating innovative embedded systems solutions that bridge the gap
              between hardware and software. I turn complex problems into elegant, efficient
              solutions.
            </p>
          </motion.div>

          {/* Buttons */}
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-8">
            <Link to="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transition-shadow"
              >
                <span>Explore My Work</span>
                <ArrowRight className="w-5 h-5" />
              </motion.button>
            </Link>
            <Link to="/resume">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full sm:w-auto border-2 border-purple-600 text-purple-600 px-8 py-4 rounded-xl font-semibold flex items-center justify-center space-x-2 hover:bg-purple-50 transition-colors"
              >
                <Download className="w-5 h-5" />
                <span>Download Resume</span>
              </motion.button>
            </Link>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={itemVariants} className="flex justify-center lg:justify-start space-x-6">
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://github.com/ADEK007"
              className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-purple-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="w-6 h-6" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.1, y: -2 }}
              href="https://www.linkedin.com/in/md-hasibul-hassan-mobin-0047a724b/"
              className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-blue-600 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Linkedin className="w-6 h-6" />
            </motion.a>
            <Link to="/contact">
              <motion.div
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-gray-700 hover:text-green-600 transition-colors cursor-pointer"
              >
                <Mail className="w-6 h-6" />
              </motion.div>
            </Link>
          </motion.div>
        </div>

        {/* RIGHT: Animated Graphic */}
        <motion.div variants={itemVariants} className="relative">
          <div className="relative w-full max-w-lg mx-auto">
            <motion.div
              animate={floatingAnimation}
              className="w-80 h-80 mx-auto bg-gradient-to-br from-purple-400 via-blue-500 to-purple-600 rounded-full relative overflow-hidden shadow-2xl"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-4 border-2 border-white/30 rounded-full"
              />
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-8 border border-white/20 rounded-full"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white text-6xl font-mono opacity-80">{'{ }'}</div>
              </div>
            </motion.div>

            {/* Floating Icons */}
            {[
              { icon: '⚡', className: '-top-4 -left-4', duration: 4 },
              { icon: '🔧', className: '-top-4 -right-4', duration: 3 },
              { icon: '💡', className: '-bottom-4 -left-4', duration: 5 },
              { icon: '🚀', className: '-bottom-4 -right-4', duration: 3.5 },
            ].map((item, i) => (
              <motion.div
                key={i}
                animate={{ y: [5, -5, 5], rotate: [0, 5, 0] }}
                transition={{ duration: item.duration, repeat: Infinity }}
                className={`absolute ${item.className} w-16 h-16 bg-white rounded-xl shadow-lg flex items-center justify-center`}
              >
                <span className="text-2xl">{item.icon}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured Projects Section */}
      <motion.div variants={itemVariants} className="mt-28 w-full max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
          Featured <span className="text-purple-600">Projects</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-8 gap-y-8">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow p-5"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-3 text-sm">{project.description}</p>
              <div className="flex flex-wrap gap-2 text-sm">
                {project.tags.slice(0, 3).map((tag, i) => (
                  <span key={i} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/projects">
            <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full font-medium hover:shadow-lg transition">
              See All Projects
            </button>
          </Link>
        </div>
      </motion.div>

      {/* --- About Section --- */}
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="min-h-screen pt-24 pb-16 px-4 mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Me</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              I'm a passionate embedded engineer with a love for creating innovative solutions that make a real-world impact. Here's my journey so far.
            </p>
          </motion.div>

          {/* Bio Section */}
          <motion.div variants={itemVariants} className="grid lg:grid-cols-2 gap-12 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">My Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  My fascination with technology began in childhood when I took apart my first electronic toy to understand how it worked. This curiosity led me to pursue Electrical and Electronics Engineering, where I discovered my passion not only for embedded systems but also for networking and hardware design.
                </p>
                <p>
                  Throughout my academic and professional journey, I've been driven by the challenge of creating efficient, reliable solutions that bridge the gap between hardware and software. I believe that the best embedded systems are invisible to users – they just work seamlessly.
                </p>
                <p>
                  When I'm not coding or designing circuits, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring engineers. I'm always excited to tackle new challenges and learn from every project.
                </p>
              </div>
            </div>

            <div className="relative">
              <motion.div whileHover={{ scale: 1.05 }} className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img
                  src={myImage}
                  alt="Hasibul Hassan Mobin"
                  className="w-full h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>

              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-white rounded-xl shadow-lg p-6"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600 mb-1">30+</div>
                  <div className="text-sm text-gray-600">Projects Completed</div>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Timeline */}
          <motion.div variants={itemVariants} className="mb-20">
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">My Journey</h2>
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></div>

              <div className="space-y-12">
                {timeline.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8'}`}>
                      <motion.div whileHover={{ scale: 1.05 }} className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-600">
                        <div className="flex items-center space-x-3 mb-3">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.type === 'education'
                              ? 'from-green-400 to-blue-500'
                              : item.type === 'career'
                                ? 'from-purple-400 to-pink-500'
                                : item.type === 'achievement'
                                  ? 'from-yellow-400 to-orange-500'
                                  : 'from-blue-400 to-purple-500'
                              } flex items-center justify-center text-white`}
                          >
                            {item.icon}
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-purple-600">{item.year}</div>
                            <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                          </div>
                        </div>
                        <p className="text-gray-600">{item.description}</p>
                      </motion.div>
                    </div>

                    {/* Timeline Node */}
                    <div className="relative z-10">
                      <div className="w-4 h-4 bg-white border-4 border-purple-600 rounded-full"></div>
                    </div>

                    <div className="w-1/2"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Soft Skills */}
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Soft Skills</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {softSkills.map((skill, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10, scale: 1.05 }}
                  className="bg-white rounded-xl shadow-lg p-6 text-center hover:shadow-xl transition-all duration-300"
                >
                  <div
                    className={`w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center text-white`}
                  >
                    {skill.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{skill.skill}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{skill.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Home;