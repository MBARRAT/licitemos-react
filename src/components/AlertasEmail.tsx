import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Switch } from "./ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Bell, Plus, Trash2, Mail, Clock, Tag, Save, AlertCircle } from "lucide-react";
import { toast } from "sonner@2.0.3";
import { kvStore } from "../utils/supabase/client";

type PalabraClave = {
  id: string;
  palabra: string;
  categoria: string;
  region: string;
  montoMin: string;
  activa: boolean;
};

type ConfiguracionAlertas = {
  emailActivo: boolean;
  frecuencia: "diario" | "semanal" | "instantaneo";
  horario: string;
  palabrasClave: PalabraClave[];
};

const categorias = ["Todas", "Infraestructura", "Salud", "Tecnología", "Consultoría"];
const regiones = ["Todas", "Nacional", "Metropolitana", "Valparaíso", "Biobío", "Maule", "Ñuble", "Los Lagos"];

export default function AlertasEmail() {
  const [config, setConfig] = useState<ConfiguracionAlertas>({
    emailActivo: false,
    frecuencia: "diario",
    horario: "09:00",
    palabrasClave: []
  });

  const [nuevaPalabra, setNuevaPalabra] = useState("");
  const [nuevaCategoria, setNuevaCategoria] = useState("Todas");
  const [nuevaRegion, setNuevaRegion] = useState("Todas");
  const [nuevoMontoMin, setNuevoMontoMin] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [planLimite, setPlanLimite] = useState(3); // Básico = 3 palabras clave

  // Load configuration from KV store
  useEffect(() => {
    const loadConfig = async () => {
      try {
        const savedConfig = await kvStore.get("alertas_config");
        if (savedConfig) {
          setConfig(savedConfig as ConfiguracionAlertas);
        }
      } catch (error) {
        console.error("Error loading config:", error);
      }
    };
    loadConfig();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await kvStore.set("alertas_config", config);
      toast.success("Configuración guardada correctamente");
    } catch (error) {
      toast.error("Error al guardar la configuración");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const agregarPalabraClave = () => {
    if (!nuevaPalabra.trim()) {
      toast.error("Debes ingresar una palabra clave");
      return;
    }

    if (config.palabrasClave.length >= planLimite) {
      toast.error(`Tu plan permite máximo ${planLimite} palabras clave. Actualiza tu plan para agregar más.`);
      return;
    }

    const nueva: PalabraClave = {
      id: Date.now().toString(),
      palabra: nuevaPalabra.trim(),
      categoria: nuevaCategoria,
      region: nuevaRegion,
      montoMin: nuevoMontoMin,
      activa: true
    };

    setConfig({
      ...config,
      palabrasClave: [...config.palabrasClave, nueva]
    });

    // Reset form
    setNuevaPalabra("");
    setNuevaCategoria("Todas");
    setNuevaRegion("Todas");
    setNuevoMontoMin("");
    
    toast.success("Palabra clave agregada");
  };

  const eliminarPalabraClave = (id: string) => {
    setConfig({
      ...config,
      palabrasClave: config.palabrasClave.filter(p => p.id !== id)
    });
    toast.success("Palabra clave eliminada");
  };

  const togglePalabraClave = (id: string) => {
    setConfig({
      ...config,
      palabrasClave: config.palabrasClave.map(p => 
        p.id === id ? { ...p, activa: !p.activa } : p
      )
    });
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">Alertas por Email</h2>
        <p className="text-slate-600 mt-1">
          Configura alertas automáticas para recibir notificaciones sobre nuevas licitaciones que coincidan con tus intereses
        </p>
      </div>

      {/* Plan Alert */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="flex items-start gap-3 pt-6">
          <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
          <div>
            <p className="text-blue-900">
              Tu plan <strong>Básico</strong> permite configurar hasta {planLimite} palabras clave.
            </p>
            <p className="text-blue-700 mt-1">
              Estás usando {config.palabrasClave.length} de {planLimite}. 
              <button className="text-blue-600 hover:underline ml-1">Actualiza a Profesional</button> para alertas ilimitadas.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Email Configuration */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-5 h-5" />
            Configuración de Email
          </CardTitle>
          <CardDescription>Define cómo y cuándo quieres recibir las alertas</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
            <div>
              <p className="text-slate-900">Activar alertas por email</p>
              <p className="text-slate-600">Recibe notificaciones en tu correo electrónico</p>
            </div>
            <Switch
              checked={config.emailActivo}
              onCheckedChange={(checked) => setConfig({ ...config, emailActivo: checked })}
            />
          </div>

          {config.emailActivo && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pl-4 border-l-2 border-blue-200">
              <div className="space-y-2">
                <Label htmlFor="frecuencia">Frecuencia de Envío</Label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Select 
                    value={config.frecuencia} 
                    onValueChange={(value: "diario" | "semanal" | "instantaneo") => 
                      setConfig({ ...config, frecuencia: value })
                    }
                  >
                    <SelectTrigger className="pl-10">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="instantaneo">Instantáneo (cada nueva licitación)</SelectItem>
                      <SelectItem value="diario">Resumen Diario</SelectItem>
                      <SelectItem value="semanal">Resumen Semanal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {config.frecuencia !== "instantaneo" && (
                <div className="space-y-2">
                  <Label htmlFor="horario">Horario de Envío</Label>
                  <Input
                    id="horario"
                    type="time"
                    value={config.horario}
                    onChange={(e) => setConfig({ ...config, horario: e.target.value })}
                  />
                </div>
              )}

              <div className="md:col-span-2">
                <p className="text-slate-600">
                  {config.frecuencia === "instantaneo" && "Recibirás un email cada vez que se publique una licitación que coincida con tus palabras clave."}
                  {config.frecuencia === "diario" && `Recibirás un resumen diario a las ${config.horario} con todas las licitaciones del día.`}
                  {config.frecuencia === "semanal" && `Recibirás un resumen semanal cada lunes a las ${config.horario}.`}
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Keyword */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Tag className="w-5 h-5" />
            Agregar Palabra Clave
          </CardTitle>
          <CardDescription>
            Define palabras clave y filtros para recibir alertas personalizadas
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="palabra">Palabra Clave *</Label>
              <Input
                id="palabra"
                placeholder="Ej: construcción, tecnología, salud..."
                value={nuevaPalabra}
                onChange={(e) => setNuevaPalabra(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && agregarPalabraClave()}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="categoria">Categoría</Label>
              <Select value={nuevaCategoria} onValueChange={setNuevaCategoria}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categorias.map(cat => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="region">Región</Label>
              <Select value={nuevaRegion} onValueChange={setNuevaRegion}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {regiones.map(reg => (
                    <SelectItem key={reg} value={reg}>{reg}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="montoMin">Monto Mínimo (opcional)</Label>
              <Input
                id="montoMin"
                type="number"
                placeholder="$0"
                value={nuevoMontoMin}
                onChange={(e) => setNuevoMontoMin(e.target.value)}
              />
            </div>
          </div>

          <Button onClick={agregarPalabraClave} className="w-full md:w-auto">
            <Plus className="w-4 h-4 mr-2" />
            Agregar Palabra Clave
          </Button>
        </CardContent>
      </Card>

      {/* Keywords List */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Palabras Clave Activas ({config.palabrasClave.filter(p => p.activa).length})
            </span>
            <Badge variant="outline">
              {config.palabrasClave.length} / {planLimite}
            </Badge>
          </CardTitle>
          <CardDescription>
            Gestiona tus palabras clave y filtros de búsqueda
          </CardDescription>
        </CardHeader>
        <CardContent>
          {config.palabrasClave.length === 0 ? (
            <div className="text-center py-12">
              <Bell className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500">No has agregado palabras clave aún</p>
              <p className="text-slate-400 mt-1">Agrega palabras clave para recibir alertas personalizadas</p>
            </div>
          ) : (
            <div className="space-y-3">
              {config.palabrasClave.map((palabra) => (
                <div 
                  key={palabra.id} 
                  className={`flex items-center justify-between p-4 rounded-lg border ${
                    palabra.activa ? 'bg-white border-slate-200' : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-4 flex-1">
                    <Switch
                      checked={palabra.activa}
                      onCheckedChange={() => togglePalabraClave(palabra.id)}
                    />
                    <div className="flex-1">
                      <p className="text-slate-900">{palabra.palabra}</p>
                      <div className="flex gap-2 mt-1 flex-wrap">
                        <Badge variant="outline" className="text-blue-600 border-blue-200">
                          {palabra.categoria}
                        </Badge>
                        <Badge variant="outline" className="text-purple-600 border-purple-200">
                          {palabra.region}
                        </Badge>
                        {palabra.montoMin && (
                          <Badge variant="outline" className="text-green-600 border-green-200">
                            Desde ${parseInt(palabra.montoMin).toLocaleString('es-CL')}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => eliminarPalabraClave(palabra.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button onClick={handleSave} disabled={isSaving}>
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? "Guardando..." : "Guardar Configuración"}
        </Button>
        <Button variant="outline">
          Probar Alerta
        </Button>
      </div>

      {/* Info Card */}
      <Card className="bg-slate-50">
        <CardHeader>
          <CardTitle>¿Cómo funcionan las alertas?</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-slate-700">
            1. <strong>Agrega palabras clave</strong>: Define los términos que te interesan
          </p>
          <p className="text-slate-700">
            2. <strong>Configura filtros</strong>: Refina por categoría, región y monto
          </p>
          <p className="text-slate-700">
            3. <strong>Elige la frecuencia</strong>: Decide cuándo quieres recibir las notificaciones
          </p>
          <p className="text-slate-700">
            4. <strong>Recibe alertas</strong>: Te notificaremos cuando aparezcan licitaciones que coincidan
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
