import React from 'react';
import { assets } from '../assets/assets';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <div className='md:mx-10'>
      {/* --- Main Footer Grid Section --- */}
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
        
        {/* Left: Branding */}
        <div>
          <img className='w-40 mb-5' src={assets.logo} alt='' />
          <p className='w-full leading-6 text-gray-600 md:w-2/3'>
            Prescripto is a leading healthcare management platform dedicated to
            bridging the gap between patients and top-tier medical
            professionals. We simplify the appointment booking process, ensuring
            that quality healthcare is always just a click away. Your health,
            our priority.
          </p>
        </div>

        {/* Center: Links */}
        <div>
          <p className='mb-5 text-xl font-medium'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li className='transition-all cursor-pointer hover:text-primary'>Home</li>
            <li className='transition-all cursor-pointer hover:text-primary'>About Us</li>
            <li className='transition-all cursor-pointer hover:text-primary'>Contact Us</li>
            <li className='transition-all cursor-pointer hover:text-primary'>Privacy Policy</li>
          </ul>
        </div>

        {/* Right: Contact */}
        <div>
          <p className='mb-5 text-xl font-medium'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-4 text-gray-600'>
            <li className='flex items-center gap-3 group'>
              <Phone size={20} className='transition-transform duration-300 text-primary group-hover:scale-110' />
              <span className='transition-colors cursor-pointer group-hover:text-primary'>+234 810 123 4567</span>
            </li>
            <li className='flex items-center gap-3 group'>
              <Mail size={20} className='transition-transform duration-300 text-primary group-hover:scale-110' />
              <span className='transition-colors cursor-pointer group-hover:text-primary'>info@prescripto.com</span>
            </li>
            <li className='flex items-center gap-3 group'>
              <MapPin size={30} className='transition-transform duration-300 text-primary group-hover:scale-110' />
              <span className='text-sm transition-colors cursor-pointer group-hover:text-primary'>123 Main Street, Lagos, Nigeria</span>
            </li>
          </ul>
        </div>
      </div> {/* <-- MOVED THIS CLOSING DIV UP TO END THE GRID */}

      {/* --- Bottom Footer Section --- */}
      <div>
        <hr className='border-zinc-300' />
        <p className='py-5 text-sm text-center text-gray-500'>
          &copy; 2026 Prescripto. All rights reserved.
        </p>
      </div>

      <div className='mt-2'>
        <hr className='border-none h-[1px] bg-gradient-to-r from-transparent via-zinc-400 to-transparent opacity-50' />
        <div className='flex flex-col items-center gap-2 py-6'>
          <p className='text-sm text-gray-600 flex items-center gap-1.5 group cursor-default'>
            <span>Developed with</span>
            <span className='text-red-500 transition-transform duration-300 group-hover:scale-125 group-hover:drop-shadow-[0_0_5px_rgba(239,68,68,0.5)]'>❤️</span>
            <span>by</span>
            <span className='font-bold text-transparent transition-all duration-500 cursor-pointer bg-gradient-to-r from-primary to-blue-600 bg-clip-text hover:from-blue-600 hover:to-primary'>
              Michael Umoize
            </span>
          </p>

          <div className='flex items-center gap-2 opacity-60'>
            <span className='text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-300 px-2 py-0.5 rounded-full'>MERN Stack</span>
            <span className='text-[10px] uppercase tracking-widest text-zinc-500 border border-zinc-300 px-2 py-0.5 rounded-full'>2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;