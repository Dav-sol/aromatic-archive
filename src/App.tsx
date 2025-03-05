
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "./components/Navigation";
import Breadcrumbs from "./components/Breadcrumbs";
import AdminPanel from "./components/admin/AdminPanel";
import CatalogView from "./components/CatalogView";
import ProductDetail from "./components/ProductDetail";
import HomePage from "./components/HomePage";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-white">
          <Navigation />
          <main className="pt-16 pb-16">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/catalog" element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                  <Breadcrumbs />
                  <CatalogView />
                </div>
              } />
              <Route path="/catalog/female" element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                  <Breadcrumbs />
                  <CatalogView gender="female" />
                </div>
              } />
              <Route path="/catalog/male" element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                  <Breadcrumbs />
                  <CatalogView gender="male" />
                </div>
              } />
              <Route path="/admin" element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                  <Breadcrumbs />
                  <AdminPanel />
                </div>
              } />
              <Route path="/secret-admin" element={<Navigate to="/?access=admin" replace />} />
              <Route path="/product/:id" element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                  <Breadcrumbs />
                  <ProductDetail />
                </div>
              } />
              <Route path="*" element={
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-4">
                  <h1 className="text-2xl font-semibold text-center">Página no encontrada</h1>
                </div>
              } />
            </Routes>
          </main>
        </div>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
