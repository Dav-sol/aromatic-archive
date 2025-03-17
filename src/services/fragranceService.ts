
import { supabase } from '@/integrations/supabase/client';
import { FragranceNote } from '@/components/admin/types';

export const fetchFragranceNotes = async (productId: string) => {
  const { data, error } = await supabase
    .from('fragrance_notes')
    .select('*')
    .eq('product_id', productId);
    
  if (error) {
    console.error("Error al cargar notas de fragancia:", error);
    throw error;
  }
  
  return data;
};

export const saveFragranceNotes = async (productId: string, notes: FragranceNote[]) => {
  if (!notes || notes.length === 0) return;

  try {
    // Primero eliminar notas existentes para este producto
    const { error: deleteError } = await supabase
      .from('fragrance_notes')
      .delete()
      .eq('product_id', productId);
      
    if (deleteError) {
      console.error('Error al eliminar notas existentes:', deleteError);
      throw deleteError;
    }

    // Luego insertar las nuevas notas
    if (notes.length > 0) {
      const notesWithProductId = notes.map(note => ({
        description: note.description,
        note_type: note.note_type,
        product_id: productId
      }));

      const { error: insertError } = await supabase
        .from('fragrance_notes')
        .insert(notesWithProductId);

      if (insertError) {
        console.error('Error al insertar nuevas notas:', insertError);
        throw insertError;
      }
    }
  } catch (error) {
    console.error('Error al guardar notas de fragancia:', error);
    throw error;
  }
};
