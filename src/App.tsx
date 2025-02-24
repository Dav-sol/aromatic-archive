
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import Navigation from "./components/Navigation";
import Breadcrumbs from "./components/Breadcrumbs";
import AdminPanel from "./components/AdminPanel";

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
              <Route path="/catalog" element={<div>Catalog</div>} />
              <Route path="/catalog/female" element={<div>Female Catalog</div>} />
              <Route path="/catalog/male" element={<div>Male Catalog</div>} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/product/:id" element={<div>Product Details</div>} />
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
