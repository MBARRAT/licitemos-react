import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { TrendingUp, DollarSign, FileText, Award, Filter, Eye, Download } from "lucide-react";

const licitacionesPorMes = [
  { mes: "Jun", licitaciones: 45, adjudicadas: 32 },
  { mes: "Jul", licitaciones: 52, adjudicadas: 38 },
  { mes: "Ago", licitaciones: 48, adjudicadas: 35 },
  { mes: "Sep", licitaciones: 61, adjudicadas: 42 },
  { mes: "Oct", licitaciones: 58, adjudicadas: 40 },
  { mes: "Nov", licitaciones: 55, adjudicadas: 38 }
];

const montoPorCategoria = [
  { nombre: "Infraestructura", monto: 18700000, count: 12 },
  { nombre: "Salud", monto: 9500000, count: 18 },
  { nombre: "Tecnología", monto: 6200000, count: 15 },
  { nombre: "Consultoría", monto: 3800000, count: 22 }
];

const estadoLicitaciones = [
  { name: "Abiertas", value: 45, color: "#10b981" },
  { name: "En Evaluación", value: 28, color: "#3b82f6" },
  { name: "Cerradas", value: 67, color: "#6b7280" }
];

const topOrganismos = [
  { organismo: "Min. Obras Públicas", cantidad: 23, monto: 12500000 },
  { organismo: "Min. Salud", cantidad: 19, monto: 8900000 },
  { organismo: "Min. Educación", cantidad: 17, monto: 7200000 },
  { organismo: "Min. Medio Ambiente", cantidad: 14, monto: 4500000 },
  { organismo: "Gobiernos Regionales", cantidad: 12, monto: 6300000 }
];

type Adjudicacion = {
  id: string;
  codigo: string;
  nombre: string;
  organismo: string;
  adjudicatario: string;
  monto: number;
  fecha: string;
  categoria: string;
  estado: "en_ejecucion" | "finalizada" | "suspendida";
};

const mockAdjudicaciones: Adjudicacion[] = [
  {
    id: "1",
    codigo: "ADJ-2025-001",
    nombre: "Construcción de Infraestructura Vial",
    organismo: "Ministerio de Obras Públicas",
    adjudicatario: "Constructora del Norte S.A.",
    monto: 5000000,
    fecha: "2025-10-28",
    categoria: "Infraestructura",
    estado: "en_ejecucion"
  },
  {
    id: "2",
    codigo: "ADJ-2025-002",
    nombre: "Suministro de Equipos Médicos",
    organismo: "Servicio de Salud Metropolitano",
    adjudicatario: "MedSupply Internacional",
    monto: 2500000,
    fecha: "2025-10-20",
    categoria: "Salud",
    estado: "en_ejecucion"
  },
  {
    id: "3",
    codigo: "ADJ-2025-003",
    nombre: "Desarrollo de Software Educativo",
    organismo: "Ministerio de Educación",
    adjudicatario: "TechSolutions SpA",
    monto: 1200000,
    fecha: "2025-10-15",
    categoria: "Tecnología",
    estado: "finalizada"
  },
  {
    id: "4",
    codigo: "ADJ-2025-004",
    nombre: "Servicios de Consultoría Ambiental",
    organismo: "Ministerio del Medio Ambiente",
    adjudicatario: "EcoConsult Ltda.",
    monto: 800000,
    fecha: "2025-10-10",
    categoria: "Consultoría",
    estado: "finalizada"
  },
  {
    id: "5",
    codigo: "ADJ-2025-005",
    nombre: "Construcción de Establecimientos Educacionales",
    organismo: "Ministerio de Educación",
    adjudicatario: "Constructora Pacific",
    monto: 8500000,
    fecha: "2025-10-05",
    categoria: "Infraestructura",
    estado: "en_ejecucion"
  },
  {
    id: "6",
    codigo: "ADJ-2025-006",
    nombre: "Implementación de Sistema de Gestión",
    organismo: "Gobierno Regional",
    adjudicatario: "DocuSystems Chile",
    monto: 950000,
    fecha: "2025-09-30",
    categoria: "Tecnología",
    estado: "en_ejecucion"
  },
  {
    id: "7",
    codigo: "ADJ-2025-007",
    nombre: "Suministro de Medicamentos",
    organismo: "CENABAST",
    adjudicatario: "Pharma Chile",
    monto: 3200000,
    fecha: "2025-09-25",
    categoria: "Salud",
    estado: "suspendida"
  },
  {
    id: "8",
    codigo: "ADJ-2025-008",
    nombre: "Asesoría Legal Institucional",
    organismo: "Contraloría General",
    adjudicatario: "Audit & Partners",
    monto: 650000,
    fecha: "2025-09-20",
    categoria: "Consultoría",
    estado: "finalizada"
  }
];

const categorias = ["Todas", "Infraestructura", "Salud", "Tecnología", "Consultoría"];
const estados = ["Todos", "en_ejecucion", "finalizada", "suspendida"];

