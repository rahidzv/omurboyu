import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  GraduationCap, Wrench, Languages, Users, BookOpen, Award, 
  CheckCircle, ArrowRight, Headphones, Book, Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";

const divisions = [
  {
    id: "qiyabi",
    title: "Qiyabi və Təkrar Ali Təhsil Bölməsi",
    shortTitle: "Qiyabi Təhsil",
    icon: GraduationCap,
    color: "bg-blue-500",
    mission: "Əmək fəaliyyəti ilə məşğul olan vətəndaşlara ali təhsil almaq və ixtisaslarını təkmilləşdirmək imkanı yaratmaq.",
    overview: "Bu bölmə qiyabi təhsil formasında bakalavr və magistr proqramları, həmçinin ikinci ali təhsil almaq istəyən şəxslər üçün xidmət göstərir. Çevik təhsil qrafiki, distant öyrənmə imkanları və fərdi yanaşma bölmənin əsas xüsusiyyətləridir.",
    features: [
      "Qiyabi bakalavr və magistr proqramları",
      "İkinci ali təhsil imkanı",
      "Çevik təhsil qrafiki",
      "Online və offline dərslər",
      "Fərdi akademik məsləhət",
      "Elektron kitabxana resursları"
    ],
    staff: [
      { title: "Bölmə Müdiri", count: 1 },
      { title: "Akademik Məsləhətçi", count: 3 },
      { title: "Operator", count: 1 },
    ],
    programs: [
      { name: "Qiyabi Bakalavr Proqramı", category: "Dərəcə", duration: "4 il" },
      { name: "Qiyabi Magistr Proqramı", category: "Dərəcə", duration: "2 il" },
      { name: "İkinci Ali Təhsil", category: "Dərəcə", duration: "2-3 il" },
      { name: "Peşə Yüksəltmə Kursları", category: "Sertifikat", duration: "3-6 ay" },
    ],
    services: [
      { icon: Headphones, name: "Akademik Məsləhət" },
      { icon: Book, name: "Online Resurslar" },
      { icon: Briefcase, name: "Karyera Dəstəyi" },
    ],
  },
  {
    id: "muhendis",
    title: "Mühəndis Təkmilləşdirmə və Sertifikatlaşdırma Bölməsi",
    shortTitle: "Mühəndislik",
    icon: Wrench,
    color: "bg-orange-500",
    mission: "Mühəndislik sahəsində çalışan mütəxəssislərin peşəkar bacarıqlarını artırmaq və beynəlxalq standartlara uyğun sertifikatlaşdırma xidmətləri göstərmək.",
    overview: "Bölmə mühəndislik sahəsində texniki təkmilləşdirmə proqramları, praktiki workshoplar və beynəlxalq sertifikatlaşdırma xidmətləri təqdim edir. Sənayenin tələblərinə uyğun hazırlanmış proqramlar peşəkarların rəqabət qabiliyyətini artırır.",
    features: [
      "Praktiki mühəndislik təlimləri",
      "Beynəlxalq sertifikatlaşdırma",
      "Layihə əsaslı öyrənmə",
      "Sənaye tərəfdaşlıqları",
      "Laboratoriya təcrübəsi",
      "Texniki innovasiya proqramları"
    ],
    staff: [
      { title: "Bölmə Müdiri", count: 1 },
      { title: "Mühəndis Təkmilləşdirmə üzrə Mütəxəssis", count: 1 },
      { title: "Peşəkar İnkişaf və Sertifikatlaşdırma üzrə Mütəxəssis", count: 1 },
    ],
    programs: [
      { name: "Elektrik Mühəndisliyi Sertifikatı", category: "Sertifikat", duration: "4 ay" },
      { name: "Maşınqayırma Təkmilləşdirmə", category: "Sertifikat", duration: "3 ay" },
      { name: "Robototexnika və Avtomatlaşdırma", category: "Sertifikat", duration: "6 ay" },
      { name: "CAD/CAM Proqramları", category: "Sertifikat", duration: "2 ay" },
      { name: "Python ilə Mühəndislik Hesablamaları", category: "Sertifikat", duration: "3 ay" },
    ],
    services: [
      { icon: Headphones, name: "Texniki Konsultasiya" },
      { icon: Book, name: "Laboratoriya İstifadəsi" },
      { icon: Briefcase, name: "Sənaye Əlaqəsi" },
    ],
  },
  {
    id: "dil",
    title: "Beynəlxalq Dil Mərkəzi",
    shortTitle: "Dil Mərkəzi",
    icon: Languages,
    color: "bg-green-500",
    mission: "Beynəlxalq standartlara uyğun xarici dil tədrisi həyata keçirmək və tələbələri beynəlxalq dil imtahanlarına hazırlamaq.",
    overview: "Mərkəz müasir metodologiya ilə xarici dil kursları, beynəlxalq imtahanlara hazırlıq proqramları və sertifikatlaşdırma xidmətləri təqdim edir. Təcrübəli müəllimlər, kiçik qruplar və interaktiv dərslər öyrənmə prosesini effektiv edir.",
    features: [
      "İngilis, Alman, Rus dili kursları",
      "IELTS, TOEFL hazırlığı",
      "Goethe-Sertifikat hazırlığı",
      "Kiçik qrup dərsləri (8-12 nəfər)",
      "Native spikerlər ilə praktika",
      "Online və əyani formatlar"
    ],
    staff: [
      { title: "Mərkəz Müdiri", count: 1 },
      { title: "Təlim və Tədrisin Təşkili üzrə Mütəxəssis", count: 1 },
      { title: "İmtahanların Təşkili üzrə Mütəxəssis", count: 1 },
    ],
    programs: [
      { name: "İngilis Dili (A1-C1)", category: "Dil", duration: "6 ay" },
      { name: "IELTS Hazırlıq Kursu", category: "İmtahan", duration: "3 ay" },
      { name: "TOEFL Hazırlıq Kursu", category: "İmtahan", duration: "3 ay" },
      { name: "Alman Dili (A1-B2)", category: "Dil", duration: "8 ay" },
      { name: "Rus Dili", category: "Dil", duration: "4 ay" },
      { name: "İşgüzar İngilis Dili", category: "Peşəkar", duration: "2 ay" },
    ],
    services: [
      { icon: Headphones, name: "Səviyyə Testi" },
      { icon: Book, name: "Elektron Resurslar" },
      { icon: Briefcase, name: "İmtahan Qeydiyyatı" },
    ],
  },
];

