"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { MeshGradientRenderer } from "@johnn-e/react-mesh-gradient";
import { useRouter } from "next/navigation";

const LandingPage = () => {
  const router = useRouter();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <>
      <Navbar className="fixed" profilecard={false} />
      <main className="w-screen h-screen flex justify-center items-center overflow-hidden">
        <MeshGradientRenderer
          className="gradient fixed w-screen h-screen "
          colors={["#E0FFFF", "#E1FFFF", "#BBDEE3", "#E9F9FB", "#E9F9FB"]}
          wireframe={false}
        />
        <motion.div
          className="flex flex-col items-center justify-center gap-y-8 w-screen h-screen bg-gradient-to-b from-white from-40% to-transparent to-60% overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.p
            className="text-6xl tracking-wider text-center pt-[25rem] font-light"
            variants={itemVariants}
          >
            Velkommen til Factsplat
          </motion.p>
          <motion.p
            className="text-8xl tracking-wide text-center"
            variants={itemVariants}
          >
            KI assistert onboarding
          </motion.p>
          <motion.p
            className="text-2xl w-4/6 text-center leading-[3rem] tracking-wide font-regular"
            variants={itemVariants}
          >
            Assistert av kunstig intelligens, genererer vi en Splat spesifikt for deg for å hjelpe deg å strukturere
            dagen din, arbeidet ditt eller hobbyene dine.
          </motion.p>
          <motion.div className="flex gap-x-4" variants={itemVariants}>
            <button
              className="transition-colors bg-primary-default hover:bg-primary-second text-white font-medium py-4 px-10 rounded-md text-xl"
              onClick={() => router.push("/form")}
              id="get-started"
            >
              Kom i gang - gratis
            </button>
            <button
              className="transition-colors bg-primary-default hover:bg-primary-second text-white font-medium py-4 px-10 rounded-md text-xl"
              onClick={() => router.push("/splats")}
              id="look-at-splats"
            >
              Se på andre Splats
            </button>
          </motion.div>
          <motion.div
            className="w-3/6 relative drop-shadow-md pt-14"
            variants={imageVariants}
          >
            <Image
              src="/assets/props/splat.png"
              alt={"splat dashboard example"}
              width="1920"
              height="1080"
              className="w-full h-full"
              draggable={false}
            />
          </motion.div>
        </motion.div>
      </main>
    </>
  );
};

export default LandingPage;
