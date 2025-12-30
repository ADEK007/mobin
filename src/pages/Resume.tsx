import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Download,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Code,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

const Resume: React.FC = () => {
  const [cv, setCV] = useState<any>(null);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const fetchCV = async () => {
      try {
        const { data, error } = await supabase
          .from("cvs")
          .select("*")
          .eq("is_active", true)
          .limit(1)
          .maybeSingle();

        if (error) {
          console.error("Error fetching CV:", error);
        } else {
          setCV(data);
        }
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCV();
  }, []);

  const getPublicCVUrl = (path: string) => {
    return supabase.storage.from("cv-files").getPublicUrl(path).data.publicUrl;
  };

  const experience = [
    {
      title: "Junior Embedded Engineer",
      company: "Drishti",
      location: "Banani, Dhaka",
      period: "2025 - Present",
      description:
        "Designed, developed, and tested embedded systems using ESP32 microcontroller. Wrote and optimized firmware in C, worked on Telegram bot integration for remote control and user interaction in automation projects. Assisted in PCB design, conducted testing, calibration, and documentation for client-ready solutions.",
      achievements: [
        "Developed practical understanding of system debugging",
        "Hardware-software integration",
        "Troubleshooting the system",
      ],
    },
    {
      title: "Junior researcher",
      company: "Research Expert ",
      location: "Dhaka",
      period: "15 August 2024 – 15 September 2024 ",
      description: "Contributing to research and development initiatives.",
      achievements: [
        "Assisted in turning research ideas into practical developments.",
      ],
    },
  ];

  const education = [
    {
      degree: "Bachelor of Science in Electrical and Electronics Engineering",
      school: "Dhaka University (Affiliated College)",
      location: "Dhaka, Bangladesh",
      period: "2021 - 2026",
      gpa: "3.2/4.0",
      relevant: [
        "Embedded Systems Design",
        "Digital Signal Processing",
        "Integrate Circuit Architecture",
        "Real-Time Systems",
      ],
    },
  ];

  const certifications = [
    "Introduction to Networks – Certified by Cisco, 2023",
    "Switching, Routing, and Wireless Essentials – Certified by Cisco, 2023",
    "Programming Essentials in Python – Certified by Cisco, 2022",
    "JavaScript Fundamentals – Stack School, 2020",
  ];

  const skills = {
    "Programming Languages": [
      "C/C++",
      "MicroPython",
      "Python",
      "JavaScript",
      "HTML/CSS",
    ],
    "Embedded Systems": ["ESP32", "Arduino", "Raspberry Pi", "PLC"],
    "Protocols & Networking": [
      "CCNA (Networking Basics)",
      "I2C",
      "SPI",
      "UART",
      "MQTT",
      "HTTP",
      "WiFi",
      "Bluetooth",
    ],
    "Tools & IDEs": [
      "Git",
      "PlatformIO",
      "VS Code",
      "Firebase",
      "Cisco Packet Tracer",
    ],
    "Simulation & PCB Design": [
      "Proteus",
      "Multisim",
      "KiCad",
      "PSpice",
      "EasyEDA",
    ],
    "Office & Documentation": ["Microsoft Excel", "Word", "PowerPoint"],
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading resume...</p>
        </div>
      </div>
    );
  }

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
            My{" "}
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Resume
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            A comprehensive overview of my professional experience, education,
            and achievements in embedded systems engineering.
          </p>

          {cv && cv.file_path ? (
            <motion.a
              href={getPublicCVUrl(cv.file_path)}
              download
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-semibold flex items-center space-x-2 mx-auto shadow-lg hover:shadow-xl transition-shadow inline-flex"
            >
              <Download className="w-5 h-5" />
              <span>Download PDF Resume</span>
            </motion.a>
          ) : (
            <p className="text-gray-500 italic">
              CV download link not available
            </p>
          )}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Contact & Skills */}
          <div className="lg:col-span-1 space-y-8">
            {/* Contact Information */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Mail className="w-6 h-6 mr-3 text-purple-600" />
                Contact
              </h2>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">mdhhmobin@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">+880191794820</span>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700">Dhaka, Bangladesh</span>
                </div>
              </div>
            </motion.div>

            {/* Skills */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Code className="w-6 h-6 mr-3 text-purple-600" />
                Skills
              </h2>
              <div className="space-y-6">
                {Object.entries(skills).map(([category, skillList]) => (
                  <div key={category}>
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {category}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {skillList.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Certifications */}
            <motion.div
              variants={itemVariants}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="w-6 h-6 mr-3 text-purple-600" />
                Certifications
              </h2>
              <div className="space-y-3">
                {certifications.map((cert, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                    <span className="text-gray-700">{cert}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Experience & Education */}
          <div className="lg:col-span-2 space-y-12">
            {/* Experience */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <Briefcase className="w-8 h-8 mr-3 text-purple-600" />
                Professional Experience
              </h2>
              <div className="space-y-8">
                {experience.map((job, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {job.title}
                        </h3>
                        <p className="text-lg text-purple-600 font-semibold">
                          {job.company}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{job.period}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{job.location}</span>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">
                      {job.description}
                    </p>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Key Achievements:
                      </h4>
                      <ul className="space-y-2">
                        {job.achievements.map((achievement, achIndex) => (
                          <li
                            key={achIndex}
                            className="flex items-start space-x-3"
                          >
                            <div className="w-2 h-2 bg-purple-600 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Education */}
            <motion.div variants={itemVariants}>
              <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                <GraduationCap className="w-8 h-8 mr-3 text-purple-600" />
                Education
              </h2>
              <div className="space-y-6">
                {education.map((edu, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-900">
                          {edu.degree}
                        </h3>
                        <p className="text-lg text-purple-600 font-semibold">
                          {edu.school}
                        </p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center space-x-2 text-gray-500">
                          <Calendar className="w-4 h-4" />
                          <span className="text-sm">{edu.period}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-500">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{edu.location}</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <span className="font-semibold text-gray-900">
                          GPA:{" "}
                        </span>
                        <span className="text-gray-700">{edu.gpa}</span>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        Relevant Coursework:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevant.map((course, courseIndex) => (
                          <span
                            key={courseIndex}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Resume;
