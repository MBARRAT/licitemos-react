import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { User, Mail, Phone, Building, MapPin, Save, Camera, Key, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { kvStore } from "../utils/supabase/client";

type UserProfile = {
  nombre: string;
  email: string;
  telefono: string;
  empresa: string;
  cargo: string;
  direccion: string;
  ciudad: string;
  region: string;
  rut: string;
  plan: string;
};

export default function Perfil() {
  const [profile, setProfile] = useState<UserProfile>({
    nombre: "Administrador",
    email: "admin@licitemos.cl",
    telefono: "+56 9 1234 5678",
    empresa: "Mi Empresa SpA",
    cargo: "Gerente de Licitaciones",
    direccion: "Av. Libertador Bernardo O'Higgins 1234",
    ciudad: "Santiago",
    region: "Metropolitana",
    rut: "12.345.678-9",
    plan: "Básico"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Load profile from KV store
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedProfile = await kvStore.get("user_profile");
        if (savedProfile) {
          setProfile(savedProfile as UserProfile);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await kvStore.set("user_profile", profile);
      toast.success("Perfil actualizado correctamente");
      setIsEditing(false);
    } catch (error) {
      toast.error("Error al guardar el perfil");
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reload profile
    const loadProfile = async () => {
      try {
        const savedProfile = await kvStore.get("user_profile");
        if (savedProfile) {
          setProfile(savedProfile as UserProfile);
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h2 className="text-slate-900">Mi Perfil</h2>
        <p className="text-slate-600 mt-1">Administra tu información personal y configuración de cuenta</p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="personal">Información Personal</TabsTrigger>
          <TabsTrigger value="seguridad">Seguridad</TabsTrigger>
          <TabsTrigger value="suscripcion">Suscripción</TabsTrigger>
        </TabsList>

        {/* Personal Information Tab */}
        <TabsContent value="personal" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Datos Personales</CardTitle>
                  <CardDescription>Actualiza tu información de perfil</CardDescription>
                </div>
                <div className="flex items-center gap-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-blue-600 text-white">
                      {profile.nombre.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Cambiar Foto
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="nombre">Nombre Completo</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="nombre"
                      value={profile.nombre}
                      onChange={(e) => setProfile({ ...profile, nombre: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="telefono"
                      value={profile.telefono}
                      onChange={(e) => setProfile({ ...profile, telefono: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rut">RUT</Label>
                  <Input
                    id="rut"
                    value={profile.rut}
                    onChange={(e) => setProfile({ ...profile, rut: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="empresa">Empresa</Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="empresa"
                      value={profile.empresa}
                      onChange={(e) => setProfile({ ...profile, empresa: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cargo">Cargo</Label>
                  <Input
                    id="cargo"
                    value={profile.cargo}
                    onChange={(e) => setProfile({ ...profile, cargo: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="direccion">Dirección</Label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      id="direccion"
                      value={profile.direccion}
                      onChange={(e) => setProfile({ ...profile, direccion: e.target.value })}
                      disabled={!isEditing}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ciudad">Ciudad</Label>
                  <Input
                    id="ciudad"
                    value={profile.ciudad}
                    onChange={(e) => setProfile({ ...profile, ciudad: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Región</Label>
                  <Input
                    id="region"
                    value={profile.region}
                    onChange={(e) => setProfile({ ...profile, region: e.target.value })}
                    disabled={!isEditing}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                {!isEditing ? (
                  <Button onClick={() => setIsEditing(true)}>
                    Editar Perfil
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleSave} disabled={isSaving}>
                      <Save className="w-4 h-4 mr-2" />
                      {isSaving ? "Guardando..." : "Guardar Cambios"}
                    </Button>
                    <Button variant="outline" onClick={handleCancel}>
                      Cancelar
                    </Button>
                  </>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="seguridad" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Cambiar Contraseña</CardTitle>
              <CardDescription>Actualiza tu contraseña regularmente para mantener tu cuenta segura</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="current-password">Contraseña Actual</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="current-password"
                    type="password"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nueva Contraseña</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="new-password"
                    type="password"
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Nueva Contraseña</Label>
                <div className="relative">
                  <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    id="confirm-password"
                    type="password"
                    className="pl-10"
                  />
                </div>
              </div>

              <Button>Actualizar Contraseña</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sesiones Activas</CardTitle>
              <CardDescription>Gestiona los dispositivos donde has iniciado sesión</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-slate-900">Chrome en Windows</p>
                    <p className="text-slate-600">Santiago, Chile • Activa ahora</p>
                  </div>
                  <Badge className="bg-green-500">Actual</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                  <div>
                    <p className="text-slate-900">Safari en iPhone</p>
                    <p className="text-slate-600">Santiago, Chile • Hace 2 días</p>
                  </div>
                  <Button variant="outline" size="sm">Cerrar Sesión</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Subscription Tab */}
        <TabsContent value="suscripcion" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Plan Actual</CardTitle>
              <CardDescription>Gestiona tu suscripción y método de pago</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between p-6 bg-slate-50 rounded-lg">
                <div>
                  <p className="text-slate-900 mb-1">Plan {profile.plan}</p>
                  <p className="text-slate-600">Gratis para siempre</p>
                </div>
                <Badge variant="outline" className="text-blue-600 border-blue-600">Activo</Badge>
              </div>

              <div className="space-y-3">
                <h4 className="text-slate-900">Límites del Plan</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Búsquedas diarias</span>
                    <span>7 / 10</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-slate-700">
                    <span>Palabras clave para alertas</span>
                    <span>2 / 3</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: '67%' }}></div>
                  </div>
                </div>
              </div>

              <Button className="w-full">
                Actualizar a Plan Profesional
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Método de Pago</CardTitle>
              <CardDescription>Administra tus métodos de pago</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-8 h-8 text-slate-400" />
                  <div>
                    <p className="text-slate-900">No hay métodos de pago registrados</p>
                    <p className="text-slate-600">Agrega una tarjeta para actualizar tu plan</p>
                  </div>
                </div>
                <Button variant="outline">Agregar</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
