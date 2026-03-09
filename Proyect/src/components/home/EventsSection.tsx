import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    id: 1,
    title: "İdeathon – Fikir yarışması",
    date: "2025-02-15",
    location: "MDU Kampus",
    category: "Yarışma",
    description: "2–3 saatlıq sürətli fikir generasiya yarışıdır. Komandalar qısa müddətdə texnoloji və sosial problemlərə yaradıcı həllər təqdim edir.",
  },
  {
    id: 2,
    title: "RoboDay – Robot Yarışı",
    date: "2025-03-10",
    location: "Mühəndislik Fakültəsi",
    category: "Robototexnika",
    description: "Tələbələr öz robotlarını dizayn edir və xətt izləyici, labirint həll edən robot yarışlarında iştirak edirlər.",
  },
  {
    id: 3,
    title: "Startap Həftəsi",
    date: "2025-04-01",
    location: "İnnovasiya Mərkəzi",
    category: "Startap",
    description: "7 günlük intensiv startap təlimləri və prototip hazırlığı marafonu.",
  },
];

const EventsSection = () => {
  return (
    <section className="py-20">
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
              <span className="gradient-text">Qarşıdan Gələn Tədbirlər</span>
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Seminarlar, workshoplar və yarışmalar haqqında məlumat əldə edin.
            </p>
          </div>
          <Link to="/events" className="mt-4 md:mt-0">
            <Button variant="outline" className="group">
              Bütün Tədbirlər
              <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={16} />
            </Button>
          </Link>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full card-gradient shadow-card hover:shadow-lg transition-all duration-300 overflow-hidden group">
                <div className="h-2 accent-gradient" />
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{event.category}</Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-secondary transition-colors">
                    {event.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm">{event.description}</p>
                  <div className="flex flex-col gap-2 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={16} className="text-secondary" />
                      <span>{new Date(event.date).toLocaleDateString('az-AZ', { 
                        day: 'numeric', 
                        month: 'long', 
                        year: 'numeric' 
                      })}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={16} className="text-secondary" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
