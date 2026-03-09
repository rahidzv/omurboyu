import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Users, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const events = [
  {
    id: 1,
    title: "İdeathon – Fikir yarışması",
    date: "2025-02-15",
    time: "10:00 - 13:00",
    location: "MDU Kampus",
    category: "Yarışma",
    participants: "50+ iştirakçı",
    description: "2–3 saatlıq sürətli fikir generasiya yarışıdır. Komandalar qısa müddətdə texnoloji və sosial problemlərə yaradıcı həllər təqdim edir.",
    benefits: [
      "Tələbələrin kreativ düşünməsi inkişaf edir",
      "Startap və innovasiya yönümlü ideyalar yaranır",
      "Komanda quruculuğu, liderlik və dizayn düşüncə bacarıqları formalaşır",
    ],
    impact: "İl ərzində reallaşacaq layihələr üçün yeni ideyalar toplanır. Müxtəlif ixtisaslardan tələbələr bir komandada işləməyi öyrənir.",
  },
  {
    id: 2,
    title: "RoboDay – Robot Yarışı",
    date: "2025-03-10",
    time: "09:00 - 17:00",
    location: "Mühəndislik Fakültəsi",
    category: "Robototexnika",
    participants: "30+ komanda",
    description: "Tələbələr öz robotlarını dizayn edir və xətt izləyici, labirint həll edən və ya döyüşən robot yarışlarında iştirak edirlər.",
    benefits: [
      "Robototexnika üzrə praktiki vərdişlər yaranır",
      "STEM fənlərinin inteqrativ şəkildə tətbiqini gücləndirir",
      "Mühəndislik ixtisasına marağı artırır",
    ],
    impact: "Universitetin texniki imici güclənir. Məktəblilər dəvət edilə bilər: MDU-nun regiondakı liderliyi artır.",
  },
  {
    id: 3,
    title: "Startap Həftəsi",
    date: "2025-04-01",
    time: "09:00 - 18:00",
    location: "İnnovasiya Mərkəzi",
    category: "Startap",
    participants: "100+ iştirakçı",
    description: "7 günlük intensiv startap təlimləri və prototip hazırlığı marafonu.",
    benefits: [
      "Tələbələr ideyalarını biznes modelinə çevirə bilir",
      "İnvestorlarla görüş imkanı yaranır",
      "Real layihələrin sayı artır",
    ],
    impact: "MDU-nun innovasiya mərkəzi kimi tanınması. Startap müsabiqələrinə göndərilə biləcək layihələr hazırlanır.",
  },
  {
    id: 4,
    title: "İxtiraçılar Günü – Innovation Fair",
    date: "2025-05-15",
    time: "10:00 - 16:00",
    location: "MDU Mərkəzi Bina",
    category: "Sərgi",
    participants: "25-50 layihə",
    description: "Tələbələrin hazırladıqları mühəndislik ixtiraları, cihaz prototipləri və innovativ layihələr universitetdə sərgilənir.",
    benefits: [
      "Tələbələrin 'yaradıcı mühəndis' kimliyi güclənir",
      "Universitetin innovasiya mərkəzi imici yüksəlir",
      "Partnyor şirkətlər buradan kadr seçə bilir",
    ],
    impact: "25–50 yeni texnoloji layihə ortaya çıxır. Şirkət-tələbə görüşləri artır.",
  },
  {
    id: 5,
    title: "Engineering Bootcamp",
    date: "2025-06-20",
    time: "09:00 - 17:00",
    location: "Mühəndislik Laboratoriyası",
    category: "Təlim",
    participants: "60 tələbə",
    description: "Elektronika, proqramlaşdırma, enerji və robototexnika üzrə intensiv texniki düşərgə.",
    benefits: [
      "Mühəndislik tələbələri real laboratoriya bacarıqları qazanır",
      "Teoriya–praktika boşluğu aradan qalxır",
      "Sertifikat proqramına çevrilə bilər",
    ],
    impact: "60 tələbə real texniki bacarıq əldə edir. Sənayenin tələb etdiyi kompetensiyalar öyrədilir.",
  },
  {
    id: 6,
    title: "Bir Gün Mühəndis Proqramı",
    date: "2025-07-10",
    time: "08:00 - 18:00",
    location: "Partnyor Şirkətlər",
    category: "Təcrübə",
    participants: "80 tələbə",
    description: "Tələbələr real şirkətə gedir, 1 gün mühəndis kimi çalışır.",
    benefits: [
      "Tələbələr peşələri yerində görür",
      "Şirkətlərlə əlaqələr genişlənir",
      "Təcrübəyə cəlb olunma faizini artırır",
    ],
    impact: "80 tələbənin real iş mühiti ilə tanışlığı. Motivasiya yüksəlir. Karyera istiqaməti dəqiqləşir.",
  },
  {
    id: 7,
    title: "Açıq Laboratoriya Həftəsi",
    date: "2025-09-01",
    time: "09:00 - 18:00",
    location: "Bütün Laboratoriyalar",
    category: "Açıq Qapı",
    participants: "300+ tələbə",
    description: "Bütün mühəndislik laboratoriyaları tələbələr üçün açılır.",
    benefits: [
      "Tələbələr avadanlıqlara sərbəst çıxış əldə edir",
      "Yeni tələbələrə laboratoriya imkanları tanıdılır",
      "Mühəndislik mərkəzinə maraq artır",
    ],
    impact: "300 tələbə real praktiki təcrübə görür. Laboratoriyalar daha effektiv istifadə olunur.",
  },
  {
    id: 8,
    title: "Dron Yarışı – Drone Racing Day",
    date: "2025-10-15",
    time: "10:00 - 16:00",
    location: "MDU Stadionu",
    category: "Yarışma",
    participants: "15 pilot, 10 dron",
    description: "FPV və avtomatik pilotla idarə olunan dron yarışları.",
    benefits: [
      "Aerokosmik və dron mühəndisliyinə marağı artırır",
      "Texnoloji idman tədbiri kimi MDU-ya imic qazandırır",
    ],
    impact: "Media diqqəti. Mühəndislik mərkəzi üçün PR gücü.",
  },
  {
    id: 9,
    title: "MDU Tech Summit",
    date: "2025-11-20",
    time: "09:00 - 18:00",
    location: "Konqres Zalı",
    category: "Konfrans",
    participants: "500+ iştirakçı",
    description: "Böyük texnoloji konfrans, sərgi və panel müzakirələr.",
    benefits: [
      "MDU-nu ölkənin əsas texnologiya oyunçularından biri kimi təqdim etmək",
      "Xarici universitetlərlə birgə çıxışlar",
    ],
    impact: "12 spiker, 500 iştirakçı. Universitetin milli və regional nüfuzunun artması.",
  },
  {
    id: 10,
    title: "Cyber Defense Challenge",
    date: "2025-12-05",
    time: "09:00 - 21:00",
    location: "İT Laboratoriyası",
    category: "Kibertəhlükəsizlik",
    participants: "20 komanda",
    description: "Kibertəhlükəsizlik üzrə Capture The Flag müsabiqəsi.",
    benefits: [
      "Kiber sahə ən sürətlə inkişaf edən istiqamətdir",
      "İT və kiber ixtisaslarda tələbə kompetensiyalarını artırır",
    ],
    impact: "Kiber laboratoriyanın nüfuzu artır. Tələbələr real təhlükəsizlik problemlərini həll edir.",
  },
  {
    id: 11,
    title: "Engineering Innovation Awards",
    date: "2025-12-20",
    time: "18:00 - 21:00",
    location: "Böyük Akt Zalı",
    category: "Mükafat",
    participants: "10 kateqoriya",
    description: "İlin ən innovativ tələbə, müəllim və layihələrinin təltif olunması.",
    benefits: [
      "Tələbələri motivasiya edir",
      "Universitetdə innovasiya mədəniyyəti formalaşdırır",
    ],
    impact: "Media və sosial şəbəkələrdə tanıtım. Növbəti il üçün motivasiya.",
  },
];

