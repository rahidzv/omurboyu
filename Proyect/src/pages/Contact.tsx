import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { toast } from "sonner";

const ContactPage = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Mesajınız göndərildi!");
  };

  return (
    <Layout>
      <section className="py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Əlaqə</h1>
            <p className="text-xl text-white/90">Bizimlə əlaqə saxlayın.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold mb-6">Əlaqə Məlumatları</h2>
              <div className="space-y-6">
                {[
                  { icon: MapPin, title: "Ünvan", content: "Mingəçevir şəhəri, MDU Kampusu" },
                  { icon: Phone, title: "Telefon", content: "+994 XX XXX XX XX" },
                  { icon: Mail, title: "E-poçt", content: "info@mdu.edu.az" },
                  { icon: Clock, title: "İş Saatları", content: "B.e - Cümə: 09:00 - 18:00" },
                ].map((item, idx) => (
                  <Card key={idx} className="card-gradient shadow-card">
                    <CardContent className="flex items-center gap-4 pt-6">
                      <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                        <item.icon className="text-secondary" size={24} />
                      </div>
                      <div>
                        <div className="font-semibold">{item.title}</div>
                        <div className="text-muted-foreground">{item.content}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
              <Card className="card-gradient shadow-card">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-6">Mesaj Göndər</h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Ad</Label>
                        <Input placeholder="Adınız" required />
                      </div>
                      <div className="space-y-2">
                        <Label>E-poçt</Label>
                        <Input type="email" placeholder="email@example.com" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Mövzu</Label>
                      <Input placeholder="Mövzu" required />
                    </div>
                    <div className="space-y-2">
                      <Label>Mesaj</Label>
                      <Textarea placeholder="Mesajınız..." className="min-h-32" required />
                    </div>
                    <Button type="submit" className="w-full accent-gradient text-accent-foreground">Göndər</Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ContactPage;
