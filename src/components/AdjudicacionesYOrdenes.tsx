import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Building2, DollarSign, Search, FileText, TrendingUp, Package, Eye, Download, ShoppingCart } from "lucide-react";

type Adjudicacion = {
  id: string;
  codigo: string;
  titulo: string;
  organismo: string;
  adjudicatario: string;
  monto: number;
  fechaAdjudicacion: string;
  plazoEjecucion: string;
  categoria: string;
  estado: "en_ejecucion" | "finalizada" | "suspendida";
};

type OrdenCompra = {
  id: string;
  codigo: string;
  titulo: string;
  organismo: string;
  proveedor: string;
  monto: number;
  fechaEmision: string;
  fechaEntrega: string;
  categoria: string;
  estado: "pendiente" | "en_proceso" | "entregada" | "cancelada";
};

const mockAdjudicaciones: Adjudicacion[] = [
  {
    id: "1",
    codigo: "ADJ-2025-001",
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
    id: "2",
    codigo: "ADJ-2025-002",
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
    id: "3",
    codigo: "ADJ-2025-003",
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
    id: "4",
    codigo: "ADJ-2025-004",
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
    id: "5",
    codigo: "ADJ-2025-005",
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
    id: "6",
    codigo: "ADJ-2025-006",
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
    id: "7",
    codigo: "ADJ-2025-007",
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
    id: "8",
    codigo: "ADJ-2025-008",
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

const mockOrdenesCompra: OrdenCompra[] = [
  {
    id: "1",
    codigo: "OC-2025-1234",
    titulo: "Suministro de Material de Oficina",
    organismo: "Ministerio de Educación",
    proveedor: "OfficeSupply Chile S.A.",
    monto: 450000,
    fechaEmision: "2025-10-25",
    fechaEntrega: "2025-11-15",
    categoria: "Suministros",
    estado: "en_proceso"
  },
  {
    id: "2",
    codigo: "OC-2025-1235",
    titulo: "Equipamiento Computacional",
    organismo: "Gobierno Regional Metropolitano",
    proveedor: "TechStore SpA",
    monto: 2800000,
    fechaEmision: "2025-10-20",
    fechaEntrega: "2025-11-30",
    categoria: "Tecnología",
    estado: "pendiente"
  },
  {
    id: "3",
    codigo: "OC-2025-1236",
    titulo: "Insumos Médicos Urgentes",
    organismo: "Hospital San Juan de Dios",
    proveedor: "MedEquip Ltda.",
    monto: 1200000,
    fechaEmision: "2025-10-18",
    fechaEntrega: "2025-10-28",
    categoria: "Salud",
    estado: "entregada"
  },
  {
    id: "4",
    codigo: "OC-2025-1237",
    titulo: "Mobiliario para Oficinas Públicas",
    organismo: "Ministerio del Interior",
    proveedor: "Muebles y Diseño S.A.",
    monto: 890000,
    fechaEmision: "2025-10-15",
    fechaEntrega: "2025-11-20",
    categoria: "Mobiliario",
    estado: "en_proceso"
  },
  {
    id: "5",
    codigo: "OC-2025-1238",
    titulo: "Licencias de Software",
    organismo: "Servicio de Impuestos Internos",
    proveedor: "Software Solutions Chile",
    monto: 3500000,
    fechaEmision: "2025-10-10",
    fechaEntrega: "2025-10-20",
    categoria: "Tecnología",
    estado: "entregada"
  },
  {
    id: "6",
    codigo: "OC-2025-1239",
    titulo: "Material de Construcción",
    organismo: "Municipalidad de Santiago",
    proveedor: "Constructora Los Andes",
    monto: 1650000,
    fechaEmision: "2025-10-05",
    fechaEntrega: "2025-11-10",
    categoria: "Infraestructura",
    estado: "en_proceso"
  },
  {
    id: "7",
    codigo: "OC-2025-1240",
    titulo: "Vehículos de Servicio",
    organismo: "Carabineros de Chile",
    proveedor: "Automotriz Nacional",
    monto: 8500000,
    fechaEmision: "2025-09-28",
    fechaEntrega: "2025-10-15",
    categoria: "Vehículos",
    estado: "cancelada"
  },
  {
    id: "8",
    codigo: "OC-2025-1241",
    titulo: "Productos de Limpieza",
    organismo: "Ministerio de Salud",
    proveedor: "Clean Pro Chile",
    monto: 320000,
    fechaEmision: "2025-10-22",
    fechaEntrega: "2025-11-05",
    categoria: "Suministros",
    estado: "pendiente"
  }
];

const categorias = ["Todas", "Infraestructura", "Salud", "Tecnología", "Consultoría", "Suministros", "Mobiliario", "Vehículos"];

export default function AdjudicacionesYOrdenes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [selectedEstadoAdj, setSelectedEstadoAdj] = useState("Todos");
  const [selectedEstadoOC, setSelectedEstadoOC] = useState("Todos");

  const filteredAdjudicaciones = useMemo(() => {
    return mockAdjudicaciones.filter((adj) => {
      const matchesSearch = 
        adj.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adj.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adj.adjudicatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
        adj.organismo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategoria = selectedCategoria === "Todas" || adj.categoria === selectedCategoria;
      const matchesEstado = selectedEstadoAdj === "Todos" || adj.estado === selectedEstadoAdj;

      return matchesSearch && matchesCategoria && matchesEstado;
    });
  }, [searchTerm, selectedCategoria, selectedEstadoAdj]);

  const filteredOrdenesCompra = useMemo(() => {
    return mockOrdenesCompra.filter((oc) => {
      const matchesSearch = 
        oc.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oc.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oc.proveedor.toLowerCase().includes(searchTerm.toLowerCase()) ||
        oc.organismo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategoria = selectedCategoria === "Todas" || oc.categoria === selectedCategoria;
      const matchesEstado = selectedEstadoOC === "Todos" || oc.estado === selectedEstadoOC;

      return matchesSearch && matchesCategoria && matchesEstado;
    });
  }, [searchTerm, selectedCategoria, selectedEstadoOC]);

  const getEstadoBadgeAdj = (estado: string) => {
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

  const getEstadoBadgeOC = (estado: string) => {
    switch (estado) {
      case "pendiente":
        return <Badge className="bg-yellow-500">Pendiente</Badge>;
      case "en_proceso":
        return <Badge className="bg-blue-500">En Proceso</Badge>;
      case "entregada":
        return <Badge className="bg-green-500">Entregada</Badge>;
      case "cancelada":
        return <Badge className="bg-red-500">Cancelada</Badge>;
      default:
        return null;
    }
  };

  const totalMontoAdj = filteredAdjudicaciones.reduce((sum, adj) => sum + adj.monto, 0);
  const totalMontoOC = filteredOrdenesCompra.reduce((sum, oc) => sum + oc.monto, 0);
  const enEjecucion = filteredAdjudicaciones.filter(adj => adj.estado === "en_ejecucion").length;
  const enProceso = filteredOrdenesCompra.filter(oc => oc.estado === "en_proceso").length;
  const finalizadas = filteredAdjudicaciones.filter(adj => adj.estado === "finalizada").length;
  const entregadas = filteredOrdenesCompra.filter(oc => oc.estado === "entregada").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">Adjudicaciones y Órdenes de Compra</h2>
        <p className="text-slate-600 mt-1">Gestiona adjudicaciones y órdenes de compra del sistema público</p>
      </div>

      <Tabs defaultValue="adjudicaciones" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-2">
          <TabsTrigger value="adjudicaciones" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Adjudicaciones
          </TabsTrigger>
          <TabsTrigger value="ordenes" className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4" />
            Órdenes de Compra
          </TabsTrigger>
        </TabsList>

        {/* Adjudicaciones Tab */}
        <TabsContent value="adjudicaciones" className="space-y-6 mt-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Total Adjudicado</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  ${totalMontoAdj.toLocaleString('es-CL')}
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

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros de Búsqueda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por código, título, adjudicatario u organismo..."
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
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedEstadoAdj} onValueChange={setSelectedEstadoAdj}>
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

          {/* Table */}
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CÓDIGO</TableHead>
                      <TableHead>TÍTULO</TableHead>
                      <TableHead>ADJUDICATARIO</TableHead>
                      <TableHead>ORGANISMO</TableHead>
                      <TableHead>MONTO</TableHead>
                      <TableHead>FECHA</TableHead>
                      <TableHead>PLAZO</TableHead>
                      <TableHead>ESTADO</TableHead>
                      <TableHead className="text-right">ACCIONES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAdjudicaciones.map((adj) => (
                      <TableRow key={adj.id} className="hover:bg-slate-50">
                        <TableCell className="text-blue-600">{adj.codigo}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={adj.titulo}>{adj.titulo}</div>
                          <Badge variant="outline" className="mt-1">{adj.categoria}</Badge>
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
                        <TableCell>{getEstadoBadgeAdj(adj.estado)}</TableCell>
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
                  <p className="text-slate-500">No se encontraron adjudicaciones</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Órdenes de Compra Tab */}
        <TabsContent value="ordenes" className="space-y-6 mt-6">
          {/* Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Monto Total OC</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  ${totalMontoOC.toLocaleString('es-CL')}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>En Proceso</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-blue-600" />
                  {enProceso} órdenes
                </CardTitle>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardDescription>Entregadas</CardDescription>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-slate-600" />
                  {entregadas} órdenes
                </CardTitle>
              </CardHeader>
            </Card>
          </div>

          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros de Búsqueda</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4 flex-col md:flex-row">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Buscar por código, título, proveedor u organismo..."
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
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={selectedEstadoOC} onValueChange={setSelectedEstadoOC}>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Estado" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Todos">Todos</SelectItem>
                    <SelectItem value="pendiente">Pendiente</SelectItem>
                    <SelectItem value="en_proceso">En Proceso</SelectItem>
                    <SelectItem value="entregada">Entregada</SelectItem>
                    <SelectItem value="cancelada">Cancelada</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Table */}
          <Card>
            <CardContent className="pt-6">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>CÓDIGO</TableHead>
                      <TableHead>TÍTULO</TableHead>
                      <TableHead>PROVEEDOR</TableHead>
                      <TableHead>ORGANISMO</TableHead>
                      <TableHead>MONTO</TableHead>
                      <TableHead>EMISIÓN</TableHead>
                      <TableHead>ENTREGA</TableHead>
                      <TableHead>ESTADO</TableHead>
                      <TableHead className="text-right">ACCIONES</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrdenesCompra.map((oc) => (
                      <TableRow key={oc.id} className="hover:bg-slate-50">
                        <TableCell className="text-blue-600">{oc.codigo}</TableCell>
                        <TableCell className="max-w-xs">
                          <div className="truncate" title={oc.titulo}>{oc.titulo}</div>
                          <Badge variant="outline" className="mt-1">{oc.categoria}</Badge>
                        </TableCell>
                        <TableCell className="text-slate-900">{oc.proveedor}</TableCell>
                        <TableCell className="text-slate-600">{oc.organismo}</TableCell>
                        <TableCell className="text-slate-900">
                          ${oc.monto.toLocaleString('es-CL')}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {new Date(oc.fechaEmision).toLocaleDateString('es-CL')}
                        </TableCell>
                        <TableCell className="text-slate-600">
                          {new Date(oc.fechaEntrega).toLocaleDateString('es-CL')}
                        </TableCell>
                        <TableCell>{getEstadoBadgeOC(oc.estado)}</TableCell>
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
              
              {filteredOrdenesCompra.length === 0 && (
                <div className="py-12 text-center">
                  <p className="text-slate-500">No se encontraron órdenes de compra</p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
