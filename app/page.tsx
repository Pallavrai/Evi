"use client";

import Image from "next/image";
import LiquidEther from "@/components/LiquidEther";
import Navbar from "@/components/Navbar";
import FallingText from "@/components/FallingText";
import SplitText from "@/components/SplitText";

const handleAnimationComplete = () => {
  console.log('All letters have animated!');
};

export default function Home() {
  return (
    <main>
      {/* Background */}
      <div style={{ width: "100%", height: "100dvh", position: "absolute", zIndex: 0 }}>
        <LiquidEther
          colors={["#5227FF", "#FF9FFC", "#B19EEF"]}
          mouseForce={20}
          cursorSize={100}
          isViscous={false}
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo={true}
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
        />
      </div>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          zIndex: 10,
          height: "100dvh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Main Title */}
        <div style={{ marginBottom: "1rem" }}>
          <SplitText
            text="Welcome to Evi"
            className="text-6xl md:text-8xl font-bold text-center text-white drop-shadow-lg"
            delay={100}
            duration={0.6}
            ease="power3.out"
            splitType="chars"
            from={{ opacity: 0, y: 40 }}
            to={{ opacity: 1, y: 0 }}
            threshold={0.1}
            rootMargin="-100px"
            textAlign="center"
            onLetterAnimationComplete={handleAnimationComplete}
          />
        </div>

        {/* Tagline - Falling Text */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "90dvh",
            height: "300px",
            marginTop: "2rem",
            color: "#B19EEF", /* Lavender - matches site aesthetic */
          }}
        >
          <FallingText
            text="Create Memorable Events That Inspire Connect And Celebrate Together"
            highlightWords={[
              "Memorable",
              "Events",
              "Inspire",
              "Connect",
              "Celebrate",
            ]}
            highlightClass="highlighted"
            trigger="hover"
            backgroundColor="transparent"
            wireframes={false}
            gravity={0.56}
            fontSize="1.5rem"
            mouseConstraintStiffness={0.9}
          />
        </div>
      </section>

      <Navbar />
    </main>
  );
}
