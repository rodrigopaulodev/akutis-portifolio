import { motion } from "motion/react";
import { Calendar, Clock, Users, Sparkles, CheckCircle, ArrowRight } from "lucide-react";
import { ImageWithFallback } from "./components/ImageWithFallback";
import logoAkutis from "../imports/logo-white.png";
import fotoBarbeiro from "../imports/barbeiro.jpg";
import bgImage from "../imports/background.png";

export default function App() {
  const features = [
    {
      icon: Calendar,
      title: "Catálogo de Serviços",
      description: "Cadastre e gerencie todos os serviços do seu salão com preços, duração e descrições"
    },
    {
      icon: Users,
      title: "Gestão de Profissionais",
      description: "Controle completo da sua equipe: adicione, edite e gerencie colaboradores"
    },
    {
      icon: Sparkles,
      title: "Experiência do Cliente",
      description: "Seus clientes visualizam serviços, constroem perfil e acessam histórico de atendimentos"
    },
    {
      icon: Clock,
      title: "White-Label Personalizado",
      description: "Sua marca, suas cores: cada negócio recebe uma instância isolada e customizável"
    }
  ];

  const benefits = [
    "Elimine cadernos e planilhas desorganizadas",
    "Centralize serviços, profissionais e clientes em um só lugar",
    "Interface mobile nativa pensada para salões e barbearias",
    "Autenticação segura com proteção de dados",
    "Dados isolados: cada negócio tem sua própria instância",
    "MVP funcional pronto para uso imediato"
  ];

  return (
    <div
        className="relative min-h-screen overflow-x-clip"
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
      {/* Camadas decorativas de fundo */}
      <div className="pointer-events-none absolute inset-0 diagonal-lines" aria-hidden="true" />
      <div className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[600px] hero-glow" aria-hidden="true" />
      <div className="pointer-events-none absolute top-12 right-0 w-72 h-72 dot-grid" aria-hidden="true" />
      <div className="pointer-events-none absolute bottom-0 left-0 w-72 h-72 dot-grid" aria-hidden="true" />
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <ImageWithFallback
            src={logoAkutis}
            alt="Akutis Logo"
            className="h-20 md:h-24 mx-auto mb-8 object-contain"
          />

          <h1 className="text-4xl md:text-6xl mb-6">
            Gestão Profissional para{" "}
            <span className="text-[#2563eb]">Salões e Barbearias</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Deixe para trás cadernos e WhatsApp. Gerencie serviços, profissionais e clientes em um app mobile white-label feito para o seu negócio
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#2563eb] hover:bg-[#1d4ed8] text-white px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              Solicitar Acesso ao MVP
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border border-border bg-card/60 hover:bg-secondary text-secondary-foreground px-8 py-4 rounded-lg transition-colors">
              Ver Demonstração
            </button>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Funcionalidades do MVP</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sistema completo de gestão desenvolvido em React Native para Android
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-card rounded-xl p-6 border border-border hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-[#2563eb]/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-[#2563eb]" />
              </div>
              <h3 className="mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* App Preview Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl mb-6">
              Rápido, Elegante e Seguro
            </h2>
            <p className="text-muted-foreground mb-6">
              Um aplicativo pensado para ser simples de usar, mas poderoso nos resultados.
              Interface moderna que seus clientes vão adorar.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                <span>Login seguro que protege os dados do seu negócio</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                <span>Funciona mesmo com internet instável</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
                <span>Seus dados separados e privativos para seu salão</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-[#2563eb]/20 to-transparent rounded-2xl blur-3xl"></div>
            <ImageWithFallback
              src={fotoBarbeiro}
              alt="Akutis em dispositivo móvel"
              className="relative rounded-2xl shadow-2xl w-full object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="container mx-auto px-4 py-16 md:py-24 bg-muted/50 rounded-3xl">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl mb-4">Por Que o Akutis é Diferente?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Solução white-label pensada especificamente para o setor de beleza
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start gap-3 bg-background p-4 rounded-lg"
            >
              <CheckCircle className="w-5 h-5 text-[#2563eb] flex-shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] rounded-3xl p-8 md:p-16 text-center text-white"
        >
          <h2 className="text-3xl md:text-5xl mb-6">
            Modernize a Gestão do seu Salão
          </h2>
          <p className="text-lg md:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            MVP funcional pronto para transformar como você gerencia serviços, profissionais e clientes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#2563eb] hover:bg-gray-100 px-8 py-4 rounded-lg flex items-center justify-center gap-2 transition-colors">
              Solicitar Demo do MVP
              <ArrowRight className="w-5 h-5" />
            </button>
            <button className="border-2 border-white text-white hover:bg-white/10 px-8 py-4 rounded-lg transition-colors">
              Baixar APK de Teste
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-border">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <ImageWithFallback
              src={logoAkutis}
              alt="Akutis"
              className="h-8 object-contain"
            />
          </div>
          <p>© 2026 Akutis. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
            <a href="#" className="hover:text-foreground transition-colors">Termos</a>
            <a href="#" className="hover:text-foreground transition-colors">Contato</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
