import { useState, useMemo } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { 
  Search, 
  Filter, 
  Download, 
  Star, 
  ArrowUpDown, 
  ChevronLeft, 
  ChevronRight,
  FileText,
  Eye,
  X,
  Calendar,
  DollarSign,
  GitCompare
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Calendar as CalendarComponent } from "./ui/calendar";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type Licitacion = {
  id: string;
  codigo: string;
  nombre: string;
  organismo: string;
  tipo: string;
  region: string;
  monto: number | null;
  cierre: string;
  estado: "abierta" | "cerrada" | "en_evaluacion" | "adjudicada";
  descripcion: string;
  categoria: string;
  favorito: boolean;
};

const mockLicitaciones: Licitacion[] = [
  {
    id: "1",
    codigo: "1043030-23-LE25",
    nombre: "Sistema de Admisión Escolar 2025 Período complementario y de regularización Región de Ñuble",
    organismo: "Ministerio de Educación",
    tipo: "LE",
    region: "Ñuble",
    monto: null,
    cierre: "2025-11-03",
    estado: "abierta",
    descripcion: "Sistema de admisión escolar complementario",
    categoria: "Tecnología",
    favorito: false
  },
  {
    id: "2",
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
    favorito: false
  },
  {
    id: "3",
    codigo: "1030-28-LE25",
    nombre: "REPARACIÓN DEL SISTEMA ELECTRICO DE TALLER Y EMPALME ELECTRICO",
    organismo: "Empresa Portuaria Valparaíso",
    tipo: "LE",
    region: "Valparaíso",
    monto: 12500000,
    cierre: "2025-11-10",
    estado: "abierta",
    descripcion: "Reparación y mantenimiento sistema eléctrico",
    categoria: "Infraestructura",
    favorito: false
  },
  {
    id: "4",
    codigo: "1037-17-LE25",
    nombre: "IMPLEMENTACIÓN Y CAPACITACIÓN SISTEMAS DE RIEGO",
    organismo: "INDAP",
    tipo: "LE",
    region: "Maule",
    monto: 28000000,
    cierre: "2025-11-06",
    estado: "abierta",
    descripcion: "Implementación de sistemas de riego tecnificado",
    categoria: "Consultoría",
    favorito: false
  },
  {
    id: "5",
    codigo: "1043046-16-LE25",
    nombre: "CONSERVACIÓN SISTEMA CONTROL DE TRÁNSITO ÑUBLE 5.",
    organismo: "Ministerio de Obras Públicas",
    tipo: "LR",
    region: "Ñuble",
    monto: 85000000,
    cierre: "2025-11-17",
    estado: "abierta",
    descripcion: "Mantenimiento sistema control de tránsito",
    categoria: "Infraestructura",
    favorito: false
  },
  {
    id: "6",
    codigo: "1043-30-LE25",
    nombre: "Adquisición de Emulsión Asfáltica de Quiebre Lento",
    organismo: "Dirección de Vialidad",
    tipo: "LE",
    region: "Biobío",
    monto: 32000000,
    cierre: "2025-11-04",
    estado: "abierta",
    descripcion: "Suministro de emulsión asfáltica para obras viales",
    categoria: "Infraestructura",
    favorito: false
  },
  {
    id: "7",
    codigo: "1042-18-LE25",
    nombre: "Suministro de Equipos Médicos Hospital Regional",
    organismo: "Servicio de Salud Metropolitano Central",
    tipo: "LP",
    region: "Metropolitana",
    monto: 125000000,
    cierre: "2025-11-15",
    estado: "en_evaluacion",
    descripcion: "Adquisición de equipamiento médico de última generación",
    categoria: "Salud",
    favorito: false
  },
  {
    id: "8",
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
    favorito: false
  },
  {
    id: "9",
    codigo: "1040-12-LE25",
    nombre: "Consultoría Evaluación Ambiental Estratégica",
    organismo: "Ministerio del Medio Ambiente",
    tipo: "LE",
    region: "Los Lagos",
    monto: 18500000,
    cierre: "2025-11-08",
    estado: "abierta",
    descripcion: "Evaluación de impacto ambiental de proyectos regionales",
    categoria: "Consultoría",
    favorito: false
  },
  {
    id: "10",
    codigo: "1039-45-LE25",
    nombre: "Adquisición de Medicamentos Oncológicos",
    organismo: "CENABAST",
    tipo: "LP",
    region: "Nacional",
    monto: 250000000,
    cierre: "2025-11-12",
    estado: "abierta",
    descripcion: "Provisión anual de medicamentos oncológicos",
    categoria: "Salud",
    favorito: false
  },
  {
    id: "11",
    codigo: "1038-33-LE25",
    nombre: "Construcción Biblioteca Pública Municipal",
    organismo: "Municipalidad de Puerto Montt",
    tipo: "LR",
    region: "Los Lagos",
    monto: 450000000,
    cierre: "2025-11-25",
    estado: "abierta",
    descripcion: "Construcción de biblioteca con sala multimedia",
    categoria: "Infraestructura",
    favorito: false
  },
  {
    id: "12",
    codigo: "1037-89-LE25",
    nombre: "Sistema Gestión Documental Institucional",
    organismo: "Ministerio del Interior",
    tipo: "LE",
    region: "Metropolitana",
    monto: 42000000,
    cierre: "2025-11-09",
    estado: "cerrada",
    descripcion: "Implementación de sistema de gestión documental",
    categoria: "Tecnología",
    favorito: false
  }
];

