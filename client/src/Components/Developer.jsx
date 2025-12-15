import React from 'react';
import { Github, Linkedin, Mail, Phone } from "lucide-react";
import { Link } from 'react-router-dom';

const Developer = () => {
  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10 flex flex-col justify-center items-center">
      <div className="flex flex-col md:flex-row items-center gap-10 w-full max-w-5xl">
        <img
          className="w-48 h-48 md:w-72 md:h-72 rounded-full shadow-lg object-cover"
          src="https://media.licdn.com/dms/image/v2/D5603AQFhKDzYZFd5Rw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1723361386869?e=1752105600&v=beta&t=wvaBEwg6V4y7u2owbaF4Bg1YaNoMbIgc7KonCHbtEe4"
          alt="Developer Avatar"
        />
        <section className="text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Hi, I'm Mahammad 👋
          </h1>
          <p className="text-lg text-gray-600 max-w-xl">
            I'm a passionate <span className="text-blue-600 font-semibold">Web Application Developer</span> skilled in building modern and responsive web apps using React, Node.js, and more.
          </p>
        </section>
      </div>

      <div className="mt-10 w-full max-w-2xl">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center md:text-left">Connect with me</h2>
        <div className="flex flex-col md:flex-row items-center md:items-start md:justify-between gap-4">
          <div className="flex items-center gap-3 text-gray-700">
            <Mail className="text-blue-600" />
            <a href="mailto:deverakondahuzefa01@gmail.com" className="hover:text-blue-600 transition">deverakondahuzefa01@gmail.com</a>
          </div>
          <div className="flex items-center gap-3 text-gray-700">
            <Phone className="text-green-600" />
            <a href="tel:+91-8247765976" className="hover:text-green-600 transition">+91-8247765976</a>
          </div>
          <div className="flex gap-4 text-gray-700">
            <a href="https://github.com/mahammad-devarakonda" target="_blank" rel="noopener noreferrer" className="hover:text-black transition">
              <Github />
            </a>
            <a href="https://www.linkedin.com/in/mahammad-huzefa-devarakonda-1186a4212/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700 transition">
              <Linkedin />
            </a>
            <Link className='fixed top-4 right-4 z-40 hover:text-blue-300' to='/'>Back Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Developer;
