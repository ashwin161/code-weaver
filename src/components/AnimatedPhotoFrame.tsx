 import { useEffect, useState } from "react";
 import { useIsMobile } from "@/hooks/use-mobile";
 import ProfileImage from "@/assests/Profile.png";
 
 interface AnimatedPhotoFrameProps {
   imageSrc?: string;
   altText?: string;
   variant?: "futuristic" | "elegant";
 }
 
 const AnimatedPhotoFrame = ({
   imageSrc = ProfileImage,
   altText = "Profile Photo",
   variant = "futuristic",
 }: AnimatedPhotoFrameProps) => {
   const [isAnimated, setIsAnimated] = useState(false);
   const [showDots, setShowDots] = useState(false);
   const isMobile = useIsMobile();
 
   useEffect(() => {
     // Start animation on mount
     const timer = setTimeout(() => setIsAnimated(true), 100);
     // Show dots after lines finish drawing
     const dotsTimer = setTimeout(() => setShowDots(true), 2500);
     
     return () => {
       clearTimeout(timer);
       clearTimeout(dotsTimer);
     };
   }, []);
 
   const isFuturistic = variant === "futuristic";
   const strokeColor = isFuturistic ? "hsl(var(--primary))" : "hsl(45, 80%, 60%)";
   const glowColor = isFuturistic ? "var(--primary)" : "45, 80%, 60%";
 
   return (
     <div className="relative w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] md:w-[360px] md:h-[360px]">
       {/* SVG Frame with animated lines */}
       <svg
         className="absolute inset-0 w-full h-full"
         viewBox="0 0 360 360"
         fill="none"
         xmlns="http://www.w3.org/2000/svg"
       >
         <defs>
           {/* Glow filter */}
           <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
             <feGaussianBlur stdDeviation="3" result="coloredBlur" />
             <feMerge>
               <feMergeNode in="coloredBlur" />
               <feMergeNode in="SourceGraphic" />
             </feMerge>
           </filter>
           
           {/* Clip path for circular image */}
           <clipPath id="circleClip">
             <circle cx="180" cy="180" r="120" />
           </clipPath>
         </defs>
 
         {/* Outer hexagonal frame */}
         <polygon
           points="180,20 310,85 310,215 180,280 50,215 50,85"
           className={`animated-line ${isAnimated ? "draw" : ""}`}
           stroke={strokeColor}
           strokeWidth="2"
           fill="none"
           filter="url(#glow)"
           style={{
             strokeDasharray: 800,
             strokeDashoffset: isAnimated ? 0 : 800,
             transition: "stroke-dashoffset 2s cubic-bezier(0.16, 1, 0.3, 1)",
           }}
         />
 
         {/* Inner hexagonal frame */}
         <polygon
           points="180,40 290,95 290,205 180,260 70,205 70,95"
           className={`animated-line ${isAnimated ? "draw" : ""}`}
           stroke={strokeColor}
           strokeWidth="1.5"
           fill="none"
           filter="url(#glow)"
           opacity="0.7"
           style={{
             strokeDasharray: 700,
             strokeDashoffset: isAnimated ? 0 : 700,
             transition: "stroke-dashoffset 2.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s",
           }}
         />
 
         {/* Circuit-style decorative lines */}
         {!isMobile && (
           <>
             {/* Top left circuit */}
             <path
               d="M50,85 L30,85 L30,60 M50,95 L20,95"
               className={`animated-line ${isAnimated ? "draw" : ""}`}
               stroke={strokeColor}
               strokeWidth="1.5"
               fill="none"
               filter="url(#glow)"
               opacity="0.6"
               style={{
                 strokeDasharray: 100,
                 strokeDashoffset: isAnimated ? 0 : 100,
                 transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1) 0.8s",
               }}
             />
             
             {/* Top right circuit */}
             <path
               d="M310,85 L330,85 L330,60 M310,95 L340,95"
               className={`animated-line ${isAnimated ? "draw" : ""}`}
               stroke={strokeColor}
               strokeWidth="1.5"
               fill="none"
               filter="url(#glow)"
               opacity="0.6"
               style={{
                 strokeDasharray: 100,
                 strokeDashoffset: isAnimated ? 0 : 100,
                 transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1) 1s",
               }}
             />
             
             {/* Bottom left circuit */}
             <path
               d="M50,215 L30,215 L30,240 M50,205 L20,205"
               className={`animated-line ${isAnimated ? "draw" : ""}`}
               stroke={strokeColor}
               strokeWidth="1.5"
               fill="none"
               filter="url(#glow)"
               opacity="0.6"
               style={{
                 strokeDasharray: 100,
                 strokeDashoffset: isAnimated ? 0 : 100,
                 transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1) 1.2s",
               }}
             />
             
             {/* Bottom right circuit */}
             <path
               d="M310,215 L330,215 L330,240 M310,205 L340,205"
               className={`animated-line ${isAnimated ? "draw" : ""}`}
               stroke={strokeColor}
               strokeWidth="1.5"
               fill="none"
               filter="url(#glow)"
               opacity="0.6"
               style={{
                 strokeDasharray: 100,
                 strokeDashoffset: isAnimated ? 0 : 100,
                 transition: "stroke-dashoffset 1s cubic-bezier(0.16, 1, 0.3, 1) 1.4s",
               }}
             />
 
             {/* Corner accents */}
             <path
               d="M180,20 L180,5 M180,280 L180,295"
               className={`animated-line ${isAnimated ? "draw" : ""}`}
               stroke={strokeColor}
               strokeWidth="2"
               fill="none"
               filter="url(#glow)"
               style={{
                 strokeDasharray: 30,
                 strokeDashoffset: isAnimated ? 0 : 30,
                 transition: "stroke-dashoffset 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.6s",
               }}
             />
           </>
         )}
 
         {/* Circular inner frame */}
         <circle
           cx="180"
           cy="180"
           r="125"
           className={`animated-line ${isAnimated ? "draw" : ""}`}
           stroke={strokeColor}
           strokeWidth="1"
           fill="none"
           filter="url(#glow)"
           opacity="0.5"
           style={{
             strokeDasharray: 785,
             strokeDashoffset: isAnimated ? 0 : 785,
             transition: "stroke-dashoffset 2.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s",
           }}
         />
 
         {/* Intersection dots - appear after lines finish */}
         {showDots && !isMobile && (
           <>
             <circle cx="180" cy="20" r="4" fill={strokeColor} className="animate-fade-in" filter="url(#glow)" />
             <circle cx="310" cy="85" r="4" fill={strokeColor} className="animate-fade-in" filter="url(#glow)" style={{ animationDelay: "0.1s" }} />
             <circle cx="310" cy="215" r="4" fill={strokeColor} className="animate-fade-in" filter="url(#glow)" style={{ animationDelay: "0.2s" }} />
             <circle cx="180" cy="280" r="4" fill={strokeColor} className="animate-fade-in" filter="url(#glow)" style={{ animationDelay: "0.3s" }} />
             <circle cx="50" cy="215" r="4" fill={strokeColor} className="animate-fade-in" filter="url(#glow)" style={{ animationDelay: "0.4s" }} />
             <circle cx="50" cy="85" r="4" fill={strokeColor} className="animate-fade-in" filter="url(#glow)" style={{ animationDelay: "0.5s" }} />
           </>
         )}
 
         {/* Profile image */}
         <image
           href={imageSrc}
           x="60"
           y="60"
           width="240"
           height="240"
           clipPath="url(#circleClip)"
           className={`transition-opacity duration-1000 ${isAnimated ? "opacity-100" : "opacity-0"}`}
           style={{ transitionDelay: "0.5s" }}
           preserveAspectRatio="xMidYMid slice"
         />
       </svg>
 
       {/* Hover glow effect */}
       <div
         className={`absolute inset-0 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none ${isMobile ? "hidden" : ""}`}
         style={{
           background: `radial-gradient(circle at center, hsl(${glowColor} / 0.15) 0%, transparent 70%)`,
         }}
       />
 
       {/* Pulsing ring on hover - desktop only */}
       {!isMobile && (
         <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500">
           <div
             className="w-[260px] h-[260px] sm:w-[300px] sm:h-[300px] md:w-[340px] md:h-[340px] rounded-full border border-primary/30 animate-pulse"
             style={{ animationDuration: "2s" }}
           />
         </div>
       )}
     </div>
   );
 };
 
 export default AnimatedPhotoFrame;