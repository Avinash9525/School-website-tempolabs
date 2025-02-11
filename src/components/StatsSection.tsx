import React from "react";
import { motion } from "framer-motion";

interface StatItemProps {
  number: number;
  label: string;
  suffix?: string;
}

const StatItem = ({ number = 0, label = "", suffix = "+" }: StatItemProps) => {
  return (
    <div className="flex flex-col items-center space-y-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-4xl md:text-5xl font-bold text-primary"
      >
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 2,
            ease: "easeOut",
          }}
        >
          {number}
          {suffix}
        </motion.span>
      </motion.div>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-gray-600 text-lg text-center"
      >
        {label}
      </motion.p>
    </div>
  );
};

interface StatsSectionProps {
  stats?: Array<{
    number: number;
    label: string;
    suffix?: string;
  }>;
}

const StatsSection = ({
  stats = [
    { number: 95, label: "Success Rate", suffix: "%" },
    { number: 1000, label: "Students Enrolled" },
    { number: 15, label: "Years of Experience" },
    { number: 50, label: "Expert Teachers" },
  ],
}: StatsSectionProps) => {
  return (
    <section className="w-full py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Success in Numbers
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We take pride in our achievements and the success of our students
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <StatItem
              key={index}
              number={stat.number}
              label={stat.label}
              suffix={stat.suffix}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
