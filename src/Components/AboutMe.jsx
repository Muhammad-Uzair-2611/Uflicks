import React from 'react';

const AboutMe = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white py-12 px-4 sm:px-6 lg:px-8">
      {/* Hero Section */}
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            About UFlicks
          </h1>
          <p className="text-lg sm:text-xl text-gray-300">
            A modern movie discovery platform built with React
          </p>
        </div>

        {/* Developer Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-amber-400">Developer</h2>
          <p className="text-gray-300 mb-4">
            Hi, I'm Muhammad Uzair, a passionate web developer who created UFlicks as a portfolio project. 
            This application showcases my skills in modern web development and my love for creating 
            user-friendly interfaces.
          </p>
          <p className="text-gray-300">
            UFlicks is designed to provide movie enthusiasts with a seamless experience in discovering 
            and exploring their favorite films and TV shows.
          </p>
        </div>

        {/* Technical Concepts Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 backdrop-blur-sm">
          <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-amber-400">Technical Implementation</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-amber-300">React & Modern JavaScript</h3>
              <p className="text-gray-300">
                Built using React's latest features including hooks, context API, and functional components 
                for efficient state management and component architecture.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-amber-300">Responsive Design</h3>
              <p className="text-gray-300">
                Implemented using Tailwind CSS for a fully responsive layout that works seamlessly across 
                all devices, from mobile to desktop.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-amber-300">API Integration</h3>
              <p className="text-gray-300">
                Integrated with TMDB API for real-time movie data, implementing efficient data fetching 
                and caching strategies.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-amber-300">Performance Optimization</h3>
              <p className="text-gray-300">
                Implemented lazy loading, image optimization, and efficient state management to ensure 
                smooth performance and fast load times.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2 text-amber-300">User Experience</h3>
              <p className="text-gray-300">
                Focused on creating an intuitive and engaging user interface with smooth transitions, 
                loading states, and error handling.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe; 