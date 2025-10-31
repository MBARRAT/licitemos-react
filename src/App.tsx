import { useState } from "react";
import { Button } from "./components/ui/button";
import { LogOut, User } from "lucide-react";
import LicitacionesBuscador from "./components/LicitacionesBuscador";
import AdjudicacionesYOrdenes from "./components/AdjudicacionesYOrdenes";
import Dashboard from "./components/Dashboard";
import Planes from "./components/Planes";
import Perfil from "./components/Perfil";
import AlertasEmail from "./components/AlertasEmail";

export default function App() {
  const [activeView, setActiveView] = useState<"licitaciones" | "adjudicaciones" | "dashboard" | "planes" | "perfil" | "alertas">("licitaciones");

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-blue-600">LicitemOS</h1>
            
            <nav className="flex items-center gap-6">
              <button
                onClick={() => setActiveView("licitaciones")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  activeView === "licitaciones" ? "text-blue-600" : ""
                }`}
              >
                Inicio
              </button>
              <button
                onClick={() => setActiveView("planes")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  activeView === "planes" ? "text-blue-600" : ""
                }`}
              >
                Planes
              </button>
              <button
                onClick={() => setActiveView("licitaciones")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  activeView === "licitaciones" ? "text-blue-600" : ""
                }`}
              >
                Licitaciones
              </button>
              <button
                onClick={() => setActiveView("adjudicaciones")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  activeView === "adjudicaciones" ? "text-blue-600" : ""
                }`}
              >
                Adjudicaciones y OC
              </button>
              <button
                onClick={() => setActiveView("dashboard")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  activeView === "dashboard" ? "text-blue-600" : ""
                }`}
              >
                Dashboard
              </button>
              <button
                onClick={() => setActiveView("alertas")}
                className={`text-slate-700 hover:text-blue-600 transition-colors ${
                  activeView === "alertas" ? "text-blue-600" : ""
                }`}
              >
                Alertas
              </button>
              
              <div className="flex items-center gap-2 ml-4 pl-4 border-l border-slate-200">
                <button
                  onClick={() => setActiveView("perfil")}
                  className="flex items-center gap-2 text-slate-700 hover:text-blue-600 transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span>admin@licitemos.cl</span>
                </button>
              </div>
              
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-slate-900">
                <LogOut className="w-4 h-4 mr-2" />
                Cerrar sesión
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-8">
        {activeView === "licitaciones" && <LicitacionesBuscador />}
        {activeView === "adjudicaciones" && <AdjudicacionesYOrdenes />}
        {activeView === "dashboard" && <Dashboard />}
        {activeView === "planes" && <Planes />}
        {activeView === "perfil" && <Perfil />}
        {activeView === "alertas" && <AlertasEmail />}
      </main>
    </div>
  );
}
