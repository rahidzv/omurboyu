import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import campusImage from "@/assets/campus.png";
import logo from "@/assets/logo.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center overflow-hidden pb-8">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src={campusImage} 
          alt="MDU Kampus" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img 
              src={logo} 
              alt="Ömürboyu Təhsil Məktəbi" 
              className="h-48 md:h-64 lg:h-80 w-auto brightness-0 invert"
            />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            Ömürboyu Öyrənmə, <br />
            <span className="text-secondary">Sonsuz İmkanlar</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed"
          >
            Mingəçevir Dövlət Universiteti nəzdində fəaliyyət göstərən Ömürboyu Təhsil Məktəbi 
            peşəkar inkişaf, dil öyrənmə və mühəndislik təkmilləşdirmə proqramları təqdim edir.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/programs">
              <Button size="lg" className="accent-gradient text-accent-foreground shadow-lg hover:shadow-xl transition-all group">
                Proqramları Kəşf Et
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link to="/registration">
              <Button size="lg" variant="outline" className="border-white/80 bg-white/20 text-white font-semibold hover:bg-white hover:text-primary backdrop-blur-sm">
                Qeydiyyatdan Keç
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
