"use client";
import { motion } from "framer-motion";

export default function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -left-1/3 -top-1/4 h-[40rem] w-[40rem] rounded-full bg-indigo-600 opacity-30 blur-3xl"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      />
      <motion.div
        className="absolute bottom-0 right-0 h-[50rem] w-[50rem] rounded-full bg-purple-600 opacity-20 blur-3xl"
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 25, ease: "linear" }}
      />
    </div>
  );
}
