import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { useRef, useEffect } from "react";
import { ArrowRight, Bot, Zap, Shield, Cpu, ChevronRight, Globe, MessageSquare, Code, Sparkles } from "lucide-react";
import heroImgV2 from "../assets/images/bitsprite-v2.png";

const SectionTitle = ({ children, subtitle }: { children: React.ReactNode, subtitle?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} className="mb-32">
      <motion.span 
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        className="text-xs font-bold tracking-[0.5em] uppercase text-white/40 block mb-4"
      >
        {subtitle || "Protocol // 01"}
      </motion.span>
      <motion.h2 
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-6xl md:text-9xl font-display font-bold uppercase tracking-tighter leading-[0.9]"
      >
        {children}
      </motion.h2>
    </div>
  );
};

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  const heroScale = useTransform(smoothProgress, [0, 0.2], [1, 1.5]);
  const heroRotate = useTransform(smoothProgress, [0, 0.2], [0, 15]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.15], [0.6, 0]);
  const textY = useTransform(smoothProgress, [0, 0.2], [0, -200]);

  return (
    <div ref={containerRef} className="relative bg-black text-white font-sans selection:bg-white selection:text-black">
      <div className="fixed inset-0 noise-overlay z-50 pointer-events-none" />
      
      {/* Custom Cursor / Ambient Light */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-white/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-white/5 rounded-full blur-[100px]" />
      </div>

      <nav className="fixed top-0 w-full z-[100] px-12 py-8 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3 group cursor-pointer" 
          data-testid="link-home"
        >
          <div className="w-10 h-10 bg-white flex items-center justify-center rounded-full transition-transform group-hover:rotate-[360deg] duration-700">
            <Bot className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-display font-black tracking-tighter uppercase italic">BitSprite</span>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex gap-12 items-center text-[10px] font-black tracking-[0.3em] uppercase"
        >
          {["Intelligence","Pricing"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-white/50 transition-colors">{item}</a>
          ))}
          <button data-testid="button-nav-cta" className="bg-white text-black px-8 py-3 hover:invert transition-all duration-500 font-black">
            Download Now
          </button>
        </motion.div>
      </nav>

      {/* Extreme Hero */}
      <section className="relative h-[200vh] flex flex-col items-center">
        <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
          <motion.div 
            style={{ scale: heroScale, rotateZ: heroRotate, opacity: heroOpacity }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <img src={heroImgV2} alt="BitSprite Core" className="w-[120vw] h-[120vh] object-cover mix-blend-screen brightness-150" />
          </motion.div>

          <motion.div style={{ y: textY }} className="relative z-10 text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <h1 className="text-[12vw] font-display font-black leading-[0.75] tracking-[-0.05em] uppercase italic">
                BIT <br /> SPRITE
              </h1>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="mt-12 flex flex-col items-center"
            >
              <p className="text-white/40 text-sm tracking-[0.4em] uppercase font-bold mb-12">System Online // Version 1.0.0</p>
              <div className="flex gap-6">
                <button data-testid="button-hero-primary" className="bg-white text-black px-12 py-6 text-sm font-black uppercase tracking-widest hover:px-16 transition-all duration-500">
                  Initiate Sync
                </button>
                <button data-testid="button-hero-secondary" className="border border-white/20 hover:bg-white hover:text-black px-12 py-6 text-sm font-black uppercase tracking-widest transition-all duration-500">
                  Documentation
                </button>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="absolute bottom-12 text-[10px] tracking-[0.5em] text-white/20 uppercase font-black"
          >
            Scroll to deconstruct
          </motion.div>
        </div>
      </section>

      {/* Intelligence Section */}
    <section id="intelligence" className="relative py-60 px-12">
      <div className="max-w-[1400px] mx-auto">
        <SectionTitle subtitle="Neural Network">Deep <br /> Architecture</SectionTitle>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-32">
          <div className="space-y-32">
            <FeatureCard 
              icon={Sparkles} 
              title="Cognitive Core" 
              desc="Learns and adapts in real time, understanding context the way humans do." 
            />
            <FeatureCard 
              icon={Globe} 
              title="Global Sync" 
              desc="Seamlessly connects users and devices worldwide, delivering instant insights." 
            />
          </div>
          <div className="md:pt-60 space-y-32">
            <FeatureCard 
              icon={Shield} 
              title="Quantum Vault" 
              desc="Protects your data with next-generation encryption that evolves automatically." 
            />
            <FeatureCard 
              icon={Code} 
              title="Open Interface" 
              desc="Customize and extend your AI with easy-to-use modular plugins." 
            />
          </div>
        </div>
      </div>
    </section>

      {/* Pricing - High Fashion Style */}
      <section id="pricing" className="relative py-60 px-12 bg-white text-black rounded-[4rem] mx-4 mb-4">
        <div className="max-w-[1400px] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-40 gap-12">
            <h2 className="text-7xl md:text-[10rem] font-display font-black uppercase tracking-tighter leading-none">Access <br /> Levels</h2>
            <p className="text-black/40 max-w-sm text-sm font-bold uppercase tracking-widest leading-relaxed">
              Choose the depth of integration required for your operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PricingCard 
              name="Cyclic" 
              price="10" 
              period="Monthly" 
              features={["Extended limits on Agent", "Unlimited Tab completions", "Cloud Agents", "Maximum context windows"]}
            />
            <PricingCard 
              name="Infinite" 
              price="100" 
              period="Yearly" 
              highlight 
              features={["20x usage on all AI models", "Priority access to new features"]}
            />
          </div>
        </div>
      </section>

      <footer className="py-40 px-12 text-center">
        <motion.div 
          whileHover={{ scale: 1.1 }}
          className="inline-block mb-12 cursor-pointer"
        >
          <Bot className="w-16 h-16" />
        </motion.div>
        <div className="flex justify-center gap-12 text-[10px] font-black tracking-[0.4em] uppercase text-white/40 mb-12">
          <a href="#" className="hover:text-white transition-colors">Discord</a>
          <a href="#" className="hover:text-white transition-colors">Github</a>
        </div>
        <p className="text-[10px] tracking-[0.8em] uppercase text-white/20 font-black">
          BitSprite Systems © 2026
        </p>
      </footer>
    </div>
  );
}

