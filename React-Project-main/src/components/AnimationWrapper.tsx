// src/components/AnimationWrapper.tsx
import React, { useEffect, useRef, useState } from "react";

interface AnimationWrapperProps {
  children: React.ReactNode;
  animation?:
    | "fadeInUp"
    | "slideInLeft"
    | "slideInRight"
    | "scaleIn"
    | "bounce";
  delay?: number;
  duration?: number;
  threshold?: number;
  className?: string;
}

const AnimationWrapper: React.FC<AnimationWrapperProps> = ({
  children,
  animation = "fadeInUp",
  delay = 0,
  duration = 0.8,
  threshold = 0.1,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setIsVisible(true);
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold },
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [delay, threshold]);

  const animationClass = isVisible ? `animate-${animation}` : "opacity-0";
  const animationStyle = {
    animationDuration: `${duration}s`,
    animationFillMode: "both",
  };

  return (
    <div
      ref={elementRef}
      className={`${animationClass} ${className}`}
      style={animationStyle}
    >
      {children}
    </div>
  );
};

export default AnimationWrapper;
