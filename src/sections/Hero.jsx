import Navbar from "@/components/Navbar";
import SmoothReveal from "@/animations/SmoothReveal";

const Hero = () => {
  return (
    <section 
      id="hero" 
      className="relative flex h-[100svh] w-full flex-col overflow-x-hidden bg-[url('../assets/images/HeroRobot.avif')] bg-cover bg-[position:center_20%] bg-no-repeat px-5 lg:px-14"
    >
      <Navbar />
      
      <div className="w-full h-auto lg:h-[30%] text-[var(--secondary-color)] mt-0 lg:mt-[1.6rem] flex flex-col justify-between items-center">
        <SmoothReveal stagger={0.1}>
          <h1 className="h-auto lg:h-fit w-full font-bold whitespace-nowrap text-[14vw] lg:text-[13.61rem] mt-30 lg:mt-[8vh] tracking-tighter leading-[0.80] uppercase text-center lg:text-left">
            Your Coding
          </h1>
          <h2 className="w-full flex flex-col lg:inline-flex lg:flex-row items-center uppercase justify-between lg:justify-between whitespace-nowrap text-[14vw] lg:text-[4.95rem] lg:mt-[-6.4rem] leading-[0.80] tracking-tighter">
            <span className="mt-0 lg:mt-25">Journey</span>
            <span className="mt-0 lg:mt-25">Starts HERE</span>
          </h2>
        </SmoothReveal> 

        <p className="absolute bottom-38 lg:bottom-0 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] lg:w-[30%] h-auto lg:h-[12svh] text-center flex items-center justify-center text-[4.95vw] md:text-xl lg:text-[1.7rem] leading-tight lg:leading-[0.99] text-[var(--secondary-color)]">
          Nashik’s most trusted offline coding classes for real careers.
        </p>
      </div>
    </section>
  );
};

export default Hero;