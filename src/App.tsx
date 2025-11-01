import { useState } from "react";
import { Button } from "./components/ui/button";
import { LogOut, User, Menu, X } from "lucide-react";
import { Toaster } from "./components/ui/sonner";
import Landing from "./components/Landing";
import Nosotros from "./components/Nosotros";
import Login from "./components/Login";
import Registro from "./components/Registro";
import LicitacionesBuscador from "./components/LicitacionesBuscador";
import AdjudicacionesYOrdenes from "./components/AdjudicacionesYOrdenes";
import Dashboard from "./components/Dashboard";
import Planes from "./components/Planes";
import Perfil from "./components/Perfil";
import AlertasEmail from "./components/AlertasEmail";
import CalendarioVencimientos from "./components/CalendarioVencimientos";
import BusquedasGuardadas from "./components/BusquedasGuardadas";
import ComparadorLicitaciones from "./components/ComparadorLicitaciones";

type PublicView = "landing" | "planes" | "nosotros" | "login" | "registro";
type AppView = "licitaciones" | "adjudicaciones" | "dashboard" | "planes" | "perfil" | "alertas" | "calendario" | "busquedas" | "comparador";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [publicView, setPublicView] = useState<PublicView>("landing");
  const [appView, setAppView] = useState<AppView>("licitaciones");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
    setAppView("licitaciones");
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPublicView("landing");
  };

  const handleRegister = () => {
    setIsAuthenticated(true);
    setAppView("licitaciones");
  };

  const navigatePublic = (view: string) => {
    setPublicView(view as PublicView);
  };

  const navigateApp = (view: AppView) => {
    setAppView(view);
    setMobileMenuOpen(false);
  };

  // Public Views (Not authenticated)
  if (!isAuthenticated) {
    return (
      <>
        <Toaster />
        {/* Public Header */}
        {publicView !== "login" && publicView !== "registro" && (
          <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
            <div className="container mx-auto px-6 py-4">
              <div className="flex items-center justify-between">
                <button 
                  onClick={() => setPublicView("landing")}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <h1>Licitemos</h1>
                </button>
                
                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-6">
                  <button
                    onClick={() => setPublicView("landing")}
                    className={`text-slate-700 hover:text-blue-600 transition-colors ${
                      publicView === "landing" ? "text-blue-600" : ""
                    }`}
                  >
                    Inicio
                  </button>
                  <button
                    onClick={() => setPublicView("planes")}
                    className={`text-slate-700 hover:text-blue-600 transition-colors ${
                      publicView === "planes" ? "text-blue-600" : ""
                    }`}
                  >
                    Planes
                  </button>
                  <button
                    onClick={() => setPublicView("nosotros")}
                    className={`text-slate-700 hover:text-blue-600 transition-colors ${
                      publicView === "nosotros" ? "text-blue-600" : ""
                    }`}
                  >
                    Nosotros
                  </button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setPublicView("registro")}
                  >
                    Registrarse
                  </Button>
                  <Button onClick={() => setPublicView("login")}>
                    Iniciar sesión
                  </Button>
                </nav>

                {/* Mobile Menu Button */}
                <button 
                  className="md:hidden"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>

              {/* Mobile Menu */}
              {mobileMenuOpen && (
                <div className="md:hidden mt-4 pb-4 space-y-3">
                  <button
                    onClick={() => { setPublicView("landing"); setMobileMenuOpen(false); }}
                    className="block w-full text-left text-slate-700 hover:text-blue-600 py-2"
                  >
                    Inicio
                  </button>
                  <button
                    onClick={() => { setPublicView("planes"); setMobileMenuOpen(false); }}
                    className="block w-full text-left text-slate-700 hover:text-blue-600 py-2"
                  >
                    Planes
                  </button>
                  <button
                    onClick={() => { setPublicView("nosotros"); setMobileMenuOpen(false); }}
                    className="block w-full text-left text-slate-700 hover:text-blue-600 py-2"
                  >
                    Nosotros
                  </button>
                  <Button 
                    variant="outline"
                    onClick={() => { setPublicView("registro"); setMobileMenuOpen(false); }}
                    className="w-full"
                  >
                    Registrarse
                  </Button>
                  <Button 
                    onClick={() => { setPublicView("login"); setMobileMenuOpen(false); }}
                    className="w-full"
                  >
                    Iniciar sesión
                  </Button>
                </div>
              )}
            </div>
          </header>
        )}

        {/* Public Content */}
        {publicView === "landing" && <Landing onNavigate={navigatePublic} />}
        {publicView === "planes" && (
          <div className="min-h-screen bg-slate-50 py-12">
            <Planes />
          </div>
        )}
        {publicView === "nosotros" && <Nosotros onNavigate={navigatePublic} />}
        {publicView === "login" && <Login onLogin={handleLogin} onNavigate={navigatePublic} />}
        {publicView === "registro" && <Registro onRegister={handleRegister} onNavigate={navigatePublic} />}
      </>
    );
  }

  // Authenticated Views
  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster />
      {/* Authenticated Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-blue-600">Licitemos</h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-6">
              <button
                onClick={() => navigateApp("licitaciones")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  appView === "licitaciones" ? "text-blue-600" : ""
                }`}
              >
                Licitaciones
              </button>
              <button
                onClick={() => navigateApp("adjudicaciones")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  appView === "adjudicaciones" ? "text-blue-600" : ""
                }`}
              >
                Adjudicaciones y OC
              </button>
              <button
                onClick={() => navigateApp("dashboard")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  appView === "dashboard" ? "text-blue-600" : ""
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigateApp("calendario")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  appView === "calendario" ? "text-blue-600" : ""
                }`}
              >
                Calendario
              </button>
              <button
                onClick={() => navigateApp("alertas")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  appView === "alertas" ? "text-blue-600" : ""
                }`}
              >
                Alertas
              </button>
              
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
                <button
                  onClick={() => navigateApp("perfil")}
                  className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden xl:inline">admin@licitemos.cl</span>
                </button>
              </div>
              
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900" onClick={handleLogout}>
                <LogOut className="w-4 h-4 mr-2" />
                <span className="hidden xl:inline">Cerrar sesión</span>
              </Button>
            </nav>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden mt-4 pb-4 space-y-2 border-t pt-4">
              <button
                onClick={() => navigateApp("licitaciones")}
                className={`block w-full text-left py-2 px-3 rounded ${
                  appView === "licitaciones" ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
              >
                Licitaciones
              </button>
              <button
                onClick={() => navigateApp("adjudicaciones")}
                className={`block w-full text-left py-2 px-3 rounded ${
                  appView === "adjudicaciones" ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
              >
                Adjudicaciones y OC
              </button>
              <button
                onClick={() => navigateApp("dashboard")}
                className={`block w-full text-left py-2 px-3 rounded ${
                  appView === "dashboard" ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => navigateApp("calendario")}
                className={`block w-full text-left py-2 px-3 rounded ${
                  appView === "calendario" ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
              >
                Calendario
              </button>
              <button
                onClick={() => navigateApp("alertas")}
                className={`block w-full text-left py-2 px-3 rounded ${
                  appView === "alertas" ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
              >
                Alertas
              </button>
              <button
                onClick={() => navigateApp("busquedas")}
                className={`block w-full text-left py-2 px-3 rounded ${
                  appView === "busquedas" ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
              >
                Búsquedas Guardadas
              </button>
              <button
                onClick={() => navigateApp("comparador")}
                className={`block w-full text-left py-2 px-3 rounded ${
                  appView === "comparador" ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
              >
                Comparador
              </button>
              <button
                onClick={() => navigateApp("perfil")}
                className={`block w-full text-left py-2 px-3 rounded ${
                  appView === "perfil" ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
              >
                Mi Perfil
              </button>
              <button
                onClick={() => navigateApp("planes")}
                className={`block w-full text-left py-2 px-3 rounded ${
                  appView === "planes" ? "bg-blue-50 text-blue-600" : "text-slate-700"
                }`}
              >
                Planes
              </button>
              <div className="border-t pt-2 mt-2">
                <Button variant="outline" onClick={handleLogout} className="w-full">
                  <LogOut className="w-4 h-4 mr-2" />
                  Cerrar sesión
                </Button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Authenticated Content */}
      <main className="container mx-auto px-6 py-8">
        {appView === "licitaciones" && <LicitacionesBuscador onOpenComparador={() => navigateApp("comparador")} />}
        {appView === "adjudicaciones" && <AdjudicacionesYOrdenes />}
        {appView === "dashboard" && <Dashboard />}
        {appView === "planes" && <Planes />}
        {appView === "perfil" && <Perfil />}
        {appView === "alertas" && <AlertasEmail />}
        {appView === "calendario" && <CalendarioVencimientos />}
        {appView === "busquedas" && <BusquedasGuardadas />}
        {appView === "comparador" && <ComparadorLicitaciones />}
      </main>
    </div>
  );
}
