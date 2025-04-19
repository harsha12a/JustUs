import { ArrowRight, MessageCircle } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* Gradient Background above all elements */}
      <div className="hidden sm:block absolute inset-0 translate-x-1/2 gradient-bg w-[95%] rounded-full z-0"></div>

      <div className="absolute top-1/4 left-10 w-64 h-64 bg-green-300 dark:bg-green-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 translate-x-32 z-10"></div>
      <div className="absolute top-1/3 right-10 w-72 h-72 bg-yellow-200 dark:bg-yellow-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animation-delay-2000 z-10"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-purple-200 dark:bg-purple-700 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-30 animation-delay-4000 z-10"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 relative z-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 text-sm font-medium mb-6">
              <MessageCircle className="h-4 w-4 mr-2" />
              <span>The future of communication</span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Connect with anyone, <span className="text-green-700 dark:text-green-400">anywhere</span>, instantly
            </h1>

            <p className="text-xl text-black dark:text-gray-300 mb-8">
              Experience seamless one-on-one conversations with our modern chat platform.
              Built for personal connections, designed for simplicity.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a
                href="/signup"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center group"
              >
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a 
                href="#how-it-works" 
                className="bg-white dark:bg-gray-600 text-gray-700 dark:text-white border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 px-8 py-3 rounded-lg font-medium transition-colors duration-200"
              >
                Learn More
              </a>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden max-w-md mx-auto transform rotate-2 hover:rotate-0 transition-transform duration-300">
              <img
                src="https://usabilitygeek.com/wp-content/uploads/2019/05/psychology-live-chat-lead.jpg"
                alt="People chatting"
                className="w-full h-auto object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-bold">Sarah & Friends</h3>
                  <p className="text-sm opacity-90">Stay connected with the people who matter most</p>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-4 -left-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transform -rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-3">
                <div className="h-3 w-3 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">5 friends online</p>
              </div>
            </div>

            <div className="absolute top-10 -right-8 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg transform rotate-6 hover:rotate-0 transition-transform duration-300">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">J</div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">John is typing...</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 text-center">
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">2M+</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Active Users</p>
          </div>
          <div>
            <h3 className="text-3xl sm:text-4xl font-bold text-green-600 dark:text-green-400">150+</h3>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Countries</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
