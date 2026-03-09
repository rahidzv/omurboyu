import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, FileCheck, FilePlus, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";

const documentCategories = [
  {
    title: "Ərizə Nümunələri",
    icon: FilePlus,
    docs: [
      { name: "Qiyabi təhsilə qəbul ərizəsi", type: "PDF", size: "120 KB" },
      { name: "Təkrar ali təhsilə qəbul ərizəsi", type: "PDF", size: "115 KB" },
      { name: "Akademik məzuniyyət ərizəsi", type: "PDF", size: "95 KB" },
      { name: "Kurs seçimi ərizəsi", type: "PDF", size: "88 KB" },
      { name: "Bərpa ərizəsi", type: "PDF", size: "102 KB" },
    ],
  },
  {
    title: "Sertifikatlaşdırma Sənədləri",
    icon: FileCheck,
    docs: [
      { name: "Mühəndis sertifikatlaşdırma müraciət forması", type: "PDF", size: "140 KB" },
      { name: "Peşəkar inkişaf proqramına qeydiyyat forması", type: "PDF", size: "130 KB" },
      { name: "Təkmilləşdirmə kursu müraciət forması", type: "PDF", size: "110 KB" },
    ],
  },
  {
    title: "Dil Mərkəzi Sənədləri",
    icon: FileSearch,
    docs: [
      { name: "Dil kurslarına qeydiyyat forması", type: "PDF", size: "105 KB" },
      { name: "Beynəlxalq imtahana müraciət forması", type: "PDF", size: "125 KB" },
      { name: "Səviyyə təyini testi müraciət forması", type: "PDF", size: "98 KB" },
    ],
  },
  {
    title: "Ümumi Sənədlər",
    icon: FileText,
    docs: [
      { name: "Tələbə vəsiqəsi üçün müraciət", type: "PDF", size: "80 KB" },
      { name: "Arayış tələb forması", type: "PDF", size: "75 KB" },
      { name: "Şikayət və təklif forması", type: "PDF", size: "90 KB" },
      { name: "Könüllü fəaliyyət müraciət forması", type: "PDF", size: "85 KB" },
    ],
  },
];

const DocumentsPage = () => {
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
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Sənədlər</h1>
            <p className="text-xl text-white/90">
              Tələbələr üçün lazımi ərizə nümunələri və rəsmi sənədlər.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20">
        <div className="container mx-auto px-4 space-y-12">
          {documentCategories.map((category, catIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: catIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-secondary/10">
                  <category.icon className="text-secondary" size={24} />
                </div>
                <h2 className="text-2xl font-bold gradient-text">{category.title}</h2>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {category.docs.map((doc, index) => (
                  <Card key={index} className="card-gradient shadow-card group hover:shadow-lg transition-shadow">
                    <CardContent className="p-5 flex items-center justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <FileText size={20} className="text-secondary shrink-0 mt-0.5" />
                        <div className="min-w-0">
                          <p className="font-medium text-sm leading-snug">{doc.name}</p>
                          <div className="flex gap-2 mt-1.5">
                            <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                            <span className="text-xs text-muted-foreground">{doc.size}</span>
                          </div>
                        </div>
                      </div>
                      <Button size="icon" variant="ghost" className="shrink-0 hover:bg-secondary/10">
                        <Download size={18} className="text-secondary" />
                      </Button>
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

export default DocumentsPage;
