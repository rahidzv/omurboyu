import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const CTASection = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary opacity-95" />
      <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Peşəkar İnkişaf Səyahətinizə Başlayın
            </h2>
            <p className="text-white/90 text-lg mb-8">
              Yeni bacarıqlar öyrənin, sertifikat əldə edin və karyeranızı bir addım irəli aparın.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-8"
          >
            <Link to="/registration">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90 shadow-lg group">
                İndi Qeydiyyatdan Keç
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Bizimlə Əlaqə
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="pt-8 border-t border-white/20"
          >
            <p className="text-white/80 text-sm mb-4">Xəbər bülletenimizə abunə olun</p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <div className="relative flex-1">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
                <Input 
                  type="email" 
                  placeholder="E-poçt ünvanınız" 
                  className="pl-10 bg-white/10 border-white/30 text-white placeholder:text-white/60"
                />
              </div>
              <Button className="bg-white text-primary hover:bg-white/90">
                Abunə Ol
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
