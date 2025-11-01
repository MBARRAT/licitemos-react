import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Save, Trash2, Search, Edit2, Check, X, Star } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { kvStore } from "../utils/supabase/client";

type BusquedaGuardada = {
  id: string;
  nombre: string;
  descripcion: string;
  filtros: {
    searchTerm?: string;
    categoria?: string;
    region?: string;
    tipo?: string;
    estado?: string;
    montoMin?: string;
    montoMax?: string;
  };
  favorita: boolean;
  fechaCreacion: string;
  ultimoUso: string;
  cantidadUsos: number;
};

const mockBusquedas: BusquedaGuardada[] = [
  {
    id: "1",
    nombre: "Licitaciones de Tecnología RM",
    descripcion: "Búsqueda de proyectos tecnológicos en la Región Metropolitana",
    filtros: {
      categoria: "Tecnología",
      region: "Metropolitana",
      estado: "abierta"
    },
    favorita: true,
    fechaCreacion: "2025-10-15",
    ultimoUso: "2025-11-01",
    cantidadUsos: 23
  },
  {
    id: "2",
    nombre: "Infraestructura sobre $50M",
    descripcion: "Proyectos de infraestructura con monto superior a 50 millones",
    filtros: {
      categoria: "Infraestructura",
      montoMin: "50000000"
    },
    favorita: true,
    fechaCreacion: "2025-10-20",
    ultimoUso: "2025-10-31",
    cantidadUsos: 15
  },
  {
    id: "3",
    nombre: "Salud Nacional",
    descripcion: "Todas las licitaciones del área de salud a nivel nacional",
    filtros: {
      categoria: "Salud",
      region: "Nacional"
    },
    favorita: false,
    fechaCreacion: "2025-10-10",
    ultimoUso: "2025-10-28",
    cantidadUsos: 8
  }
];

