import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { ChevronLeft, ChevronRight, Clock, AlertCircle } from "lucide-react";
import { es } from "date-fns/locale";
import { format, isSameDay, addMonths, subMonths } from "date-fns";

type LicitacionVencimiento = {
  id: string;
  codigo: string;
  nombre: string;
  organismo: string;
  monto: number | null;
  cierre: Date;
  estado: "abierta" | "cerrada" | "en_evaluacion";
  diasRestantes: number;
};

const mockLicitaciones: LicitacionVencimiento[] = [
  {
    id: "1",
    codigo: "1043-37-LE25",
    nombre: "Adquisición de Base Granular CBR 60%",
    organismo: "Dirección de Vialidad",
    monto: 45000000,
    cierre: new Date(2025, 10, 7), // Nov 7
    estado: "abierta",
    diasRestantes: 6
  },
  {
    id: "2",
    codigo: "1043030-23-LE25",
    nombre: "Sistema de Admisión Escolar 2025",
    organismo: "Ministerio de Educación",
    monto: null,
    cierre: new Date(2025, 10, 3), // Nov 3
    estado: "abierta",
    diasRestantes: 2
  },
  {
    id: "3",
    codigo: "1030-28-LE25",
    nombre: "Reparación del Sistema Eléctrico de Taller",
    organismo: "Empresa Portuaria Valparaíso",
    monto: 12500000,
    cierre: new Date(2025, 10, 10), // Nov 10
    estado: "abierta",
    diasRestantes: 9
  },
  {
    id: "4",
    codigo: "1042-18-LE25",
    nombre: "Suministro de Equipos Médicos Hospital Regional",
    organismo: "Servicio de Salud Metropolitano",
    monto: 125000000,
    cierre: new Date(2025, 10, 15), // Nov 15
    estado: "abierta",
    diasRestantes: 14
  },
  {
    id: "5",
    codigo: "1041-25-LE25",
    nombre: "Desarrollo Plataforma Digital Ciudadana",
    organismo: "Gobierno Digital",
    monto: 95000000,
    cierre: new Date(2025, 10, 20), // Nov 20
    estado: "abierta",
    diasRestantes: 19
  },
  {
    id: "6",
    codigo: "1037-17-LE25",
    nombre: "Implementación y Capacitación Sistemas de Riego",
    organismo: "INDAP",
    monto: 28000000,
    cierre: new Date(2025, 10, 6), // Nov 6
    estado: "abierta",
    diasRestantes: 5
  }
];

export default function CalendarioVencimientos() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const licitacionesPorFecha = mockLicitaciones.filter(lic => 
    selectedDate && isSameDay(lic.cierre, selectedDate)
  );

  const proximasAVencer = mockLicitaciones
    .filter(lic => lic.diasRestantes <= 7)
    .sort((a, b) => a.diasRestantes - b.diasRestantes);

  const getUrgenciaBadge = (dias: number) => {
    if (dias <= 2) return <Badge className="bg-red-500">Urgente</Badge>;
    if (dias <= 5) return <Badge className="bg-orange-500">Próximo</Badge>;
    return <Badge className="bg-blue-500">Planificado</Badge>;
  };

  const fechasConLicitaciones = mockLicitaciones.map(lic => lic.cierre);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">Calendario de Vencimientos</h2>
        <p className="text-slate-600 mt-1">Visualiza y planifica las fechas de cierre de licitaciones</p>
      </div>

      {/* Alert */}
      <Card className="border-orange-200 bg-orange-50">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="text-orange-900">
              Tienes <strong>{proximasAVencer.length} licitaciones</strong> próximas a vencer en los próximos 7 días.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Calendario</CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-slate-900 min-w-[140px] text-center">
                  {format(currentMonth, 'MMMM yyyy', { locale: es })}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              locale={es}
              month={currentMonth}
              onMonthChange={setCurrentMonth}
              className="rounded-md border"
              modifiers={{
                conLicitaciones: fechasConLicitaciones
              }}
              modifiersStyles={{
                conLicitaciones: {
                  fontWeight: 'bold',
                  backgroundColor: '#dbeafe',
                  borderRadius: '50%'
                }
              }}
            />
            <div className="mt-4 flex items-center gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-blue-100 rounded-full"></div>
                <span>Fecha con licitaciones</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sidebar - Selected Date Details */}
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate ? format(selectedDate, "d 'de' MMMM", { locale: es }) : "Selecciona una fecha"}
            </CardTitle>
            <CardDescription>
              {licitacionesPorFecha.length} licitación{licitacionesPorFecha.length !== 1 ? 'es' : ''} {licitacionesPorFecha.length !== 1 ? 'vencen' : 'vence'} este día
            </CardDescription>
          </CardHeader>
          <CardContent>
            {licitacionesPorFecha.length > 0 ? (
              <div className="space-y-3">
                {licitacionesPorFecha.map((lic) => (
                  <div key={lic.id} className="p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <p className="text-slate-900 line-clamp-2">{lic.nombre}</p>
                      {getUrgenciaBadge(lic.diasRestantes)}
                    </div>
                    <p className="text-slate-600 mb-1">{lic.codigo}</p>
                    <p className="text-slate-600">{lic.organismo}</p>
                    {lic.monto && (
                      <p className="text-slate-900 mt-2">
                        ${lic.monto.toLocaleString('es-CL')}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Clock className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <p className="text-slate-500">No hay licitaciones programadas para esta fecha</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Próximas a Vencer */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas a Vencer (7 días)</CardTitle>
          <CardDescription>Licitaciones que requieren atención inmediata</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {proximasAVencer.map((lic) => (
              <div key={lic.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-slate-900">{lic.nombre}</p>
                    {getUrgenciaBadge(lic.diasRestantes)}
                  </div>
                  <div className="flex items-center gap-4 text-slate-600">
                    <span>{lic.codigo}</span>
                    <span>•</span>
                    <span>{lic.organismo}</span>
                    {lic.monto && (
                      <>
                        <span>•</span>
                        <span>${lic.monto.toLocaleString('es-CL')}</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right ml-4">
                  <p className="text-slate-900">{format(lic.cierre, "d 'de' MMM", { locale: es })}</p>
                  <p className="text-slate-600">
                    {lic.diasRestantes === 0 ? 'Hoy' : 
                     lic.diasRestantes === 1 ? 'Mañana' : 
                     `${lic.diasRestantes} días`}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
