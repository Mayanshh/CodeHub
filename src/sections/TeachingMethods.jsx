import img1 from '@/assets/images/Student_studying_img.jpg'
import img2 from '@/assets/images/Student_studying_img2.jpg'
import img3 from '@/assets/images/Student_studying_img3.jpg'


const TeachingMethods = () => {
  return (
    <section className="relative h-[120svh] lg:h-[200svh] w-full bg-white flex flex-col items-center justify-start">
      <h1 className='h-auto w-[80%] lg:h-fit mt-[20svh] lg:mt-[30svh] w-full font-bold whitespace-wrap text-[14vw] lg:text-[11rem] tracking-tighter lg:tracking-tight leading-[0.80] text-black uppercase text-center'>
        Teaching Method
     </h1>
     <div className="h-[45svh] w-[80%] lg:w-full mt-[10svh] lg:mt-[15svh] flex flex-col items-center lg:items-end justify-start">
        <h2 className="lg:w-[50%]  h-fit text-left text-[1.8rem] lg:text-[2rem] leading-[0.80] tracking-tight text-[var(--primary-color)] font-bold  fontMontreal mr-6">Our teaching is based on strong fundamentals</h2>
        <h2 className="lg:w-[50%]  h-fit text-left mt-5 lg:mt-2 lg:mt-3 text-[1.2rem] lg:text-[2.2rem] leading-[0.99] text-black  fontRegular mr-6">
            Repeated practice and real-world examples taught <br /> offline for maximum clarity, ensuring <span className="fontItallic"> concepts are reinforced, understood deeply,</span> and applied effectively  <br /> beyond the classroom.
        </h2>
     </div>

    <div className='absolute top-[57%] lg:top-[40%] left-[6%] rotate-10 h-auto w-auto bg-[var(--primary-color)] flex flex-col items-center rounded-md justify-between gap-5 px-3 py-3 lg:px-5 lg:py-5'>
        <img src={img1} alt="an image was here" className='h-[12vh] w-[12vh] lg:h-[50vh] lg:w-[50vh] object-cover rounded-md' />
        <p className='text-sm lg:text-2xl text-[var(--base-color)] fontRegular'>Somethimngg skb</p>
    </div>

    <div className='absolute top-[74%] lg:top-[72%] left-[40%] -rotate-5 h-auto w-auto bg-[var(--primary-color)] flex flex-col items-center rounded-md justify-between gap-5 px-3 py-3 lg:px-5 lg:py-5'>
        <img src={img2} alt="an image was here" className='h-[10vh] w-[10vh] lg:h-[35vh] lg:w-[35vh] object-cover rounded-md' />
        <p className='text-sm lg:text-2xl text-[var(--base-color)] fontRegular'>Somethimngg skb</p>
    </div>

    <div className='absolute top-[60%] lg:top-[60%] right-[5%] rotate-6 h-auto w-auto bg-[var(--primary-color)] flex flex-col items-center rounded-md justify-between gap-5 px-3 py-3 lg:px-5 lg:py-5'>
        <img src={img3} alt="an image was here" className='h-[10vh] w-[10vh] lg:h-[40vh] lg:w-[40vh] object-cover rounded-md' />
        <p className='text-sm lg:text-2xl text-[var(--base-color)] fontRegular'>Somethimngg skb</p>
    </div>
    </section>
  )
}

export default TeachingMethods
