import { useState } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CheckCircle, FileText, Download } from "lucide-react";
import { toast } from "sonner";

const languageTestQuestions = [
  { id: 1, question: "She ___ to school every day.", options: ["go", "goes", "going", "went"], correct: 1 },
  { id: 2, question: "I ___ watching TV right now.", options: ["am", "is", "are", "be"], correct: 0 },
  { id: 3, question: "They ___ finished their homework.", options: ["has", "have", "had", "having"], correct: 1 },
  { id: 4, question: "If I ___ rich, I would travel.", options: ["am", "was", "were", "be"], correct: 2 },
  { id: 5, question: "The book ___ on the table.", options: ["is", "are", "be", "been"], correct: 0 },
  { id: 6, question: "She asked me where I ___.", options: ["live", "lived", "living", "lives"], correct: 1 },
  { id: 7, question: "I wish I ___ speak French.", options: ["can", "could", "will", "would"], correct: 1 },
  { id: 8, question: "The letter ___ yesterday.", options: ["sent", "was sent", "sends", "sending"], correct: 1 },
  { id: 9, question: "He is ___ than his brother.", options: ["tall", "taller", "tallest", "more tall"], correct: 1 },
  { id: 10, question: "I ___ never been to Paris.", options: ["has", "have", "had", "having"], correct: 1 },
  { id: 11, question: "She ___ here since 2010.", options: ["works", "worked", "has worked", "working"], correct: 2 },
  { id: 12, question: "By next year, I ___ graduated.", options: ["will", "will have", "would", "have"], correct: 1 },
  { id: 13, question: "___ you mind opening the window?", options: ["Do", "Would", "Will", "Can"], correct: 1 },
  { id: 14, question: "The meeting ___ at 9 AM tomorrow.", options: ["starts", "started", "starting", "start"], correct: 0 },
  { id: 15, question: "I'd rather you ___ smoke here.", options: ["don't", "didn't", "won't", "not"], correct: 1 },
  { id: 16, question: "Not only ___ intelligent but also hardworking.", options: ["she is", "is she", "she was", "was she"], correct: 1 },
  { id: 17, question: "Had I known, I ___ come earlier.", options: ["will have", "would have", "had", "have"], correct: 1 },
  { id: 18, question: "The more you practice, ___ you become.", options: ["better", "the better", "best", "the best"], correct: 1 },
  { id: 19, question: "It's high time we ___ a decision.", options: ["make", "made", "making", "makes"], correct: 1 },
  { id: 20, question: "Scarcely ___ arrived when it started raining.", options: ["I had", "had I", "I have", "have I"], correct: 1 },
];

const RegistrationPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", program: "", division: "" });
  const [showTest, setShowTest] = useState(false);
  const [testAnswers, setTestAnswers] = useState<Record<number, number>>({});
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Qeydiyyatınız uğurla göndərildi!");
    setStep(3);
  };

  const calculateLevel = () => {
    const correct = Object.entries(testAnswers).filter(([id, ans]) => 
      languageTestQuestions.find(q => q.id === parseInt(id))?.correct === ans
    ).length;
    
    if (correct <= 4) return "A1";
    if (correct <= 8) return "A2";
    if (correct <= 12) return "B1";
    if (correct <= 16) return "B2";
    return "C1";
  };

  const submitTest = () => {
    const level = calculateLevel();
    setTestResult(level);
    toast.success(`Sizin səviyyəniz: ${level}`);
  };

  return (
    <Layout>
      <section className="py-24 bg-gradient-to-br from-primary to-secondary">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Qeydiyyat</h1>
            <p className="text-xl text-white/90">Proqramlarımıza qoşulmaq üçün qeydiyyatdan keçin.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Tabs defaultValue="registration" className="space-y-8">
            <TabsList className="grid grid-cols-3 h-auto">
              <TabsTrigger value="registration" className="py-3">Qeydiyyat</TabsTrigger>
              <TabsTrigger value="language-test" className="py-3">Dil Səviyyə Testi</TabsTrigger>
              <TabsTrigger value="engineering" className="py-3">Mühəndis Qiymətləndirmə</TabsTrigger>
            </TabsList>

            <TabsContent value="registration">
              <Card className="card-gradient shadow-card">
                <CardHeader>
                  <CardTitle>Qeydiyyat Formu</CardTitle>
                </CardHeader>
                <CardContent>
                  {step < 3 ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Ad, Soyad</Label>
                          <Input placeholder="Adınız" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                          <Label>E-poçt</Label>
                          <Input type="email" placeholder="email@example.com" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                          <Label>Telefon</Label>
                          <Input placeholder="+994 XX XXX XX XX" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
                        </div>
                        <div className="space-y-2">
                          <Label>Bölmə</Label>
                          <Select value={formData.division} onValueChange={(v) => setFormData({...formData, division: v})}>
                            <SelectTrigger><SelectValue placeholder="Bölmə seçin" /></SelectTrigger>
                            <SelectContent>
                              <SelectItem value="qiyabi">Qiyabi Təhsil</SelectItem>
                              <SelectItem value="muhendis">Mühəndislik</SelectItem>
                              <SelectItem value="dil">Dil Mərkəzi</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label>Əlavə qeydlər</Label>
                        <Textarea placeholder="Sizinlə necə əlaqə saxlayaq..." />
                      </div>
                      <Button type="submit" className="w-full accent-gradient text-accent-foreground">Göndər</Button>
                    </form>
                  ) : (
                    <div className="text-center py-8">
                      <CheckCircle className="mx-auto text-green-500 mb-4" size={64} />
                      <h3 className="text-2xl font-bold mb-2">Qeydiyyat Uğurlu!</h3>
                      <p className="text-muted-foreground">Sizinlə tezliklə əlaqə saxlanılacaq.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="language-test">
              <Card className="card-gradient shadow-card">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="text-secondary" />
                    Dil Səviyyə Analizi (A1-C1)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!testResult ? (
                    <div className="space-y-6">
                      <p className="text-muted-foreground">20 sualdan ibarət test. Düzgün cavabları seçin.</p>
                      {languageTestQuestions.map((q, idx) => (
                        <div key={q.id} className="p-4 rounded-lg bg-muted/50 space-y-3">
                          <p className="font-medium">{idx + 1}. {q.question}</p>
                          <RadioGroup value={testAnswers[q.id]?.toString()} onValueChange={(v) => setTestAnswers({...testAnswers, [q.id]: parseInt(v)})}>
                            <div className="grid grid-cols-2 gap-2">
                              {q.options.map((opt, i) => (
                                <div key={i} className="flex items-center space-x-2">
                                  <RadioGroupItem value={i.toString()} id={`q${q.id}-${i}`} />
                                  <Label htmlFor={`q${q.id}-${i}`}>{opt}</Label>
                                </div>
                              ))}
                            </div>
                          </RadioGroup>
                        </div>
                      ))}
                      <Button onClick={submitTest} className="w-full accent-gradient text-accent-foreground">Nəticəni Gör</Button>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-6xl font-bold gradient-text mb-4">{testResult}</div>
                      <p className="text-muted-foreground mb-6">Bu sizin təxmini dil səviyyənizdir.</p>
                      <Button onClick={() => { setTestResult(null); setTestAnswers({}); }}>Yenidən Test Et</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="engineering">
              <Card className="card-gradient shadow-card">
                <CardHeader>
                  <CardTitle>Mühəndis Layihə Müraciəti</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground">Layihənizi təqdim edin və bilik səviyyənizi qiymətləndirilsin.</p>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Layihə Adı</Label>
                      <Input placeholder="Layihənizin adı" />
                    </div>
                    <div className="space-y-2">
                      <Label>Layihə Təsviri</Label>
                      <Textarea placeholder="Layihəniz haqqında ətraflı məlumat..." className="min-h-32" />
                    </div>
                    <div className="space-y-2">
                      <Label>Texnologiyalar</Label>
                      <Input placeholder="Python, Arduino, CAD..." />
                    </div>
                    <div className="space-y-2">
                      <Label>GitHub/Portfolio Linki</Label>
                      <Input placeholder="https://github.com/..." />
                    </div>
                  </div>
                  <Button className="w-full accent-gradient text-accent-foreground">Layihəni Göndər</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </Layout>
  );
};

export default RegistrationPage;
