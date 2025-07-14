import exImage2 from '../data/img/Modern Creative Webinar Facebook Post.png';
import exImage3 from '../data/img/Modern Creative Webinassr Facebook Post.png';


// src/data/projects.ts
export const projects = [
    {
        id: 1,
        title: 'Smart Vending Machine',
        description: 'An automated tea and coffee vending system powered by ESP32 and IoT.',
        longDescription: 'This project involves building a smart vending machine that dispenses tea and coffee on demand using an ESP32 microcontroller. It features an intuitive user interface built with React, real-time order processing via MQTT protocol, temperature monitoring, water level sensing, OLED display feedback, and Telegram bot integration for remote control. Designed with efficiency and modularity in mind, this system bridges embedded hardware and modern web technology for seamless user experience.',
        image: exImage2,
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
        image: exImage3,
        category: 'Robotics',
        tags: ['C++', 'Worker Safety', 'Microcontroller', 'Autodesk AutoCAD', 'Internet of Things', 'Robotics', 'KiCad'],
        date: '2025',
        github: 'https://github.com',
        demo: 'https://demo.com',
        featured: true
    }
];