export default function Dashboard() {
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [selectedEstado, setSelectedEstado] = useState("Todos");
  const [showFilters, setShowFilters] = useState(false);

  const filteredAdjudicaciones = useMemo(() => {
    return mockAdjudicaciones.filter((adj) => {
      const matchesCategoria = selectedCategoria === "Todas" || adj.categoria === selectedCategoria;
      const matchesEstado = selectedEstado === "Todos" || adj.estado === selectedEstado;
      return matchesCategoria && matchesEstado;
    });
  }, [selectedCategoria, selectedEstado]);

  const totalLicitaciones = estadoLicitaciones.reduce((sum, item) => sum + item.value, 0);
  const totalMonto = montoPorCategoria.reduce((sum, item) => sum + item.monto, 0);
  const tasaAdjudicacion = ((67 / totalLicitaciones) * 100).toFixed(1);
  const totalMontoAdjudicado = filteredAdjudicaciones.reduce((sum, adj) => sum + adj.monto, 0);

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

  const exportToCSV = () => {
    const headers = ["Código", "Nombre", "Organismo", "Adjudicatario", "Monto", "Fecha", "Estado"];
    const rows = filteredAdjudicaciones.map(adj => [
      adj.codigo,
      adj.nombre,
      adj.organismo,
      adj.adjudicatario,
      adj.monto,
      adj.fecha,
      adj.estado
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "adjudicaciones_dashboard.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">Dashboard</h2>
        <p className="text-slate-600 mt-1">Análisis y visualización de datos de licitaciones</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Licitaciones</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-600" />
              {totalLicitaciones}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Últimos 6 meses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Monto Total</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-600" />
              ${(totalMonto / 1000000).toFixed(1)}M
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">En licitaciones activas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Tasa Adjudicación</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <Award className="w-5 h-5 text-purple-600" />
              {tasaAdjudicacion}%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">Promedio período</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Crecimiento</CardDescription>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              +12.5%
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-600">vs mes anterior</p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos principales */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Licitaciones por Mes */}
        <Card>
          <CardHeader>
            <CardTitle>Licitaciones por Mes</CardTitle>
            <CardDescription>Comparativa entre publicadas y adjudicadas</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={licitacionesPorMes}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="licitaciones" fill="#3b82f6" name="Publicadas" />
                <Bar dataKey="adjudicadas" fill="#10b981" name="Adjudicadas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Estado de Licitaciones */}
        <Card>
          <CardHeader>
            <CardTitle>Estado de Licitaciones</CardTitle>
            <CardDescription>Distribución por estado actual</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={estadoLicitaciones}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {estadoLicitaciones.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Monto por Categoría */}
      <Card>
        <CardHeader>
          <CardTitle>Monto por Categoría</CardTitle>
          <CardDescription>Distribución del presupuesto total en licitaciones</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={montoPorCategoria} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="nombre" type="category" width={120} />
              <Tooltip 
                formatter={(value: number) => `$${value.toLocaleString('es-CL')}`}
              />
              <Bar dataKey="monto" fill="#8b5cf6" name="Monto Total" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Top Organismos */}
      <Card>
        <CardHeader>
          <CardTitle>Top Organismos</CardTitle>
          <CardDescription>Organismos con mayor actividad licitatoria</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {topOrganismos.map((org, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-700">
                    {index + 1}
                  </div>
                  <div>
                    <p className="text-slate-900">{org.organismo}</p>
                    <p className="text-slate-600">{org.cantidad} licitaciones</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-slate-900">${org.monto.toLocaleString('es-CL')}</p>
                  <p className="text-slate-600">Monto total</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tabla de Adjudicaciones */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Adjudicaciones Recientes</CardTitle>
              <CardDescription>
                Mostrando {filteredAdjudicaciones.length} adjudicación{filteredAdjudicaciones.length !== 1 ? 'es' : ''} • 
                Total: ${totalMontoAdjudicado.toLocaleString('es-CL')}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button
                variant={showFilters ? "default" : "outline"}
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
              <Button variant="outline" size="sm" onClick={exportToCSV}>
                <Download className="w-4 h-4 mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          {showFilters && (
            <div className="flex gap-4 p-4 bg-slate-50 rounded-lg">
              <div className="flex-1">
                <label className="text-slate-700 mb-2 block">Categoría</label>
                <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categorias.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex-1">
                <label className="text-slate-700 mb-2 block">Estado</label>
                <Select value={selectedEstado} onValueChange={setSelectedEstado}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="en_ejecucion">En Ejecución</SelectItem>
                    <SelectItem value="finalizada">Finalizada</SelectItem>
                    <SelectItem value="suspendida">Suspendida</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {/* Table */}
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>CÓDIGO</TableHead>
                  <TableHead>NOMBRE</TableHead>
                  <TableHead>ORGANISMO</TableHead>
                  <TableHead>ADJUDICATARIO</TableHead>
                  <TableHead>MONTO</TableHead>
                  <TableHead>FECHA</TableHead>
                  <TableHead>ESTADO</TableHead>
                  <TableHead className="text-right">ACCIONES</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAdjudicaciones.map((adj) => (
                  <TableRow key={adj.id} className="hover:bg-slate-50">
                    <TableCell className="text-blue-600">{adj.codigo}</TableCell>
                    <TableCell className="max-w-xs">
                      <div className="truncate" title={adj.nombre}>
                        {adj.nombre}
                      </div>
                    </TableCell>
                    <TableCell className="text-slate-600">{adj.organismo}</TableCell>
                    <TableCell className="text-slate-900">{adj.adjudicatario}</TableCell>
                    <TableCell className="text-slate-900">
                      ${adj.monto.toLocaleString('es-CL')}
                    </TableCell>
                    <TableCell className="text-slate-600">
                      {new Date(adj.fecha).toLocaleDateString('es-CL')}
                    </TableCell>
                    <TableCell>{getEstadoBadge(adj.estado)}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

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
