import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

const navItems = [
  { name: "Ana Səhifə", path: "/" },
  { name: "Haqqımızda", path: "/about" },
  { name: "Bölmələr", path: "/divisions" },
  { name: "Heyət", path: "/staff" },
  { name: "Proqramlar", path: "/programs" },
  { name: "Tədbirlər", path: "/events" },
  { name: "Sənədlər", path: "/documents" },
  { name: "Xəbərlər", path: "/news" },
  { name: "Əlaqə", path: "/contact" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-card">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src={logo} 
              alt="Ömürboyu Təhsil Məktəbi" 
              className="h-16 w-auto object-contain"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center gap-3">
            <Link to="/registration">
              <Button className="accent-gradient text-accent-foreground shadow-md hover:shadow-lg transition-shadow">
                Qeydiyyat
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-card border-t border-border"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === item.path
                      ? "bg-primary text-primary-foreground"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link to="/registration" onClick={() => setIsOpen(false)}>
                <Button className="w-full mt-2 accent-gradient text-accent-foreground">
                  Qeydiyyat
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
