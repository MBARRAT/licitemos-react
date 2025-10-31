import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Building2, Calendar, DollarSign, Search, FileText, TrendingUp } from "lucide-react";

type Adjudicacion = {
  id: string;
  licitacionId: string;
  titulo: string;
  organismo: string;
  adjudicatario: string;
  monto: number;
  fechaAdjudicacion: string;
  plazoEjecucion: string;
  categoria: string;
  estado: "en_ejecucion" | "finalizada" | "suspendida";
};

const mockAdjudicaciones: Adjudicacion[] = [
  {
    id: "ADJ-2025-001",
    licitacionId: "LIC-2025-004",
    titulo: "Servicios de Consultoría Ambiental",
    organismo: "Ministerio del Medio Ambiente",
    adjudicatario: "EcoConsult Ltda.",
    monto: 800000,
    fechaAdjudicacion: "2025-10-28",
    plazoEjecucion: "6 meses",
    categoria: "Consultoría",
    estado: "en_ejecucion"
  },
  {
    id: "ADJ-2025-002",
    licitacionId: "LIC-2024-089",
    titulo: "Mantenimiento de Carreteras Región Norte",
    organismo: "Ministerio de Obras Públicas",
    adjudicatario: "Constructora del Norte S.A.",
    monto: 4200000,
    fechaAdjudicacion: "2025-09-15",
    plazoEjecucion: "12 meses",
    categoria: "Infraestructura",
    estado: "en_ejecucion"
  },
  {
    id: "ADJ-2025-003",
    licitacionId: "LIC-2024-102",
    titulo: "Desarrollo de Portal Web Ciudadano",
    organismo: "Gobierno Digital",
    adjudicatario: "TechSolutions SpA",
    monto: 1500000,
    fechaAdjudicacion: "2025-08-20",
    plazoEjecucion: "8 meses",
    categoria: "Tecnología",
    estado: "finalizada"
  },
  {
    id: "ADJ-2025-004",
    licitacionId: "LIC-2024-115",
    titulo: "Provisión de Insumos Médicos",
    organismo: "Hospital Regional",
    adjudicatario: "MedSupply Internacional",
    monto: 1800000,
    fechaAdjudicacion: "2025-07-10",
    plazoEjecucion: "24 meses",
    categoria: "Salud",
    estado: "en_ejecucion"
  },
  {
    id: "ADJ-2025-005",
    licitacionId: "LIC-2024-098",
    titulo: "Auditoría Financiera Institucional",
    organismo: "Contraloría Regional",
    adjudicatario: "Audit & Partners",
    monto: 580000,
    fechaAdjudicacion: "2025-06-05",
    plazoEjecucion: "4 meses",
    categoria: "Consultoría",
    estado: "finalizada"
  },
  {
    id: "ADJ-2025-006",
    licitacionId: "LIC-2024-125",
    titulo: "Construcción de Centro Deportivo",
    organismo: "Municipalidad de Viña del Mar",
    adjudicatario: "Constructora Pacific",
    monto: 6700000,
    fechaAdjudicacion: "2025-05-18",
    plazoEjecucion: "18 meses",
    categoria: "Infraestructura",
    estado: "suspendida"
  },
  {
    id: "ADJ-2025-007",
    licitacionId: "LIC-2024-132",
    titulo: "Sistema de Gestión Documental",
    organismo: "Ministerio del Interior",
    adjudicatario: "DocuSystems Chile",
    monto: 980000,
    fechaAdjudicacion: "2025-09-30",
    plazoEjecucion: "10 meses",
    categoria: "Tecnología",
    estado: "en_ejecucion"
  },
  {
    id: "ADJ-2025-008",
    licitacionId: "LIC-2024-140",
    titulo: "Capacitación Personal Sanitario",
    organismo: "Servicio de Salud Valparaíso",
    adjudicatario: "Instituto de Formación Médica",
    monto: 420000,
    fechaAdjudicacion: "2025-08-12",
    plazoEjecucion: "6 meses",
    categoria: "Salud",
    estado: "finalizada"
  }
];

const categorias = ["Todas", "Infraestructura", "Salud", "Tecnología", "Consultoría"];

export default function Adjudicaciones() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [selectedEstado, setSelectedEstado] = useState("Todos");

  const filteredAdjudicaciones = mockAdjudicaciones.filter((adj) => {
    const matchesSearch = 
      adj.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adj.adjudicatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      adj.organismo.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategoria = 
      selectedCategoria === "Todas" || adj.categoria === selectedCategoria;
    
    const matchesEstado = 
      selectedEstado === "Todos" || adj.estado === selectedEstado;

    return matchesSearch && matchesCategoria && matchesEstado;
  });

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "en_ejecucion":
        return <Badge className="bg-blue-500">En Ejecución</Badge>;
      case "finalizada":
        return <Badge className="bg-green-500">Finalizada</Badge>;
      case "suspendida":
        return <Badge className="bg-orange-500">Suspendida</Badge>;
      default:
        return null;
    }
  };

  const totalMonto = filteredAdjudicaciones.reduce((sum, adj) => sum + adj.monto, 0);
  const enEjecucion = filteredAdjudicaciones.filter(adj => adj.estado === "en_ejecucion").length;
  const finalizadas = filteredAdjudicaciones.filter(adj => adj.estado === "finalizada").length;

  return (
    <div className="space-y-6">
      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Adjudicado</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              ${totalMonto.toLocaleString('es-CL')}
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>En Ejecución</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              {enEjecucion} contratos
            </CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Finalizadas</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-slate-600" />
              {finalizadas} contratos
            </CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle>Adjudicaciones</CardTitle>
          <CardDescription>Visualiza y gestiona las licitaciones adjudicadas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-col md:flex-row">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Buscar por título, adjudicatario u organismo..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categorias.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedEstado} onValueChange={setSelectedEstado}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos">Todos</SelectItem>
                <SelectItem value="en_ejecucion">En Ejecución</SelectItem>
                <SelectItem value="finalizada">Finalizada</SelectItem>
                <SelectItem value="suspendida">Suspendida</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Adjudicaciones */}
      <Card>
        <CardContent className="pt-6">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Título</TableHead>
                <TableHead>Adjudicatario</TableHead>
                <TableHead>Organismo</TableHead>
                <TableHead>Monto</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Plazo</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead>Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAdjudicaciones.map((adj) => (
                <TableRow key={adj.id}>
                  <TableCell className="text-slate-600">{adj.id}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-slate-900">{adj.titulo}</div>
                      <Badge variant="outline" className="mt-1">{adj.categoria}</Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-900">{adj.adjudicatario}</TableCell>
                  <TableCell className="text-slate-600">{adj.organismo}</TableCell>
                  <TableCell className="text-slate-900">
                    ${adj.monto.toLocaleString('es-CL')}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {new Date(adj.fechaAdjudicacion).toLocaleDateString('es-CL')}
                  </TableCell>
                  <TableCell className="text-slate-600">{adj.plazoEjecucion}</TableCell>
                  <TableCell>{getEstadoBadge(adj.estado)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">Ver</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          {filteredAdjudicaciones.length === 0 && (
            <div className="py-12 text-center">
              <p className="text-slate-500">No se encontraron adjudicaciones con los filtros seleccionados</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
