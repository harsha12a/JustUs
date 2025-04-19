import { UserPlus, MessageSquare, Heart } from 'lucide-react';

const StepCard = ({ number, icon, title, description }: any) => {
  return (
    <div className="relative">
      <div className="absolute -left-4 -top-4 h-10 w-10 rounded-full bg-green-600 dark:bg-green-500 text-white flex items-center justify-center text-xl font-bold shadow-lg">
        {number}
      </div>
      
      <div className="bg-white dark:bg-brn rounded-xl p-8 shadow-md hover:shadow-lg transition-shadow duration-300 border-t-4 border-green-600 dark:border-green-500">
        <div className="h-12 w-12 bg-green-100 dark:bg-green-900/40 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 mb-5">
          {icon}
        </div>
        <h3 className="text-xl font-bold text-black dark:text-white mb-3">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      icon: <UserPlus className="h-6 w-6" />,
      title: "Create an Account",
      description: "Sign up in seconds with just your email. No complicated forms or verification processes."
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Start Chatting",
      description: "Find friends or invite them with a simple link. Begin conversations instantly with no setup required."
    },
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Stay Connected",
      description: "Enjoy seamless communication across all your devices. Never miss an important message again."
    }
  ];

  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Simple as <span className="text-green-600 dark:text-green-400">1-2-3</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Getting started with ChatApp is effortless. Follow these simple steps to begin connecting with friends, family, and colleagues.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <StepCard
              key={index}
              number={index + 1}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <a 
            href="/signup" 
            className="inline-flex items-center bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-200"
          >
            Get Started Now
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;