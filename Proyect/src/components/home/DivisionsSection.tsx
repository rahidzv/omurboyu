import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, GraduationCap, Wrench, Languages } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const divisions = [
  {
    id: "qiyabi",
    title: "Qiyabi və Təkrar Ali Təhsil Bölməsi",
    description: "Qiyabi təhsil almaq istəyən tələbələr və ali təhsillərini təkrar almaq istəyənlər üçün geniş imkanlar.",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    id: "muhendis",
    title: "Mühəndis Təkmilləşdirmə və Sertifikatlaşdırma",
    description: "Mühəndislik sahəsində peşəkar inkişaf, texniki bacarıqların artırılması və sertifikatlaşdırma proqramları.",
    icon: Wrench,
    color: "bg-orange-500",
  },
  {
    id: "dil",
    title: "Beynəlxalq Dil Mərkəzi",
    description: "Müasir metodologiya ilə xarici dil öyrənmə, beynəlxalq imtahanlara hazırlıq və sertifikatlaşdırma.",
    icon: Languages,
    color: "bg-green-500",
  },
];

const DivisionsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Bölmələrimiz</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Ömürboyu Təhsil Məktəbi üç əsas bölmədən ibarətdir və hər biri fərqli sahələrdə 
            peşəkar inkişaf imkanları təqdim edir.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {divisions.map((division, index) => (
            <motion.div
              key={division.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full card-gradient shadow-card hover:shadow-lg transition-all duration-300 group">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${division.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <division.icon className="text-white" size={28} />
                  </div>
                  <CardTitle className="text-xl">{division.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{division.description}</p>
                  <Link to="/divisions">
                    <Button variant="ghost" className="group/btn p-0 h-auto text-secondary hover:text-primary">
                      Ətraflı
                      <ArrowRight className="ml-2 group-hover/btn:translate-x-1 transition-transform" size={16} />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DivisionsSection;