const DivisionsPage = () => {
  const [activeTab, setActiveTab] = useState("qiyabi");

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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Bölmələrimiz</h1>
            <p className="text-xl text-white/90">
              Üç əsas bölmədə peşəkar inkişaf və təhsil imkanları.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Divisions Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid grid-cols-1 md:grid-cols-3 h-auto bg-muted/50 p-2 gap-2">
              {divisions.map((div) => (
                <TabsTrigger
                  key={div.id}
                  value={div.id}
                  className="flex items-center gap-3 p-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  <div className={`w-10 h-10 rounded-lg ${div.color} flex items-center justify-center`}>
                    <div.icon className="text-white" size={20} />
                  </div>
                  <span className="font-medium">{div.shortTitle}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {divisions.map((division) => (
              <TabsContent key={division.id} value={division.id} className="space-y-8">
                {/* Division Header */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="card-gradient shadow-card overflow-hidden">
                    <div className={`h-2 ${division.color}`} />
                    <CardContent className="pt-8">
                      <div className="flex items-start gap-6">
                        <div className={`w-16 h-16 rounded-xl ${division.color} flex items-center justify-center shrink-0`}>
                          <division.icon className="text-white" size={32} />
                        </div>
                        <div>
                          <h2 className="text-2xl md:text-3xl font-bold mb-4">{division.title}</h2>
                          <p className="text-muted-foreground leading-relaxed">{division.overview}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                <div className="grid lg:grid-cols-3 gap-8">
                  {/* Mission & Features */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Mission */}
                    <Card className="card-gradient shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Award className="text-secondary" size={24} />
                          Missiyamız
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground leading-relaxed">{division.mission}</p>
                      </CardContent>
                    </Card>

                    {/* Features */}
                    <Card className="card-gradient shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <CheckCircle className="text-secondary" size={24} />
                          Əsas Xüsusiyyətlər
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid md:grid-cols-2 gap-3">
                          {division.features.map((feature, idx) => (
                            <div key={idx} className="flex items-center gap-2">
                              <CheckCircle className="text-secondary shrink-0" size={16} />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Programs */}
                    <Card className="card-gradient shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="text-secondary" size={24} />
                          Proqramlar və Kurslar
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {division.programs.map((program, idx) => (
                            <div 
                              key={idx} 
                              className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                            >
                              <div className="flex items-center gap-4">
                                <div>
                                  <div className="font-medium">{program.name}</div>
                                  <div className="text-sm text-muted-foreground">Müddət: {program.duration}</div>
                                </div>
                              </div>
                              <div className="flex items-center gap-3">
                                <Badge variant="secondary">{program.category}</Badge>
                                <Link to="/registration">
                                  <Button size="sm" variant="ghost" className="text-secondary">
                                    Qeydiyyat
                                    <ArrowRight size={14} className="ml-1" />
                                  </Button>
                                </Link>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Staff */}
                    <Card className="card-gradient shadow-card">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Users className="text-secondary" size={24} />
                          Heyət Strukturu
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {division.staff.map((member, idx) => (
                            <div key={idx} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                              <span className="text-sm">{member.title}</span>
                              <Badge variant="outline">{member.count} nəfər</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Services */}
                    <Card className="card-gradient shadow-card">
                      <CardHeader>
                        <CardTitle className="text-lg">Xidmətlər</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {division.services.map((service, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                              <service.icon className="text-secondary" size={18} />
                              <span className="text-sm">{service.name}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* CTA */}
                    <Card className="bg-gradient-to-br from-primary to-secondary text-primary-foreground">
                      <CardContent className="pt-6 text-center">
                        <h3 className="font-bold text-lg mb-2">Qoşulmaq İstəyirsiniz?</h3>
                        <p className="text-primary-foreground/80 text-sm mb-4">
                          Proqramlarımız haqqında ətraflı məlumat alın.
                        </p>
                        <Link to="/registration">
                          <Button className="bg-white text-primary hover:bg-white/90 w-full">
                            Qeydiyyat
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default DivisionsPage;
