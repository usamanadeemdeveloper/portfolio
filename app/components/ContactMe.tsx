"use client";

import { EnvelopeIcon, MapPinIcon, PhoneIcon } from "@heroicons/react/16/solid";
import { SubmitHandler, useForm } from "react-hook-form";
import { motion } from "framer-motion";

type Inputs = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

function ContactMe() {
  const { register, handleSubmit } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    window.location.href = `mailto:usamanadeemparacha@gmail.com?subject=${formData.subject}&body=Hi, my name is ${formData.name}. ${formData.message} (${formData.email})`;
  };

  return (
    <section className="relative min-h-screen w-full flex flex-col justify-center items-center py-32 px-6 md:px-10 overflow-hidden">
      {/* Premium Atmospheric Glows */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-blue-500/[0.03] rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/[0.02] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/20 text-[10px] md:text-xs font-bold mb-4"
          >
            Availability: Open for Projects
          </motion.h3>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl md:text-7xl font-bold text-gradient leading-[1.1] tracking-tight"
          >
            Let's build something <br className="hidden md:block" />
            <span className="text-blue-500/80">extraordinary</span> together.
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-10 md:gap-16 w-full">
          {/* Contact Details Nodes */}
          <div className="lg:col-span-2 space-y-6 md:space-y-8">
            <div className="space-y-4 md:space-y-6">
              <h4 className="text-white/80 text-lg md:text-xl font-bold px-2">Direct Access</h4>
              {[
                { icon: PhoneIcon, label: 'Call', value: '+92 336 8507047', color: 'bg-blue-500' },
                { icon: EnvelopeIcon, label: 'Email', value: 'usamanadeemparacha@gmail.com', color: 'bg-cyan-500' },
                { icon: MapPinIcon, label: 'Location', value: 'Karachi, Pakistan', color: 'bg-blue-600' }
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  viewport={{ once: true }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative"
                >
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-transparent rounded-[1.5rem] opacity-0 group-hover:opacity-100 transition duration-500 blur-sm" />
                  <div className="glass relative p-5 md:p-6 rounded-[1.5rem] flex items-center gap-4 md:gap-6 group-hover:border-blue-500/30 transition-all duration-500">
                    <div className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-2xl ${item.color}/10 flex items-center justify-center text-blue-400 group-hover:bg-blue-500 group-hover:text-white transition-all duration-500 shadow-lg shadow-blue-500/5`}>
                      <item.icon className="h-5 w-5 md:h-6 md:w-6" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-[9px] md:text-[10px] text-white/30 uppercase tracking-widest font-bold mb-0.5">{item.label}</p>
                      <p className="text-white/80 text-sm md:text-base font-bold break-all group-hover:text-white transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Social Signal */}
            <div className="glass p-6 md:p-8 rounded-[1.5rem] border-dashed border-white/5 bg-white/[0.01]">
              <p className="text-white/40 text-xs md:text-sm leading-relaxed italic">
                "Driven by precision, built with passion. I'm currently looking for new opportunities to solve complex problems."
              </p>
            </div>
          </div>

          {/* Premium Form */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="lg:col-span-3 glass p-6 md:p-12 rounded-[2rem] md:rounded-[2.5rem] shadow-2xl relative overflow-hidden"
          >
            {/* Subtle internal aura */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-500/10 rounded-full blur-[80px]" />
            
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 relative z-10"
            >
              <div className="space-y-2">
                <input
                  className="w-full outline-none bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/5 px-6 py-4 md:py-5 text-white placeholder-white/20 transition-all duration-300 focus:border-blue-500/50 focus:bg-white/[0.05] text-sm font-medium"
                  {...register("name")}
                  placeholder="Full Name"
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <input
                  className="w-full outline-none bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/5 px-6 py-4 md:py-5 text-white placeholder-white/20 transition-all duration-300 focus:border-blue-500/50 focus:bg-white/[0.05] text-sm font-medium"
                  {...register("email")}
                  placeholder="Email Address"
                  type="email"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <input
                  className="w-full outline-none bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/5 px-6 py-4 md:py-5 text-white placeholder-white/20 transition-all duration-300 focus:border-blue-500/50 focus:bg-white/[0.05] text-sm font-medium"
                  {...register("subject")}
                  placeholder="Inquiry Subject"
                  type="text"
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <textarea
                  className="w-full outline-none bg-white/[0.03] rounded-xl md:rounded-2xl border border-white/5 px-6 py-4 md:py-5 text-white placeholder-white/20 transition-all duration-300 focus:border-blue-500/50 focus:bg-white/[0.05] resize-none text-sm font-medium"
                  {...register("message")}
                  placeholder="Briefly describe your project or inquiry..."
                  rows={5}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.01, y: -2 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="md:col-span-2 relative group overflow-hidden bg-blue-600 px-8 py-4 md:py-5 rounded-xl md:rounded-2xl shadow-2xl shadow-blue-900/40"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <span className="relative z-10 text-white font-bold text-xs md:text-sm uppercase tracking-[0.3em]">
                  Dispatch Message
                </span>
              </motion.button>
              
              <p className="md:col-span-2 text-center text-[10px] text-white/20 font-bold uppercase tracking-widest pt-2">
                Typically responds within 24 hours
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default ContactMe;
