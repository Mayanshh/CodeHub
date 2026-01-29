import RobotHandImg from '@/assets/images/robotHandImg0.avif'
import RobotHandImgPortrait from '@/assets/images/robotHandImgPortrait.avif'
import { useIsDesktop } from '@/hooks/useIsDesktop';
const Discover = () => {
  const isDesktop = useIsDesktop();

  return (
    <section id='discover' className='relative w-full h-[100svh] max-h-[100svh] lg:h-[200svh] lg:max-h-[200svh] overflow-hidden flex flex-col items-center justify-center bg-red-500'>
      {isDesktop ? (
       <img
        src={RobotHandImg}
        alt="Background"
        className="min-w-[100vw] lg:w-full h-full object-cover "
      />
      ) : (
        <img
        src={RobotHandImgPortrait}
        alt="Background"
        className="min-w-[100vw] lg:w-full h-full object-cover "
      />
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-transparent to-transparent" style={{ backgroundImage: 'linear-gradient(to bottom, black 0%, transparent 20%)' }} >
      </div>
      <h1 className='absolute top-[16vh] mix-blend-difference lg:top-[45vh] h-auto w-[80%] lg:h-fit w-full font-bold whitespace-wrap text-[14vw] lg:text-[9rem] tracking-tighter leading-[0.80] text-white uppercase text-center'>
        Discover your potential!
     </h1>
     <h3 className='absolute whitespace-wrap top-[48%] lg:top-[115svh] w-[70vw] lg:w-[30vw] h-fit text-center text-[1.6rem] lg:text-[2.6rem] leading-[0.80] tracking-tight text-[var(--primary-color)] font-bold  fontMontreal'>
        Build skills that match industry needs
     </h3>
     <h3 className='absolute lg:mix-blend-difference whitespace-wrap top-[64%] lg:top-[140svh] w-[80vw] lg:w-[50vw] h-fit text-center text-[1.8rem] lg:text-[3.5rem] leading-[0.99] tracking-tight text-[var(--primary-color)] lg:text-white font-bold  fontRegular'>
        Learn step-by-step with experienced offline mentors and work on hands-on projects designed to build practical skills and prepare you for real-world jobs.
     </h3>
    </section>
  )
}

export default Discover