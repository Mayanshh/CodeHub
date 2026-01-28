import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Button = ({ text = "", onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`
        group relative flex items-center justify-center gap-3 
        rounded-full border border-white
        transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
        active:scale-95
        text-white
        ${className}
      `}
    >
      {/* Text Label */}
      <span className="fontRegular text-xl lg:text-2xl tracking-wide transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-x-1">
        {text}
      </span>

      {/* Animated Icon Container */}
      <div className="relative w-5 h-5 overflow-hidden">
        {/* Primary Arrow */}
        <ArrowUpRight 
          size={22} 
          strokeWidth={2}
          className="absolute inset-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
                     group-hover:translate-x-5 group-hover:-translate-y-5" 
        />
        
        {/* Secondary Arrow */}
        <ArrowUpRight 
          size={22} 
          strokeWidth={2}
          className="absolute inset-0 -translate-x-5 translate-y-5 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] 
                     group-hover:translate-x-0 group-hover:translate-y-0" 
        />
      </div>
    </button>
  );
};

export default Button;