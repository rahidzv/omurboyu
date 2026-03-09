import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, Target, Eye, Users, Building, Calendar } from "lucide-react";
import directorImage from "@/assets/director.png";
import campusImage from "@/assets/campus.png";

const AboutPage = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={campusImage} alt="MDU Kampus" className="w-full h-full object-cover" />
          <div className="absolute inset-0 hero-gradient" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Haqqımızda</h1>
            <p className="text-xl text-white/90">
              Mingəçevir Dövlət Universiteti nəzdində fəaliyyət göstərən Ömürboyu Təhsil Məktəbi 
              peşəkar inkişaf və davamlı öyrənmə sahəsində lider təşkilatdır.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full card-gradient shadow-card">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center mb-4">
                    <Target className="text-primary-foreground" size={28} />
                  </div>
                  <CardTitle className="text-2xl">Missiyamız</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Ömürboyu Təhsil Məktəbinin missiyası cəmiyyətin bütün üzvlərinə, xüsusilə 
                    peşəkarlar və tələbələrə keyfiyyətli təhsil və inkişaf imkanları təqdim etməkdir. 
                    Biz müasir texnologiyalar və beynəlxalq standartlar əsasında öyrənmə mühiti 
                    yaradaraq, fərdlərin peşəkar bacarıqlarını artırmağı və rəqabət qabiliyyətini 
                    gücləndirməyi hədəfləyirik.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="h-full card-gradient shadow-card">
                <CardHeader>
                  <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4">
                    <Eye className="text-secondary-foreground" size={28} />
                  </div>
                  <CardTitle className="text-2xl">Vizyonumuz</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    Regionda ömürboyu təhsil sahəsində lider və nümunəvi təşkilat olmaq. 
                    İnnovasiya və keyfiyyət prinsiplərinə sadiq qalaraq, beynəlxalq səviyyədə 
                    tanınan təhsil proqramları təqdim etmək. Tələbə və peşəkarların karyera 
                    uğurlarına töhfə verən, cəmiyyətin inkişafına xidmət edən bir qurum olmaq.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 rounded-xl bg-primary flex items-center justify-center">
                <Calendar className="text-primary-foreground" size={28} />
              </div>
              <h2 className="text-3xl font-bold gradient-text">Tariximiz</h2>
            </div>
            <div className="space-y-6 text-muted-foreground leading-relaxed">
              <p>
                Ömürboyu Təhsil Məktəbi Mingəçevir Dövlət Universitetinin strateji təşəbbüsü olaraq 
                yaradılmışdır. Məktəb qısa müddətdə regionda ən etibarlı təhsil mərkəzlərindən birinə 
                çevrilmişdir.
              </p>
              <p>
                İlk illərindən etibarən məktəb yüzlərlə tələbəyə xidmət göstərmiş, onların peşəkar 
                inkişafına və karyera uğurlarına töhfə vermişdir. Bu gün məktəb üç əsas bölmədə 
                fəaliyyət göstərir: Qiyabi və Təkrar Ali Təhsil, Mühəndis Təkmilləşdirmə və 
                Sertifikatlaşdırma, Beynəlxalq Dil Mərkəzi.
              </p>
              <p>
                Beynəlxalq standartlara uyğun proqramlar, təcrübəli müəllimlər və müasir 
                infrastruktur məktəbin əsas üstünlükləridir.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Director Message */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-5xl mx-auto"
          >
            <h2 className="text-3xl font-bold gradient-text text-center mb-12">Direktorun Müraciəti</h2>
            <Card className="card-gradient shadow-lg overflow-hidden">
              <CardContent className="p-0">
                <div className="grid md:grid-cols-3">
                  <div className="md:col-span-1">
                    <img 
                      src={directorImage} 
                      alt="Vəfa Məhərrəmova" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="md:col-span-2 p-8 flex flex-col justify-center">
                    <h3 className="text-2xl font-bold mb-2">Vəfa Məhərrəmova</h3>
                    <p className="text-secondary font-medium mb-6">Ömürboyu Təhsil Məktəbinin Direktoru</p>
                    <blockquote className="text-muted-foreground italic leading-relaxed">
                      "Ömürboyu Təhsil Məktəbi olaraq bizim əsas məqsədimiz hər kəsə keyfiyyətli təhsil 
                      və inkişaf imkanları təqdim etməkdir. Biz inanırıq ki, öyrənmə heç vaxt 
                      bitmir - bu, həyat boyu davam edən bir səyahətdir. Sizləri bu səyahətdə 
                      müşayiət etmək şərəfdir. Bizimlə birlikdə yeni bacarıqlar öyrənin, 
                      karyeranızı inkişaf etdirin və gələcəyinizi formalaşdırın."
                    </blockquote>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold gradient-text mb-4">Nailiyyətlərimiz</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              İllərin təcrübəsi, minlərlə məzun və beynəlxalq tanınma.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Users, value: "1000+", label: "Məzun" },
              { icon: Award, value: "50+", label: "Proqram" },
              { icon: Building, value: "15+", label: "İl Təcrübə" },
              { icon: Target, value: "95%", label: "Məmnuniyyət" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center card-gradient shadow-card">
                  <CardContent className="pt-6">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <stat.icon className="text-secondary" size={28} />
                    </div>
                    <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                    <div className="text-muted-foreground">{stat.label}</div>
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

export default AboutPage;
