import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const testimonials = [
  {
    id: 1,
    name: "Əli Məmmədov",
    role: "IT Mütəxəssisi",
    content: "Python kursundan sonra iş tapmaq çox asan oldu. Müəllimlər çox peşəkar və həmişə kömək etməyə hazırdırlar.",
    avatar: "ƏM",
  },
  {
    id: 2,
    name: "Günel Hüseynova",
    role: "Mühəndis",
    content: "Mühəndis təkmilləşdirmə proqramı sayəsində beynəlxalq sertifikat əldə etdim. Bu, karyeramda böyük dönüş nöqtəsi oldu.",
    avatar: "GH",
  },
  {
    id: 3,
    name: "Rəşad Əliyev",
    role: "Tələbə",
    content: "İngilis dili kursları sayəsində IELTS imtahanından yüksək bal topladım. Təşəkkürlər Ömürboyu Təhsil Məktəbi!",
    avatar: "RƏ",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text">Tələbələrimiz Nə Deyir?</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Məzunlarımızın və cari tələbələrimizin rəyləri.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="h-full card-gradient shadow-card hover:shadow-lg transition-all duration-300">
                <CardContent className="pt-6">
                  <Quote className="text-secondary/30 mb-4" size={40} />
                  <p className="text-foreground mb-6 italic">"{testimonial.content}"</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-secondary text-secondary-foreground">
                        {testimonial.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
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

export default TestimonialsSection;
