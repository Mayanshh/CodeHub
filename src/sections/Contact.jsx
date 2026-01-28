import BgVideo from '@/assets/videos/CodingVideo1.mp4'
import SmoothReveal from '@/animations/SmoothReveal'
import videoFallbackPoster from '@/assets/images/about_us_bg_img.jpg'

const Contact = () => {
  return (
    <section className="relative h-[100svh] w-full flex items-center lg:items-start justify-center overflow-hidden">
      
      {/* Background video */}
      <video
        preload='auto'
        poster={videoFallbackPoster}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src={BgVideo} type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10" />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-start">
        <SmoothReveal stagger={0.125} className='text-center mx-2'>
          <h1 className='mt-[10svh] lg:mt-[26svh] lg:top-[45vh] h-auto w-[80%] lg:h-fit w-full font-bold whitespace-wrap text-[12vw] lg:text-[8rem] tracking-tighter leading-[0.80] text-[var(--base-color)] uppercase text-center fontMontreal'>
            Talk to us directly at our Nashik center.
          </h1>
        </SmoothReveal>

        <SmoothReveal stagger={0.125} >
          <h3 className='whitespace-wrap mt-[5svh] lg:mt-[5svh] w-[70vw] lg:w-[70vw] h-fit text-center text-[1.6rem] lg:text-[2.6rem] leading-[0.80] tracking-tight text-[var(--base-color)] fontRegular'>
            Get proper guidance before choosing your coding career.
          </h3>
        </SmoothReveal>
        <p className="absolute top-[150%] lg:top-[130%] left-1/2 transform -translate-x-1/2 w-[90%] md:w-[60%] lg:w-[30%] h-auto lg:h-[12svh] text-center flex items-center justify-center text-[4vw] md:text-xl lg:text-[1.2rem] leading-tight lg:leading-[0.99] text-[var(--base-color)] fontRegular">
          &copy; 2025 CodeHub India.
        </p>
      </div>
    </section>
  )
}

export default Contact
