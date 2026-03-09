import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone } from "lucide-react";
import directorImage from "@/assets/director.png";

const staffByDivision = {
  "Rəhbərlik": [
    {
      name: "Vəfa Məhərrəmova",
      title: "Ömürboyu Təhsil Məktəbinin Direktoru",
      image: directorImage,
      bio: "Vəfa Məhərrəmova Ömürboyu Təhsil Məktəbinin direktoru olaraq məktəbin strateji inkişafını idarə edir. Peşəkar təhsil sahəsində geniş təcrübəyə malik olan Vəfa xanım, məktəbin beynəlxalq standartlara uyğun fəaliyyət göstərməsini təmin edir.",
    },
  ],
  "Qiyabi və Təkrar Ali Təhsil Bölməsi": [
    { name: "Günel Məmmədli", title: "Bölmə Müdiri", image: null, bio: "" },
    { name: "", title: "Akademik Məsləhətçi", image: null, bio: "" },
    { name: "", title: "Akademik Məsləhətçi", image: null, bio: "" },
    { name: "", title: "Akademik Məsləhətçi", image: null, bio: "" },
    { name: "", title: "Operator", image: null, bio: "" },
  ],
  "Mühəndis Təkmilləşdirmə və Sertifikatlaşdırma Bölməsi": [
    { name: "Elvin Muradzadə", title: "Bölmə Müdiri", image: null, bio: "" },
    { name: "", title: "Mühəndis Təkmilləşdirmə üzrə Mütəxəssis", image: null, bio: "" },
    { name: "", title: "Peşəkar İnkişaf və Sertifikatlaşdırma üzrə Mütəxəssis", image: null, bio: "" },
  ],
  "Beynəlxalq Dil Mərkəzi": [
    { name: "Lalə Rüstəmova", title: "Mərkəz Müdiri", image: null, bio: "" },
    { name: "", title: "Təlim və Tədrisin Təşkili üzrə Mütəxəssis", image: null, bio: "" },
    { name: "", title: "İmtahanların Təşkili üzrə Mütəxəssis", image: null, bio: "" },
  ],
};

const StaffPage = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Heyətimiz</h1>
            <p className="text-xl text-white/90">
              Peşəkar komandamız sizə xidmət göstərməkdən məmnundur.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Staff Sections */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          {Object.entries(staffByDivision).map(([division, staff], divIndex) => (
            <motion.div
              key={division}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: divIndex * 0.1 }}
              className="mb-16 last:mb-0"
            >
              <h2 className="text-2xl font-bold gradient-text mb-8">{division}</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {staff.map((member, index) => (
                  <Card key={index} className="card-gradient shadow-card overflow-hidden group">
                    <CardContent className="p-0">
                      {member.image ? (
                        <div className="aspect-[4/3] overflow-hidden">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                      ) : (
                        <div className="aspect-[4/3] bg-muted flex items-center justify-center">
                          <div className="w-20 h-20 rounded-full bg-secondary/20 flex items-center justify-center">
                            <span className="text-3xl text-secondary">👤</span>
                          </div>
                        </div>
                      )}
                      <div className="p-6">
                        <h3 className="font-bold text-lg mb-1">
                          {member.name || "—"}
                        </h3>
                        <Badge variant="secondary" className="mb-3">{member.title}</Badge>
                        {member.bio && (
                          <p className="text-sm text-muted-foreground line-clamp-3">{member.bio}</p>
                        )}
                        {member.name && (
                          <div className="flex gap-3 mt-4 pt-4 border-t border-border">
                            <button className="p-2 rounded-lg bg-muted hover:bg-secondary/10 transition-colors">
                              <Mail size={18} className="text-secondary" />
                            </button>
                            <button className="p-2 rounded-lg bg-muted hover:bg-secondary/10 transition-colors">
                              <Phone size={18} className="text-secondary" />
                            </button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
};

export default StaffPage;