const EventsPage = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Tədbirlər</h1>
            <p className="text-xl text-white/90">
              Seminarlar, workshoplar, yarışmalar və konfranslar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Events Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="space-y-8">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
              >
                <Card className="card-gradient shadow-card overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-2 accent-gradient" />
                  <CardContent className="p-6 md:p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                      {/* Main Info */}
                      <div className="md:col-span-2 space-y-4">
                        <div className="flex flex-wrap items-center gap-3">
                          <Badge className="accent-gradient text-accent-foreground">{event.category}</Badge>
                          <Badge variant="outline">{event.participants}</Badge>
                        </div>
                        <h3 className="text-2xl font-bold">{event.title}</h3>
                        <p className="text-muted-foreground">{event.description}</p>
                        
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">Faydaları:</h4>
                          <ul className="space-y-1">
                            {event.benefits.map((benefit, idx) => (
                              <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground">
                                <span className="text-secondary mt-1">•</span>
                                {benefit}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <p className="text-sm text-muted-foreground italic">{event.impact}</p>
                      </div>

                      {/* Side Info */}
                      <div className="space-y-4 md:border-l md:border-border md:pl-6">
                        <div className="flex items-center gap-3 text-sm">
                          <Calendar className="text-secondary shrink-0" size={18} />
                          <span>{new Date(event.date).toLocaleDateString('az-AZ', { 
                            day: 'numeric', 
                            month: 'long', 
                            year: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Clock className="text-secondary shrink-0" size={18} />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <MapPin className="text-secondary shrink-0" size={18} />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-sm">
                          <Users className="text-secondary shrink-0" size={18} />
                          <span>{event.participants}</span>
                        </div>
                        <Link to="/registration">
                          <Button className="w-full mt-4 accent-gradient text-accent-foreground group">
                            Qeydiyyat
                            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
                          </Button>
                        </Link>
                      </div>
                    </div>
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

export default EventsPage;
