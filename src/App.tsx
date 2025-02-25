
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "./components/Navigation";
import Breadcrumbs from "./components/Breadcrumbs";
import AdminPanel from "./components/AdminPanel";
import CatalogView from "./components/CatalogView";
import ProductDetail from "./components/ProductDetail";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <Breadcrumbs />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
            <Routes>
              <Route path="/" element={<div>Home</div>} />
              <Route path="/catalog" element={<CatalogView />} />
              <Route path="/catalog/female" element={<CatalogView gender="female" />} />
              <Route path="/catalog/male" element={<CatalogView gender="male" />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </main>
        </div>
        <Toaster />
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
