
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CallToAction = () => {
  return (
    <section className="py-16 bg-luxury-gradient relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-[#f7d58b] to-[#efd8a8] opacity-10"></div>
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="text-3xl font-elegant text-primary mb-6">Eleva tu presencia con nuestras fragancias</h2>
        <p className="text-gray-700 text-lg mb-8 max-w-2xl mx-auto">
          Descubre el poder transformador de nuestras exquisitas fragancias y déjate envolver por sus notas encantadoras.
        </p>
        <Link to="/catalog">
          <Button size="lg" className="bg-primary text-white hover:bg-primary/90">
            Explora toda la colección
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
