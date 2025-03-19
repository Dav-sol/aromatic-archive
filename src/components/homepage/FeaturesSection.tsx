
const FeaturesSection = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-elegant text-primary text-center mb-4">Por Qué Elegirnos</h2>
        <div className="h-px w-24 bg-primary mx-auto mb-16"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="bg-white p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300 text-center shadow-md">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-primary text-2xl">✦</span>
            </div>
            <h3 className="text-xl font-elegant text-primary mb-4">Calidad Premium</h3>
            <p className="text-gray-700">
              Nuestras fragancias están elaboradas con los mejores ingredientes y procesos artesanales, garantizando una experiencia olfativa excepcional.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300 text-center shadow-md">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-primary text-2xl">✦</span>
            </div>
            <h3 className="text-xl font-elegant text-primary mb-4">Exclusividad</h3>
            <p className="text-gray-700">
              Ofrecemos fragancias únicas que no encontrarás en ningún otro lugar, creadas por maestros perfumistas con décadas de experiencia.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors duration-300 text-center shadow-md">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <span className="text-primary text-2xl">✦</span>
            </div>
            <h3 className="text-xl font-elegant text-primary mb-4">Experiencia Sensorial</h3>
            <p className="text-gray-700">
              Cada perfume está diseñado para evocar emociones y crear momentos inolvidables, transformando lo cotidiano en extraordinario.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
