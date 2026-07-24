import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, MessageCircle, Facebook } from 'lucide-react';
import { useToast } from '../context/ToastContext';
import { supabase } from '../lib/supabaseClient';

const Contact: React.FC = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase.from('contact_messages').insert([
        {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
        },
      ]);

      if (error) {
        console.error(error);
        showToast('Failed to send message. Please try again.', 'error');
      } else {
        showToast('Message sent successfully!', 'success');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      showToast('Error sending message. Please try again later.', 'error');
    }

    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: <Mail className="w-7 h-7" />,
      title: 'Email',
      value: 'mdhhmobin@gmail.com',
      link: 'mailto:mdhhmobin@gmail.com',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: <Phone className="w-7 h-7" />,
      title: 'Phone',
      value: '+8801917974820',
      link: 'tel:+8801917974820',
      color: 'from-green-500 to-blue-500'
    },
    {
      icon: <MapPin className="w-7 h-7" />,
      title: 'Location',
      value: 'Dhaka, Bangladesh',
      link: '#',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      icon: <MessageCircle className="w-7 h-7" />,
      title: 'Telegram',
      value: '@mdhhmobin',
      link: 'https://t.me/mdhhmobin',
      color: 'from-blue-500 to-cyan-500'
    }
  ];

  const socialLinks = [
    {
      icon: <Github className="w-7 h-7" />,
      name: 'GitHub',
      url: 'https://github.com/ADEK007',
      color: 'hover:text-gray-900'
    },
    {
      icon: <Linkedin className="w-7 h-7" />,
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/md-hasibul-hassan-mobin-0047a724b/',
      color: 'hover:text-blue-600'
    },
    {
      icon: <Twitter className="w-7 h-7" />,
      name: 'Twitter',
      url: 'https://x.com/HH_Mobin',
      color: 'hover:text-blue-400'
    },
    {
      icon: <Facebook className="w-7 h-7" />,
      name: 'Facebook',
      url: 'https://www.facebook.com/hasibulhassanmobin',
      color: 'hover:text-blue-500'
    }
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen pt-24 pb-12 px-3 sm:px-4"
    >
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-16">
          <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Get In <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Touch</span>
          </h1>
          <p className="text-base sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            I'm always excited to discuss new opportunities, collaborate on interesting projects,
            or simply chat about technology. Let's connect!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Contact Information */}
          <div className="order-2 lg:order-1">
            {/* Contact Cards */}
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
              {contactInfo.map((info, index) => (
                <motion.a
                  key={index}
                  href={info.link}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 hover:shadow-xl transition-all duration-300 block"
                >
                  <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r ${info.color} flex items-center justify-center text-white mb-3 sm:mb-5`}>
                    {info.icon}
                  </div>
                  <h3 className="text-sm sm:text-xl font-bold text-gray-900 mb-1">{info.title}</h3>
                  <p className="text-xs sm:text-base text-gray-600 break-all">{info.value}</p>
                </motion.a>
              ))}
            </motion.div>

            {/* Social Links */}
            <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-6">
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-5 sm:mb-6">Follow Me</h3>
              <div className="flex flex-wrap gap-4 sm:space-x-6">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className={`w-14 h-14 sm:w-16 sm:h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 transition-colors ${social.color}`}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
              <p className="text-sm sm:text-base text-gray-600 mt-5 sm:mt-6 leading-relaxed">
                Follow me on social media for updates on my latest projects, tech insights,
                and industry thoughts. I love connecting with fellow engineers and tech enthusiasts!
              </p>
            </motion.div>

            {/* Availability */}
            <motion.div variants={itemVariants} className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Current Availability</h3>
              <div className="flex items-center space-x-3 mb-3 sm:mb-4">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="font-semibold text-sm sm:text-base">Available for new opportunities</span>
              </div>
              <p className="text-sm sm:text-base opacity-90 leading-relaxed">
                I'm currently open to discussing exciting embedded systems projects,
                consulting opportunities, and full-time positions. Let's talk about
                how we can work together!
              </p>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div variants={itemVariants} className="bg-white rounded-2xl shadow-lg p-5 sm:p-8 order-1 lg:order-2">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 sm:mb-8">Send Me a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div className="grid grid-cols-1 gap-5 sm:gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                  Subject *
                </label>
                <select
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors"
                >
                  <option value="">Select a subject</option>
                  <option value="job-opportunity">Job Opportunity</option>
                  <option value="project-collaboration">Project Collaboration</option>
                  <option value="consulting">Consulting Inquiry</option>
                  <option value="general">General Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell me about your project, opportunity, or question..."
                ></textarea>
              </div>

              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 sm:py-4 px-6 rounded-lg font-semibold flex items-center justify-center space-x-2 hover:shadow-lg transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>

            <div className="mt-5 sm:mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600">
                <strong>Response Time:</strong> I typically respond to messages within 24 hours.
                For urgent matters, feel free to reach out via phone or Telegram.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Contact;