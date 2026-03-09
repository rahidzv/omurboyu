import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="space-y-4">
            <img src={logo} alt="Ömürboyu Təhsil Məktəbi" className="h-20 w-auto brightness-0 invert" />
            <p className="text-primary-foreground/80 text-sm leading-relaxed">
              Mingəçevir Dövlət Universiteti nəzdində fəaliyyət göstərən Ömürboyu Təhsil Məktəbi 
              peşəkar inkişaf və davamlı öyrənmə imkanları təqdim edir.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="#" className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Sürətli Keçidlər</h4>
            <ul className="space-y-2">
              {[
                { name: "Haqqımızda", path: "/about" },
                { name: "Bölmələr", path: "/divisions" },
                { name: "Proqramlar", path: "/programs" },
                { name: "Tədbirlər", path: "/events" },
                { name: "Xəbərlər", path: "/news" },
              ].map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path} 
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisions */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Bölmələrimiz</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/divisions" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Qiyabi və Təkrar Ali Təhsil
                </Link>
              </li>
              <li>
                <Link to="/divisions" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Mühəndis Təkmilləşdirmə
                </Link>
              </li>
              <li>
                <Link to="/divisions" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                  Beynəlxalq Dil Mərkəzi
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Əlaqə</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-primary-foreground/80">
                <MapPin size={18} className="shrink-0 mt-0.5" />
                <span>Mingəçevir şəhəri, Azərbaycan</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Phone size={18} className="shrink-0" />
                <span>+994 XX XXX XX XX</span>
              </li>
              <li className="flex items-center gap-3 text-sm text-primary-foreground/80">
                <Mail size={18} className="shrink-0" />
                <span>info@mdu.edu.az</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-primary-foreground/60">
              © 2025 Ömürboyu Təhsil Məktəbi - Mingəçevir Dövlət Universiteti. Bütün hüquqlar qorunur.
            </p>
            <div className="flex gap-6">
              <Link to="/faq" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                FAQ
              </Link>
              <Link to="/resources" className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Resurslar
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
