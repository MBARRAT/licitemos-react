import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { X, Plus, Download, Building2, Calendar, DollarSign, MapPin, FileText } from "lucide-react";

type Licitacion = {
  id: string;
  codigo: string;
  nombre: string;
  organismo: string;
  tipo: string;
  region: string;
  monto: number | null;
  cierre: string;
  estado: "abierta" | "cerrada" | "en_evaluacion";
  descripcion: string;
  categoria: string;
  plazoEjecucion?: string;
  requisitos?: string[];
};

const mockLicitaciones: Licitacion[] = [
  {
    id: "1",
    codigo: "1043-37-LE25",
    nombre: "Adquisición de Base Granular CBR 60%",
    organismo: "Dirección de Vialidad",
    tipo: "LE",
    region: "Metropolitana",
    monto: 45000000,
    cierre: "2025-11-07",
    estado: "abierta",
    descripcion: "Suministro de material granular para obras viales",
    categoria: "Infraestructura",
    plazoEjecucion: "90 días",
    requisitos: ["Certificado ISO 9001", "Experiencia mínima 3 años", "Capital mínimo $20M"]
  },
  {
    id: "2",
    codigo: "1042-18-LE25",
    nombre: "Suministro de Equipos Médicos Hospital Regional",
    organismo: "Servicio de Salud Metropolitano Central",
    tipo: "LP",
    region: "Metropolitana",
    monto: 125000000,
    cierre: "2025-11-15",
    estado: "abierta",
    descripcion: "Adquisición de equipamiento médico de última generación",
    categoria: "Salud",
    plazoEjecucion: "180 días",
    requisitos: ["Certificación sanitaria", "Experiencia en sector salud", "Garantía 5 años"]
  },
  {
    id: "3",
    codigo: "1041-25-LE25",
    nombre: "Desarrollo Plataforma Digital Ciudadana",
    organismo: "Gobierno Digital",
    tipo: "LE",
    region: "Nacional",
    monto: 95000000,
    cierre: "2025-11-20",
    estado: "abierta",
    descripcion: "Desarrollo de plataforma web y mobile para trámites",
    categoria: "Tecnología",
    plazoEjecucion: "240 días",
    requisitos: ["Certificación CMMI Nivel 3", "Equipo 10+ desarrolladores", "Portfolio aplicaciones web"]
  }
];