export default function BusquedasGuardadas() {
  const [busquedas, setBusquedas] = useState<BusquedaGuardada[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");

  useEffect(() => {
    const loadBusquedas = async () => {
      try {
        const saved = await kvStore.get("busquedas_guardadas");
        if (saved) {
          setBusquedas(saved as BusquedaGuardada[]);
        } else {
          setBusquedas(mockBusquedas);
        }
      } catch (error) {
        console.error("Error loading saved searches:", error);
        setBusquedas(mockBusquedas);
      }
    };
    loadBusquedas();
  }, []);

  const saveBusquedas = async (newBusquedas: BusquedaGuardada[]) => {
    try {
      await kvStore.set("busquedas_guardadas", newBusquedas);
      setBusquedas(newBusquedas);
    } catch (error) {
      console.error("Error saving searches:", error);
      toast.error("Error al guardar");
    }
  };

  const toggleFavorita = (id: string) => {
    const updated = busquedas.map(b => 
      b.id === id ? { ...b, favorita: !b.favorita } : b
    );
    saveBusquedas(updated);
    toast.success("Búsqueda actualizada");
  };

  const deleteBusqueda = (id: string) => {
    const updated = busquedas.filter(b => b.id !== id);
    saveBusquedas(updated);
    toast.success("Búsqueda eliminada");
  };

  const startEdit = (busqueda: BusquedaGuardada) => {
    setEditingId(busqueda.id);
    setEditNombre(busqueda.nombre);
    setEditDescripcion(busqueda.descripcion);
  };

  const saveEdit = () => {
    if (!editingId) return;
    
    const updated = busquedas.map(b => 
      b.id === editingId 
        ? { ...b, nombre: editNombre, descripcion: editDescripcion }
        : b
    );
    saveBusquedas(updated);
    setEditingId(null);
    toast.success("Búsqueda actualizada");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditNombre("");
    setEditDescripcion("");
  };

  const aplicarBusqueda = (busqueda: BusquedaGuardada) => {
    // Update last use
    const updated = busquedas.map(b => 
      b.id === busqueda.id 
        ? { 
            ...b, 
            ultimoUso: new Date().toISOString().split('T')[0],
            cantidadUsos: b.cantidadUsos + 1
          }
        : b
    );
    saveBusquedas(updated);
    toast.success(`Aplicando filtros: ${busqueda.nombre}`);
  };

  const getFiltrosTexto = (filtros: BusquedaGuardada['filtros']) => {
    const parts: string[] = [];
    if (filtros.searchTerm) parts.push(`Búsqueda: "${filtros.searchTerm}"`);
    if (filtros.categoria && filtros.categoria !== "Todas") parts.push(`Categoría: ${filtros.categoria}`);
    if (filtros.region && filtros.region !== "Todas") parts.push(`Región: ${filtros.region}`);
    if (filtros.tipo && filtros.tipo !== "Todos") parts.push(`Tipo: ${filtros.tipo}`);
    if (filtros.estado && filtros.estado !== "Todos") parts.push(`Estado: ${filtros.estado}`);
    if (filtros.montoMin) parts.push(`Monto mín: $${parseInt(filtros.montoMin).toLocaleString('es-CL')}`);
    if (filtros.montoMax) parts.push(`Monto máx: $${parseInt(filtros.montoMax).toLocaleString('es-CL')}`);
    return parts;
  };

  const favoritas = busquedas.filter(b => b.favorita);
  const otras = busquedas.filter(b => !b.favorita);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-slate-900">Búsquedas Guardadas</h2>
          <p className="text-slate-600 mt-1">
            Accede rápidamente a tus búsquedas más frecuentes
          </p>
        </div>
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Nueva Búsqueda
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Total Guardadas</CardDescription>
            <CardTitle>{busquedas.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Favoritas</CardDescription>
            <CardTitle>{favoritas.length}</CardTitle>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardDescription>Usos Totales</CardDescription>
            <CardTitle>{busquedas.reduce((sum, b) => sum + b.cantidadUsos, 0)}</CardTitle>
          </CardHeader>
        </Card>
      </div>

      {/* Favoritas */}
      {favoritas.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-slate-900 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            Favoritas
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {favoritas.map((busqueda) => (
              <Card key={busqueda.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {editingId === busqueda.id ? (
                        <Input
                          value={editNombre}
                          onChange={(e) => setEditNombre(e.target.value)}
                          className="mb-2"
                        />
                      ) : (
                        <CardTitle className="text-slate-900">{busqueda.nombre}</CardTitle>
                      )}
                      {editingId === busqueda.id ? (
                        <Input
                          value={editDescripcion}
                          onChange={(e) => setEditDescripcion(e.target.value)}
                          placeholder="Descripción"
                        />
                      ) : (
                        <CardDescription>{busqueda.descripcion}</CardDescription>
                      )}
                    </div>
                    <button
                      onClick={() => toggleFavorita(busqueda.id)}
                      className="text-yellow-500"
                    >
                      <Star className="w-5 h-5 fill-yellow-500" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {getFiltrosTexto(busqueda.filtros).map((filtro, i) => (
                      <Badge key={i} variant="outline">{filtro}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Usada {busqueda.cantidadUsos} veces</span>
                    <span>Última: {new Date(busqueda.ultimoUso).toLocaleDateString('es-CL')}</span>
                  </div>
                  <div className="flex gap-2">
                    {editingId === busqueda.id ? (
                      <>
                        <Button size="sm" onClick={saveEdit} className="flex-1">
                          <Check className="w-4 h-4 mr-1" />
                          Guardar
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit} className="flex-1">
                          <X className="w-4 h-4 mr-1" />
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" onClick={() => aplicarBusqueda(busqueda)} className="flex-1">
                          <Search className="w-4 h-4 mr-1" />
                          Aplicar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => startEdit(busqueda)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => deleteBusqueda(busqueda.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Otras Búsquedas */}
      {otras.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-slate-900">Otras Búsquedas</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {otras.map((busqueda) => (
              <Card key={busqueda.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      {editingId === busqueda.id ? (
                        <Input
                          value={editNombre}
                          onChange={(e) => setEditNombre(e.target.value)}
                          className="mb-2"
                        />
                      ) : (
                        <CardTitle className="text-slate-900">{busqueda.nombre}</CardTitle>
                      )}
                      {editingId === busqueda.id ? (
                        <Input
                          value={editDescripcion}
                          onChange={(e) => setEditDescripcion(e.target.value)}
                          placeholder="Descripción"
                        />
                      ) : (
                        <CardDescription>{busqueda.descripcion}</CardDescription>
                      )}
                    </div>
                    <button
                      onClick={() => toggleFavorita(busqueda.id)}
                      className="text-slate-300 hover:text-yellow-500"
                    >
                      <Star className="w-5 h-5" />
                    </button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-2">
                    {getFiltrosTexto(busqueda.filtros).map((filtro, i) => (
                      <Badge key={i} variant="outline">{filtro}</Badge>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-slate-600">
                    <span>Usada {busqueda.cantidadUsos} veces</span>
                    <span>Última: {new Date(busqueda.ultimoUso).toLocaleDateString('es-CL')}</span>
                  </div>
                  <div className="flex gap-2">
                    {editingId === busqueda.id ? (
                      <>
                        <Button size="sm" onClick={saveEdit} className="flex-1">
                          <Check className="w-4 h-4 mr-1" />
                          Guardar
                        </Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit} className="flex-1">
                          <X className="w-4 h-4 mr-1" />
                          Cancelar
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button size="sm" onClick={() => aplicarBusqueda(busqueda)} className="flex-1">
                          <Search className="w-4 h-4 mr-1" />
                          Aplicar
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => startEdit(busqueda)}>
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => deleteBusqueda(busqueda.id)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {busquedas.length === 0 && (
        <Card>
          <CardContent className="py-16 text-center">
            <Save className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500 mb-2">No tienes búsquedas guardadas</p>
            <p className="text-slate-400">
              Guarda tus búsquedas frecuentes para acceder a ellas rápidamente
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
