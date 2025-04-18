import { Shield, MessageSquare, Globe } from 'lucide-react';

const FeatureCard = ({ icon, title, description }: any) => {
  return (
    <div className="bg-grn dark:bg-brn rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="h-12 w-12 bg-green-100 dark:bg-green-900/40 rounded-lg flex items-center justify-center text-green-600 dark:text-green-400 mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-black dark:text-white mb-3">{title}</h3>
      <p className="text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};

const Features = () => {
  const features = [
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Real-time Messaging",
      description: "Send and receive messages instantly with our lightning-fast real-time chat engine."
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Cross-Platform",
      description: "Access your conversations seamlessly across all your devices and platforms."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Privacy Controls",
      description: "Granular privacy settings give you complete control over your information."
    }
  ];

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-black dark:text-white mb-4">
            Designed for <span className="text-green-600 dark:text-green-400">seamless</span> communication
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Our platform combines powerful features with intuitive design to provide the best messaging experience possible.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;