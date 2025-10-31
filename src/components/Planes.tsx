import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Check, Zap, Star, Crown } from "lucide-react";

const planes = [
  {
    nombre: "Básico",
    precio: "Gratis",
    descripcion: "Perfecto para comenzar a explorar licitaciones",
    icon: Zap,
    color: "text-slate-600",
    bgColor: "bg-slate-100",
    popular: false,
    caracteristicas: [
      "Búsqueda básica de licitaciones",
      "Ver hasta 10 licitaciones por día",
      "Acceso a información pública",
      "Alertas por email (máx. 3 palabras clave)",
      "Soporte por email"
    ]
  },
  {
    nombre: "Profesional",
    precio: "$49.990",
    periodo: "/mes",
    descripcion: "Para profesionales que necesitan más herramientas",
    icon: Star,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
    popular: true,
    caracteristicas: [
      "Búsqueda avanzada ilimitada",
      "Acceso ilimitado a licitaciones",
      "Filtros avanzados personalizados",
      "Alertas por email ilimitadas",
      "Exportación de datos (CSV, Excel)",
      "Dashboard con analíticas avanzadas",
      "Seguimiento de adjudicaciones",
      "Comparador de licitaciones",
      "Soporte prioritario 24/7"
    ]
  },
  {
    nombre: "Empresarial",
    precio: "$149.990",
    periodo: "/mes",
    descripcion: "Solución completa para equipos y empresas",
    icon: Crown,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
    popular: false,
    caracteristicas: [
      "Todo lo incluido en Profesional",
      "Usuarios ilimitados",
      "API de acceso a datos",
      "Integración con sistemas ERP",
      "Reportes personalizados automáticos",
      "Análisis predictivo con IA",
      "Gestor de documentos",
      "Capacitación del equipo",
      "Account manager dedicado",
      "SLA garantizado"
    ]
  }
];

export default function Planes() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h2 className="text-slate-900 mb-4">Elige el plan perfecto para ti</h2>
        <p className="text-slate-600">
          Accede a miles de licitaciones públicas y privadas. Mejora tu eficiencia y encuentra las mejores oportunidades de negocio.
        </p>
      </div>

      {/* Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {planes.map((plan) => {
          const Icon = plan.icon;
          return (
            <Card 
              key={plan.nombre}
              className={`relative ${plan.popular ? "border-blue-500 border-2 shadow-lg scale-105" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-4 py-1">Más Popular</Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-8">
                <div className={`w-16 h-16 ${plan.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className={`w-8 h-8 ${plan.color}`} />
                </div>
                <CardTitle className="text-slate-900">{plan.nombre}</CardTitle>
                <CardDescription className="mt-2">{plan.descripcion}</CardDescription>
                <div className="mt-6">
                  <span className="text-slate-900">{plan.precio}</span>
                  {plan.periodo && <span className="text-slate-600">{plan.periodo}</span>}
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <ul className="space-y-3">
                  {plan.caracteristicas.map((caracteristica, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-700">{caracteristica}</span>
                    </li>
                  ))}
                </ul>

                <Button 
                  className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.nombre === "Básico" ? "Plan Actual" : "Comenzar Ahora"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* FAQ or Additional Info */}
      <div className="max-w-4xl mx-auto mt-16">
        <Card>
          <CardHeader>
            <CardTitle>¿Necesitas un plan personalizado?</CardTitle>
            <CardDescription>
              Contáctanos para crear una solución a medida para tu organización
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button variant="outline">
              Hablar con Ventas
            </Button>
            <Button variant="ghost">
              Ver Comparación Completa
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
