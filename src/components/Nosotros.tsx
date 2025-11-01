import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Target, Users, Award, Lightbulb } from "lucide-react";

type NosotrosProps = {
  onNavigate: (view: string) => void;
};

export default function Nosotros({ onNavigate }: NosotrosProps) {
  const values = [
    {
      icon: Target,
      title: "Nuestra Misión",
      description: "Democratizar el acceso a las licitaciones públicas, facilitando que empresas de todos los tamaños puedan participar y ganar en el mercado público chileno."
    },
    {
      icon: Lightbulb,
      title: "Nuestra Visión",
      description: "Ser la plataforma líder en Chile para la gestión de licitaciones públicas, reconocida por nuestra innovación y compromiso con nuestros clientes."
    },
    {
      icon: Users,
      title: "Nuestro Equipo",
      description: "Contamos con un equipo multidisciplinario de profesionales expertos en tecnología, licitaciones públicas y atención al cliente."
    },
    {
      icon: Award,
      title: "Nuestros Valores",
      description: "Transparencia, innovación, compromiso con el cliente y excelencia en el servicio son los pilares fundamentales de nuestra organización."
    }
  ];

  const stats = [
    { number: "500+", label: "Empresas Confían en Nosotros" },
    { number: "10,000+", label: "Licitaciones Gestionadas" },
    { number: "95%", label: "Satisfacción del Cliente" },
    { number: "24/7", label: "Soporte Disponible" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-16">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-slate-900 mb-6">Sobre Licitemos</h1>
          <p className="text-slate-600 mb-8">
            Somos la plataforma líder en Chile para la gestión inteligente de licitaciones públicas.
            Desde 2020, ayudamos a empresas a encontrar, gestionar y ganar más oportunidades en el mercado público.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {stats.map((stat, index) => (
              <div key={index}>
                <div className="text-white mb-2">{stat.number}</div>
                <p className="text-blue-100">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-slate-900 mb-4">Lo que nos define</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Nuestros valores y principios guían cada decisión que tomamos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <Card key={index} className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="text-slate-900 mb-2">{value.title}</h3>
                      <p className="text-slate-600">{value.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Story Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-slate-900 mb-6 text-center">Nuestra Historia</h2>
            <div className="space-y-6 text-slate-600">
              <p>
                Licitemos nació en 2020 con una visión clara: simplificar el acceso a las licitaciones públicas
                para empresas de todos los tamaños. Observamos que muchas empresas perdían oportunidades valiosas
                por la complejidad del sistema de licitaciones públicas.
              </p>
              <p>
                Desarrollamos una plataforma intuitiva que centraliza la información, automatiza las búsquedas
                y notifica sobre nuevas oportunidades. Lo que comenzó como un proyecto pequeño, hoy es utilizado
                por cientos de empresas en todo Chile.
              </p>
              <p>
                Nuestro compromiso es continuar innovando, escuchando a nuestros clientes y mejorando
                constantemente para ser el mejor aliado de las empresas en su participación en el mercado público.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20">
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0">
          <CardContent className="py-12 text-center">
            <h2 className="text-white mb-4">¿Listo para comenzar?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Únete a cientos de empresas que ya están transformando su forma de participar en licitaciones públicas
            </p>
            <div className="flex gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-slate-100"
                onClick={() => onNavigate('registro')}
              >
                Comenzar gratis
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600"
                onClick={() => onNavigate('planes')}
              >
                Ver planes
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