const regiones = [
  "Todas",
  "Nacional",
  "Metropolitana",
  "Valparaíso",
  "Biobío",
  "Maule",
  "Ñuble",
  "Los Lagos"
];

const tipos = ["Todos", "LE", "LP", "LR", "LQ"];
const estados = ["Todos", "abierta", "cerrada", "en_evaluacion", "adjudicada"];
const categorias = ["Todas", "Infraestructura", "Salud", "Tecnología", "Consultoría"];

type LicitacionesBuscadorProps = {
  onOpenComparador?: () => void;
};

export default function LicitacionesBuscador({ onOpenComparador }: LicitacionesBuscadorProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("Todas");
  const [selectedTipo, setSelectedTipo] = useState("Todos");
  const [selectedEstado, setSelectedEstado] = useState("Todos");
  const [selectedCategoria, setSelectedCategoria] = useState("Todas");
  const [montoMin, setMontoMin] = useState("");
  const [montoMax, setMontoMax] = useState("");
  const [fechaDesde, setFechaDesde] = useState<Date | undefined>();
  const [fechaHasta, setFechaHasta] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortField, setSortField] = useState<keyof Licitacion>("cierre");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");
  const [licitaciones, setLicitaciones] = useState(mockLicitaciones);
  const [selectedLicitacion, setSelectedLicitacion] = useState<Licitacion | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredLicitaciones = useMemo(() => {
    return licitaciones.filter((lic) => {
      const matchesSearch = 
        lic.codigo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lic.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lic.organismo.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesRegion = selectedRegion === "Todas" || lic.region === selectedRegion;
      const matchesTipo = selectedTipo === "Todos" || lic.tipo === selectedTipo;
      const matchesEstado = selectedEstado === "Todos" || lic.estado === selectedEstado;
      const matchesCategoria = selectedCategoria === "Todas" || lic.categoria === selectedCategoria;
      
      const matchesMontoMin = !montoMin || (lic.monto && lic.monto >= parseInt(montoMin));
      const matchesMontoMax = !montoMax || (lic.monto && lic.monto <= parseInt(montoMax));
      
      const matchesFechaDesde = !fechaDesde || new Date(lic.cierre) >= fechaDesde;
      const matchesFechaHasta = !fechaHasta || new Date(lic.cierre) <= fechaHasta;

      return matchesSearch && matchesRegion && matchesTipo && matchesEstado && 
             matchesCategoria && matchesMontoMin && matchesMontoMax && 
             matchesFechaDesde && matchesFechaHasta;
    });
  }, [searchTerm, selectedRegion, selectedTipo, selectedEstado, selectedCategoria, montoMin, montoMax, fechaDesde, fechaHasta, licitaciones]);

  const sortedLicitaciones = useMemo(() => {
    return [...filteredLicitaciones].sort((a, b) => {
      let aVal = a[sortField];
      let bVal = b[sortField];
      
      if (aVal === null) return 1;
      if (bVal === null) return -1;
      
      if (sortDirection === "asc") {
        return aVal > bVal ? 1 : -1;
      } else {
        return aVal < bVal ? 1 : -1;
      }
    });
  }, [filteredLicitaciones, sortField, sortDirection]);

  const totalPages = Math.ceil(sortedLicitaciones.length / itemsPerPage);
  const paginatedLicitaciones = sortedLicitaciones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field: keyof Licitacion) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const toggleFavorito = (id: string) => {
    setLicitaciones(prev => prev.map(lic => 
      lic.id === id ? { ...lic, favorito: !lic.favorito } : lic
    ));
  };

  const getEstadoBadge = (estado: string) => {
    switch (estado) {
      case "abierta":
        return <Badge className="bg-green-500">Abierta</Badge>;
      case "cerrada":
        return <Badge className="bg-gray-500">Cerrada</Badge>;
      case "en_evaluacion":
        return <Badge className="bg-blue-500">En Evaluación</Badge>;
      case "adjudicada":
        return <Badge className="bg-purple-500">Adjudicada</Badge>;
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

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedRegion("Todas");
    setSelectedTipo("Todos");
    setSelectedEstado("Todos");
    setSelectedCategoria("Todas");
    setMontoMin("");
    setMontoMax("");
    setFechaDesde(undefined);
    setFechaHasta(undefined);
  };

  const activeFiltersCount = [
    selectedRegion !== "Todas",
    selectedTipo !== "Todos",
    selectedEstado !== "Todos",
    selectedCategoria !== "Todas",
    montoMin !== "",
    montoMax !== "",
    fechaDesde,
    fechaHasta
  ].filter(Boolean).length;

  const exportToCSV = () => {
    const headers = ["Código", "Nombre", "Organismo", "Tipo", "Región", "Monto", "Cierre", "Estado"];
    const rows = sortedLicitaciones.map(lic => [
      lic.codigo,
      lic.nombre,
      lic.organismo,
      lic.tipo,
      lic.region,
      lic.monto || "",
      lic.cierre,
      lic.estado
    ]);
    
    const csvContent = [
      headers.join(","),
      ...rows.map(row => row.join(","))
    ].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "licitaciones.csv";
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h2 className="text-slate-900">Búsqueda</h2>
        <p className="text-slate-600 mt-1">Encuentra y gestiona licitaciones públicas</p>
      </div>

      {/* Search and Actions */}
      <div className="flex gap-4 flex-col md:flex-row">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Buscar por nombre o código..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={showFilters ? "default" : "outline"}
            onClick={() => setShowFilters(!showFilters)}
            className="relative"
          >
            <Filter className="w-4 h-4 mr-2" />
            Filtros
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
          <Button variant="outline" onClick={exportToCSV}>
            <Download className="w-4 h-4 mr-2" />
            Exportar
          </Button>
          {onOpenComparador && (
            <Button variant="outline" onClick={onOpenComparador}>
              <GitCompare className="w-4 h-4 mr-2" />
              Comparar
            </Button>
          )}
        </div>
      </div>

      {/* Advanced Filters */}
      {showFilters && (
        <Card className="p-4 bg-slate-50">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-slate-900">Filtros Avanzados</h3>
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="w-4 h-4 mr-2" />
              Limpiar filtros
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-slate-700 mb-2 block">Región</label>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regiones.map((region) => (
                    <SelectItem key={region} value={region}>{region}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-slate-700 mb-2 block">Tipo</label>
              <Select value={selectedTipo} onValueChange={setSelectedTipo}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tipos.map((tipo) => (
                    <SelectItem key={tipo} value={tipo}>{tipo}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="text-slate-700 mb-2 block">Estado</label>
              <Select value={selectedEstado} onValueChange={setSelectedEstado}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {estados.map((estado) => (
                    <SelectItem key={estado} value={estado}>
                      {estado === "Todos" ? "Todos" :
                       estado === "abierta" ? "Abierta" :
                       estado === "cerrada" ? "Cerrada" :
                       estado === "en_evaluacion" ? "En Evaluación" : "Adjudicada"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
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

            <div>
              <label className="text-slate-700 mb-2 block">Monto Mínimo</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="number"
                  placeholder="0"
                  value={montoMin}
                  onChange={(e) => setMontoMin(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 mb-2 block">Monto Máximo</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="number"
                  placeholder="∞"
                  value={montoMax}
                  onChange={(e) => setMontoMax(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>

            <div>
              <label className="text-slate-700 mb-2 block">Cierre Desde</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="mr-2 h-4 w-4" />
                    {fechaDesde ? format(fechaDesde, "PPP", { locale: es }) : "Seleccionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={fechaDesde}
                    onSelect={setFechaDesde}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div>
              <label className="text-slate-700 mb-2 block">Cierre Hasta</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left">
                    <Calendar className="mr-2 h-4 w-4" />
                    {fechaHasta ? format(fechaHasta, "PPP", { locale: es }) : "Seleccionar"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <CalendarComponent
                    mode="single"
                    selected={fechaHasta}
                    onSelect={setFechaHasta}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </Card>
      )}

      {/* Results Info */}
      <div className="flex justify-between items-center">
        <p className="text-slate-600">
          Mostrando {paginatedLicitaciones.length} de {sortedLicitaciones.length} licitaciones
        </p>
        <div className="flex items-center gap-2">
          <span className="text-slate-600">Mostrar:</span>
          <Select value={itemsPerPage.toString()} onValueChange={(val) => {
            setItemsPerPage(parseInt(val));
            setCurrentPage(1);
          }}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="10">10</SelectItem>
              <SelectItem value="25">25</SelectItem>
              <SelectItem value="50">50</SelectItem>
              <SelectItem value="100">100</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <Card>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("codigo")}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    CÓDIGO
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("nombre")}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    NOMBRE
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("organismo")}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    ORGANISMO
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </TableHead>
                <TableHead>TIPO</TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("monto")}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    MONTO
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </TableHead>
                <TableHead>
                  <button
                    onClick={() => handleSort("cierre")}
                    className="flex items-center gap-1 hover:text-blue-600"
                  >
                    CIERRE
                    <ArrowUpDown className="w-3 h-3" />
                  </button>
                </TableHead>
                <TableHead>ESTADO</TableHead>
                <TableHead className="text-right">ACCIONES</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedLicitaciones.map((lic) => (
                <TableRow key={lic.id} className="hover:bg-slate-50">
                  <TableCell>
                    <button
                      onClick={() => toggleFavorito(lic.id)}
                      className={`${lic.favorito ? "text-yellow-500" : "text-slate-300"} hover:text-yellow-500`}
                    >
                      <Star className={`w-4 h-4 ${lic.favorito ? "fill-current" : ""}`} />
                    </button>
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => setSelectedLicitacion(lic)}
                      className="text-blue-600 hover:underline"
                    >
                      {lic.codigo}
                    </button>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="truncate" title={lic.nombre}>
                      {lic.nombre}
                    </div>
                  </TableCell>
                  <TableCell className="text-slate-600">{lic.organismo}</TableCell>
                  <TableCell>{getTipoBadge(lic.tipo)}</TableCell>
                  <TableCell className="text-slate-900">
                    {lic.monto ? `$${lic.monto.toLocaleString('es-CL')}` : "-"}
                  </TableCell>
                  <TableCell className="text-slate-600">
                    {new Date(lic.cierre).toLocaleDateString('es-CL')}
                  </TableCell>
                  <TableCell>{getEstadoBadge(lic.estado)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex gap-1 justify-end">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedLicitacion(lic)}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <FileText className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {paginatedLicitaciones.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-slate-500">No se encontraron licitaciones con los filtros seleccionados</p>
          </div>
        )}
      </Card>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          {[...Array(Math.min(5, totalPages))].map((_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}
          
          {totalPages > 5 && currentPage < totalPages - 2 && (
            <>
              <span className="text-slate-400">...</span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(totalPages)}
              >
                {totalPages}
              </Button>
            </>
          )}
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Detail Modal */}
      {selectedLicitacion && (
        <Dialog open={!!selectedLicitacion} onOpenChange={() => setSelectedLicitacion(null)}>
          <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-start justify-between gap-4">
                <span>{selectedLicitacion.nombre}</span>
                <button
                  onClick={() => toggleFavorito(selectedLicitacion.id)}
                  className={`${selectedLicitacion.favorito ? "text-yellow-500" : "text-slate-300"} hover:text-yellow-500`}
                >
                  <Star className={`w-5 h-5 ${selectedLicitacion.favorito ? "fill-current" : ""}`} />
                </button>
              </DialogTitle>
              <DialogDescription>
                Código: {selectedLicitacion.codigo}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-6 mt-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-slate-600 mb-1">Organismo</p>
                  <p className="text-slate-900">{selectedLicitacion.organismo}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Estado</p>
                  {getEstadoBadge(selectedLicitacion.estado)}
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Tipo</p>
                  {getTipoBadge(selectedLicitacion.tipo)}
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Categoría</p>
                  <Badge variant="outline">{selectedLicitacion.categoria}</Badge>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Región</p>
                  <p className="text-slate-900">{selectedLicitacion.region}</p>
                </div>
                <div>
                  <p className="text-slate-600 mb-1">Fecha de Cierre</p>
                  <p className="text-slate-900">
                    {new Date(selectedLicitacion.cierre).toLocaleDateString('es-CL')}
                  </p>
                </div>
                <div className="col-span-2">
                  <p className="text-slate-600 mb-1">Monto</p>
                  <p className="text-slate-900">
                    {selectedLicitacion.monto 
                      ? `$${selectedLicitacion.monto.toLocaleString('es-CL')}`
                      : "No especificado"}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-slate-600 mb-2">Descripción</p>
                <p className="text-slate-900">{selectedLicitacion.descripcion}</p>
              </div>

              <div className="flex gap-2 pt-4">
                <Button className="flex-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Ver Bases Técnicas
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Descargar Documentos
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
