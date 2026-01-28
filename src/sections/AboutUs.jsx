import BgImg from '@/assets/images/about_us_bg_img.jpg'
import SmoothReveal from '@/animations/SmoothReveal'

const AboutUs = () => {
  return (
    <section
      id="aboutUs"
      className="h-[200svh] w-full flex flex-col items-center justify-start bg-cover bg-center px-14"
      style={{ backgroundImage: `url(${BgImg})` }}
    >
    <SmoothReveal stagger={0.125} className='text-center mx-2'>
        <h1 className='mt-[10svh] lg:mt-[26svh] lg:top-[45vh] h-auto w-[80%] lg:h-fit w-full font-bold whitespace-wrap text-[14vw] lg:text-[12rem] tracking-tighter leading-[0.80] text-[var(--base-color)] uppercase text-center fontMontreal'>
        About Us
        </h1>
    </SmoothReveal>
     
     <SmoothReveal stagger={0.125} >
     <h3 className='whitespace-wrap mt-[25svh] lg:mt-[25svh] w-[70vw] lg:w-[70vw] h-fit text-left text-[1.6rem] lg:text-[2.6rem] leading-[0.80] tracking-tight text-[var(--base-color)] font-bold  fontMontreal'>
        CodeHub Nashik was built to help <span className='text-[var(--secondary-color)] fontItallic'>beginners become confident developers</span>  through structured offline learning and constant mentor support.
     </h3>
     </SmoothReveal>
     <SmoothReveal stagger={0.125} >
     <div className='w-full mt-[25svh] lg:mt-[28svh] h-auto flex flex-row items-start justify-end'>
        <h3 className='whitespace-wrap  w-[70vw] lg:w-[70vw] h-fit text-right text-[1.6rem] lg:text-[2.6rem] leading-[0.80] tracking-tight text-[var(--base-color)] font-bold  fontMontreal'>
        We focus on every <span className='text-[var(--primary-color)] fontItallic'> student’s growth</span> by clearing basics, improving confidence, and guiding them towards practical career paths.
     </h3>
     </div>
     </SmoothReveal>
     <SmoothReveal stagger={0.125} >
     <h3 className='whitespace-wrap mt-[25svh] lg:mt-[28svh] w-[70vw] lg:w-[70vw] h-fit text-left text-[1.6rem] lg:text-[2.6rem] leading-[0.80] tracking-tight text-[var(--base-color)] font-bold  fontMontreal'>
        <span className='text-[var(--secondary-color)] fontItallic'>Hundreds of students trained</span> offline in Nashik, Strong classroom culture, peer learning, and continuous <span className='text-[var(--secondary-color)] fontItallic'>mentor guidance.</span>
     </h3>
     </SmoothReveal>
    </section>
  )
}

export default AboutUs
