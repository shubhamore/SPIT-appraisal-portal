import React, { useRef } from 'react'
import Lottie from "lottie-react";
import animationData from "../../../assets/phone-animation.json";

const TimeTable = () => {
  const animationRef = useRef(null);
  return (
    <div className="text-2xl font-semibold min-h-[calc(100vh-64px)] flex flex-col justify-center items-center bg-[var(--bg-color)] text-[var(--text-color)]">
      <h1>Coming Soon...</h1>
      <div className="w-96 h-96">
        <Lottie
          onComplete={() => {
            animationRef.current.setDirection(-1);
            animationRef.current.play();
            animationRef.current.setSpeed(5);
          }}
          lottieRef={animationRef}
          animationData={animationData}
        />
      </div>
    </div>
  );
}

export default TimeTable