import Features from "./Features"
import Footer from "./Footer"
import HeroSection from "./HeroSection"
import HowItWorks from "./HowItWorks"

function Home() {
  return (
    <div className="dark:bg-black bg-gray-50">
        <HeroSection />
        <Features />
        <HowItWorks />
        <Footer />
    </div>
  )
}

export default Home