export default function ComparadorLicitaciones() {
  const [selectedLicitaciones, setSelectedLicitaciones] = useState<Licitacion[]>([
    mockLicitaciones[0],
    mockLicitaciones[1]
  ]);
  const [availableLicitaciones] = useState(mockLicitaciones);

  const addLicitacion = (lic: Licitacion) => {
    if (selectedLicitaciones.length >= 4) {
      return;
    }
    if (!selectedLicitaciones.find(l => l.id === lic.id)) {
      setSelectedLicitaciones([...selectedLicitaciones, lic]);
    }
  };

  const removeLicitacion = (id: string) => {
    setSelectedLicitaciones(selectedLicitaciones.filter(l => l.id !== id));
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "abierta":
        return <Badge className="bg-green-500">Abierta</Badge>;
      case "cerrada":
        return <Badge className="bg-gray-500">Cerrada</Badge>;
      case "en_evaluacion":
        return <Badge className="bg-blue-500">En Evaluación</Badge>;
      default:
        return null;
    }
  };

  const getTipoBadge = (tipo: string) => {
    const colors: Record<string, string> = {
      "LE": "bg-blue-500",
      "LP": "bg-orange-500",
      "LR": "bg-purple-500",
      "LQ": "bg-green-500"
    };
    return <Badge className={`${colors[tipo] || "bg-gray-500"} text-white`}>{tipo}</Badge>;
  };

  const exportComparison = () => {
    // Simple CSV export
    const headers = ["Campo", ...selectedLicitaciones.map(l => l.codigo)];
    const rows = [
      ["Nombre", ...selectedLicitaciones.map(l => l.nombre)],
      ["Organismo", ...selectedLicitaciones.map(l => l.organismo)],
      ["Monto", ...selectedLicitaciones.map(l => l.monto ? `$${l.monto}` : "N/A")],
      ["Cierre", ...selectedLicitaciones.map(l => l.cierre)],
      ["Categoría", ...selectedLicitaciones.map(l => l.categoria)],
      ["Región", ...selectedLicitaciones.map(l => l.region)]
    ];
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "comparacion_licitaciones.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Comparador de Licitaciones</h2>
          <p className="text-slate-600 mt-1">Compara hasta 4 licitaciones lado a lado</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportComparison} disabled={selectedLicitaciones.length < 2}>
            <Download className="w-4 h-4 mr-2" />
            Exportar Comparación
          </Button>
        </div>
      </div>

      {/* Add Licitaciones */}
      {selectedLicitaciones.length < 4 && (
        <Card>
          <CardHeader>
            <CardTitle>Agregar Licitación ({selectedLicitaciones.length}/4)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2 flex-wrap">
              {availableLicitaciones
                .filter(lic => !selectedLicitaciones.find(s => s.id === lic.id))
                .map(lic => (
                  <Button
                    key={lic.id}
                    variant="outline"
                    size="sm"
                    onClick={() => addLicitacion(lic)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    {lic.codigo}
                  </Button>
                ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Comparison Table */}
      {selectedLicitaciones.length >= 2 ? (
        <div className="overflow-x-auto">
          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${selectedLicitaciones.length}, minmax(300px, 1fr))` }}>
            {selectedLicitaciones.map((lic) => (
              <Card key={lic.id}>
                <CardHeader>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getTipoBadge(lic.tipo)}
                        {getEstadoBadge(lic.estado)}
                      </div>
                      <CardTitle className="text-slate-900 mb-2">{lic.nombre}</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeLicitacion(lic.id)}
                      className="text-slate-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Código */}
                  <div>
                    <p className="text-slate-600 mb-1">Código</p>
                    <p className="text-blue-600">{lic.codigo}</p>
                  </div>

                  {/* Organismo */}
                  <div>
                    <p className="text-slate-600 mb-1 flex items-center gap-1">
                      <Building2 className="w-4 h-4" />
                      Organismo
                    </p>
                    <p className="text-slate-900">{lic.organismo}</p>
                  </div>

                  {/* Categoría */}
                  <div>
                    <p className="text-slate-600 mb-1">Categoría</p>
                    <Badge variant="outline">{lic.categoria}</Badge>
                  </div>

                  {/* Monto */}
                  <div>
                    <p className="text-slate-600 mb-1 flex items-center gap-1">
                      <DollarSign className="w-4 h-4" />
                      Monto
                    </p>
                    <p className="text-slate-900">
                      {lic.monto ? `$${lic.monto.toLocaleString('es-CL')}` : "No especificado"}
                    </p>
                  </div>

                  {/* Región */}
                  <div>
                    <p className="text-slate-600 mb-1 flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Región
                    </p>
                    <p className="text-slate-900">{lic.region}</p>
                  </div>

                  {/* Fecha Cierre */}
                  <div>
                    <p className="text-slate-600 mb-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Fecha de Cierre
                    </p>
                    <p className="text-slate-900">
                      {new Date(lic.cierre).toLocaleDateString('es-CL')}
                    </p>
                  </div>

                  {/* Plazo Ejecución */}
                  {lic.plazoEjecucion && (
                    <div>
                      <p className="text-slate-600 mb-1">Plazo de Ejecución</p>
                      <p className="text-slate-900">{lic.plazoEjecucion}</p>
                    </div>
                  )}

                  {/* Descripción */}
                  <div>
                    <p className="text-slate-600 mb-1 flex items-center gap-1">
                      <FileText className="w-4 h-4" />
                      Descripción
                    </p>
                    <p className="text-slate-900">{lic.descripcion}</p>
                  </div>

                  {/* Requisitos */}
                  {lic.requisitos && (
                    <div>
                      <p className="text-slate-600 mb-2">Requisitos Principales</p>
                      <ul className="space-y-1">
                        {lic.requisitos.map((req, i) => (
                          <li key={i} className="text-slate-900 text-sm flex items-start gap-2">
                            <span className="text-blue-600 mt-1">•</span>
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="pt-2 border-t">
                    <Button variant="outline" className="w-full">
                      Ver Detalles Completos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card>
          <CardContent className="py-16 text-center">
            <FileText className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-2">Selecciona al menos 2 licitaciones para comparar</p>
            <p className="text-slate-400">
              Agrega licitaciones desde el selector de arriba
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