function FeatureCard({ icon: Icon, title, desc }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <div className="w-16 h-16 mb-12 border border-white/10 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500">
        <Icon className="w-6 h-6" />
      </div>
      <h3 className="text-3xl font-display font-bold uppercase mb-6 tracking-tight">{title}</h3>
      <p className="text-white/40 text-lg font-light leading-relaxed max-w-md">{desc}</p>
    </motion.div>
  );
}

function PricingCard({ name, price, period, features, highlight = false }: any) {
  return (
    <div className={`p-16 border-2 border-black flex flex-col justify-between min-h-[600px] transition-all duration-700 hover:bg-black hover:text-white group ${highlight ? 'bg-black text-white' : ''}`}>
      <div>
        <div className="flex justify-between items-start mb-20">
          <span className="text-xs font-black tracking-[0.4em] uppercase opacity-40">{name} Plan</span>
          {highlight && <span className="px-4 py-1 bg-white text-black text-[8px] font-black uppercase tracking-widest">Recommended</span>}
        </div>
        <div className="flex items-baseline gap-2 mb-16">
          <span className="text-8xl md:text-[10rem] font-display font-black tracking-tighter leading-none italic">{price}€</span>
          <span className="text-xs font-black uppercase tracking-widest opacity-40">/{period}</span>
        </div>
        <ul className="space-y-4 mb-20">
          {features.map((f: string, i: number) => (
            <li key={i} className="text-xs font-bold uppercase tracking-widest flex items-center gap-3">
              <div className="w-1 h-1 bg-current rounded-full" />
              {f}
            </li>
          ))}
        </ul>
      </div>
      <button className={`w-full py-8 text-xs font-black uppercase tracking-[0.4em] border-2 transition-all duration-500 ${highlight || 'border-black hover:bg-white hover:text-black'} ${highlight ? 'border-white bg-white text-black hover:bg-transparent hover:text-white' : ''}`}>
        BUY NOW
      </button>
    </div>
  );
}
