import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Check, Star, Clock, TrendingUp, Shield } from "lucide-react";

type LandingProps = {
  onNavigate: (view: string) => void;
};

export default function Landing({ onNavigate }: LandingProps) {
  const features = [
    {
      icon: Clock,
      title: "Ahorra tiempo con alertas automáticas",
      description: "Recibe notificaciones cuando aparezcan licitaciones que coincidan con tus criterios"
    },
    {
      icon: TrendingUp,
      title: "Obtén más licitaciones",
      description: "Accede a miles de oportunidades de negocio del sector público"
    },
    {
      icon: Shield,
      title: "Encuentra y gana licitaciones",
      description: "Herramientas avanzadas de búsqueda y análisis para aumentar tus probabilidades"
    },
    {
      icon: Star,
      title: "Confiabilidad y seguridad probadas",
      description: "Sistema confiable utilizado por cientos de empresas en Chile"
    }
  ];

  const testimonials = [
    {
      quote: "Me encanta LicitemOS. Las notificaciones internas de proyectos, junto con el canal de oportunidades ha permitido aumentar significativamente los proyectos en los que estamos participando.",
      author: "Sebastián Fernández",
      company: "Grupo SIG",
      rating: 5
    },
    {
      quote: "LicitemOS es súper fácil de usar. Ha permitido participar de licitaciones públicas de manera más eficiente y con facilidad de búsqueda.",
      author: "César Sánchez",
      company: "Constructora XYZ",
      rating: 5
    },
    {
      quote: "Ya nunca se nos escapó más licitación de nuestro interés. La búsqueda rápida y las alertas personalizadas han transformado nuestro proceso.",
      author: "Mariana Rojas",
      company: "Tech Solutions",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-20 pb-24">
        <div className="text-center max-w-4xl mx-auto">
          <div className="inline-block mb-4">
            <span className="bg-pink-100 text-pink-600 px-4 py-2 rounded-full">
              ¡CONFÍA EN EL MERCADO PÚBLICO!
            </span>
          </div>
          
          <h1 className="text-slate-900 mb-6">
            El sistema que convierte al Estado en tu mejor aliado
          </h1>
          
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            Lista las mejores licitaciones para participar en mercado público. Clasifica
            esas preferidas. Descarga bases fácil y rápido. Las mejores licitaciones,
            siempre para tu empresa.
          </p>

          <div className="flex gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-pink-600 hover:bg-pink-700"
              onClick={() => onNavigate('registro')}
            >
              ¡Comenzar gratis!
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => onNavigate('planes')}
            >
              Ver Planes
            </Button>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="border-slate-200">
                  <CardContent className="pt-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    <h3 className="text-slate-900 mb-2">{feature.title}</h3>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-slate-900 mb-4">Lo que dicen nuestros clientes</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="border-blue-200">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 italic">"{testimonial.quote}"</p>
                  <div>
                    <p className="text-slate-900">{testimonial.author}</p>
                    <p className="text-slate-600">{testimonial.company}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-slate-900 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-white mb-4">¿Listo para comenzar?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            Únete a cientos de empresas que ya están ganando más licitaciones con LicitemOS
          </p>
          <div className="flex gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-pink-600 hover:bg-pink-700"
              onClick={() => onNavigate('registro')}
            >
              Comenzar ahora gratis
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-transparent text-white border-white hover:bg-white hover:text-slate-900"
              onClick={() => onNavigate('nosotros')}
            >
              Conocer más
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-white mb-4">Licitemos</h3>
              <p className="text-slate-400">
                El sistema para la búsqueda con Mercado Público
              </p>
            </div>
            
            <div>
              <h4 className="text-white mb-4">Licitemos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">Inicio</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Planes</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Nosotros</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white mb-4">Recursos</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Guías</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Centro de ayuda</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white mb-4">Contacto</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-slate-400 hover:text-white">hola@licitemos.cl</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">+569 XXXX XXXX</a></li>
                <li><a href="#" className="text-slate-400 hover:text-white">Preguntas frecuentes</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-8 text-center text-slate-400">
            © 2025 Licitemos
          </div>
        </div>
      </footer>
    </div>
  );
}
