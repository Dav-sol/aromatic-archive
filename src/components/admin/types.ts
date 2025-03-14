
import { z } from "zod";

// Definimos los tipos permitidos para las notas de fragancia
export type NoteType = "top" | "middle" | "base";

export const FragranceNoteSchema = z.object({
  description: z.string().min(1, "La descripción de la nota es requerida"),
  note_type: z.enum(["top", "middle", "base"], {
    required_error: "El tipo de nota es requerido",
  }),
});

export const productSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  brand: z.string().min(1, "La marca es requerida"),
  description: z.string().optional(),
  price: z.coerce.number().min(0, "El precio debe ser mayor a 0"),
  stock: z.coerce.number().min(0, "El stock debe ser mayor o igual a 0"),
  gender: z.enum(["male", "female"], {
    required_error: "El género es requerido",
  }),
  images: z.array(z.object({
    file: z.instanceof(File).optional(),
    url: z.string().optional(),
    id: z.string().optional(),
  })).optional().default([]),
  fragranceNotes: z.array(FragranceNoteSchema).optional().default([]),
  isFeatured: z.boolean().default(false),
  discountPercentage: z.coerce.number().min(0).max(100).default(0),
});

export type ProductFormValues = z.infer<typeof productSchema>;
export type FragranceNote = z.infer<typeof FragranceNoteSchema>;

export interface ProductImage {
  id?: string;
  url?: string;
  file?: File;
}
