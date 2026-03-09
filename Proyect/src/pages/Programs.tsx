import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, Clock, Users, Star, ArrowRight, Filter } from "lucide-react";
import { Link } from "react-router-dom";

const allPrograms = [
  // Language Programs
  { id: 1, title: "İngilis Dili (A1-C1)", category: "Dil", division: "Dil Mərkəzi", duration: "6 ay", students: 150, rating: 4.8, description: "Müasir metodologiya ilə ingilis dilinin bütün səviyyələri üzrə təlim." },
  { id: 2, title: "IELTS Hazırlıq Kursu", category: "İmtahan", division: "Dil Mərkəzi", duration: "3 ay", students: 45, rating: 4.9, description: "IELTS imtahanına hazırlıq - Academic və General Training." },
  { id: 3, title: "TOEFL Hazırlıq Kursu", category: "İmtahan", division: "Dil Mərkəzi", duration: "3 ay", students: 30, rating: 4.7, description: "TOEFL iBT imtahanına tam hazırlıq proqramı." },
  { id: 4, title: "Alman Dili (A1-B2)", category: "Dil", division: "Dil Mərkəzi", duration: "8 ay", students: 45, rating: 4.6, description: "Goethe-İnstitut standartlarına uyğun alman dili kursu." },
  { id: 5, title: "Rus Dili", category: "Dil", division: "Dil Mərkəzi", duration: "4 ay", students: 35, rating: 4.5, description: "Praktiki rus dili kursu - danışıq və yazı bacarıqları." },
  { id: 6, title: "İşgüzar İngilis Dili", category: "Peşəkar", division: "Dil Mərkəzi", duration: "2 ay", students: 25, rating: 4.8, description: "Biznes mühitində ingilis dili - görüşlər, prezentasiyalar, yazışmalar." },
  
  // Engineering Programs
  { id: 7, title: "Python Proqramlaşdırma", category: "IT", division: "Mühəndislik", duration: "3 ay", students: 80, rating: 4.9, description: "Sıfırdan peşəkar səviyyəyə Python proqramlaşdırma kursu." },
  { id: 8, title: "Elektrik Mühəndisliyi Sertifikatı", category: "Mühəndislik", division: "Mühəndislik", duration: "4 ay", students: 60, rating: 4.7, description: "Praktiki elektrik mühəndisliyi bacarıqları və sertifikatlaşdırma." },
  { id: 9, title: "Robototexnika və Avtomatlaşdırma", category: "Mühəndislik", division: "Mühəndislik", duration: "6 ay", students: 40, rating: 4.8, description: "Robot dizaynı, proqramlaşdırması və sənaye avtomatlaşdırması." },
  { id: 10, title: "CAD/CAM Proqramları", category: "IT", division: "Mühəndislik", duration: "2 ay", students: 50, rating: 4.6, description: "AutoCAD, SolidWorks və digər mühəndislik proqramları." },
  { id: 11, title: "Maşınqayırma Təkmilləşdirmə", category: "Mühəndislik", division: "Mühəndislik", duration: "3 ay", students: 35, rating: 4.5, description: "Maşınqayırma texnologiyaları və müasir istehsal metodları." },
  
  // Academic Programs  
  { id: 12, title: "Qiyabi Bakalavr Proqramı", category: "Dərəcə", division: "Qiyabi Təhsil", duration: "4 il", students: 200, rating: 4.7, description: "Qiyabi formada bakalavr dərəcəsi almaq imkanı." },
  { id: 13, title: "Qiyabi Magistr Proqramı", category: "Dərəcə", division: "Qiyabi Təhsil", duration: "2 il", students: 100, rating: 4.8, description: "Qiyabi formada magistr dərəcəsi almaq imkanı." },
  { id: 14, title: "İkinci Ali Təhsil", category: "Dərəcə", division: "Qiyabi Təhsil", duration: "2-3 il", students: 75, rating: 4.6, description: "İkinci ixtisas üzrə ali təhsil almaq imkanı." },
];

const categories = ["Hamısı", "Dil", "İmtahan", "IT", "Mühəndislik", "Dərəcə", "Peşəkar"];

const ProgramsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Hamısı");

  const filteredPrograms = allPrograms.filter((program) => {
    const matchesSearch = program.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Hamısı" || program.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <Layout>
      {/* Hero */}
      <section className="py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Proqramlar və Kurslar</h1>
            <p className="text-xl text-white/90">
              Peşəkar inkişaf üçün geniş seçim imkanları.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search & Filters */}
      <section className="py-8 bg-muted/50 border-b border-border sticky top-20 z-40">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Proqram axtar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "accent-gradient text-accent-foreground" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6 text-muted-foreground">
            {filteredPrograms.length} proqram tapıldı
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
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
                    <Badge variant="outline" className="w-fit text-xs">{program.division}</Badge>
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
    </Layout>
  );
};

export default ProgramsPage;
