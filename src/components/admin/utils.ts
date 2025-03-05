
export const getNoteTypeLabel = (type: string) => {
  const labels = {
    top: "Salida",
    middle: "Corazón",
    base: "Fondo"
  };
  return labels[type as keyof typeof labels] || type;
};
