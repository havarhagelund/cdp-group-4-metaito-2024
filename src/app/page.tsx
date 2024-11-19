"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/navbar/Navbar";
import Image from "next/image";
import { MeshGradientRenderer } from '@johnn-e/react-mesh-gradient';
import { useRouter } from "next/navigation";

const Home = () => {
  const router = useRouter();

  // Variants for animations
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
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <>
      <Navbar className="fixed" profilecard={false} />
      <main className="w-screen h-screen flex justify-center items-center overflow-hidden">
        <MeshGradientRenderer
          className="gradient fixed w-screen h-screen "
          colors={[
            "#E0FFFF",
            "#E1FFFF",
            "#BBDEE3",
            "#E9F9FB",
            "#E9F9FB",
          ]}
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
            Welcome to the Factsplat
          </motion.p>
          <motion.p
            className="text-8xl tracking-wide text-center"
            variants={itemVariants}
          >
            AI Assistant Experience
          </motion.p>
          <motion.p
            className="text-2xl w-4/6 text-center leading-[3rem] tracking-wide font-regular"
            variants={itemVariants}
          >
            With the help of AI, we generate you a Splat to help you structure your day, work, or hobbies.
          </motion.p>
          <motion.div className="flex gap-x-4" variants={itemVariants}>
            <motion.button
              className="transition-colors bg-primary-default hover:bg-primary-second text-white font-medium py-4 px-10 rounded-md text-xl"
              whileHover="hover"
              onClick={() => router.push("/form")}
            >
              Get Started - for free
            </motion.button>
            <motion.button
              className="transition-colors bg-primary-default hover:bg-primary-second text-white font-medium py-4 px-10 rounded-md text-xl"
              whileHover="hover"
              onClick={() => router.push("/splats")}
            >
              Look at other Splats
            </motion.button>
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

export default Home;
