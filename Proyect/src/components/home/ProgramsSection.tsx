import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Users, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const programs = [
  {
    id: 1,
    title: "İngilis Dili (A1-C1)",
    category: "Dil",
    duration: "6 ay",
    students: 150,
    rating: 4.8,
    description: "Müasir metodologiya ilə ingilis dilinin bütün səviyyələri üzrə təlim.",
  },
  {
    id: 2,
    title: "Python Proqramlaşdırma",
    category: "IT",
    duration: "3 ay",
    students: 80,
    rating: 4.9,
    description: "Sıfırdan peşəkar səviyyəyə Python proqramlaşdırma kursu.",
  },
  {
    id: 3,
    title: "Elektrik Mühəndisliyi Sertifikatı",
    category: "Mühəndislik",
    duration: "4 ay",
    students: 60,
    rating: 4.7,
    description: "Praktiki elektrik mühəndisliyi bacarıqları və sertifikatlaşdırma.",
  },
  {
    id: 4,
    title: "Alman Dili (A1-B2)",
    category: "Dil",
    duration: "8 ay",
    students: 45,
    rating: 4.6,
    description: "Goethe-İnstitut standartlarına uyğun alman dili kursu.",
  },
];

const ProgramsSection = () => {
  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Populyar Proqramlar</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Peşəkar inkişaf üçün ən çox seçilən təlim proqramlarımız.
            </p>
          </div>
          <Link to="/programs" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              Bütün Proqramlar
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {programs.map((program, index) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full card-gradient shadow-card hover:shadow-lg transition-all duration-300 group">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{program.category}</Badge>
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={14} fill="currentColor" />
                      <span className="text-xs font-medium">{program.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg group-hover:text-secondary transition-colors">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm line-clamp-2">{program.description}</p>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock size={14} className="text-secondary" />
                      <span>{program.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users size={14} className="text-secondary" />
                      <span>{program.students} tələbə</span>
                    </div>
                  </div>
                  <Link to="/registration">
                    <Button variant="ghost" className="w-full group/btn text-secondary hover:text-primary hover:bg-secondary/10">
                      Qeydiyyat
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

export default ProgramsSection;
