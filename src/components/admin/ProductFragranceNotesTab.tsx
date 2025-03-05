
import { UseFormReturn } from "react-hook-form";
import { FragranceNote, ProductFormValues } from "./types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getNoteTypeLabel } from "./utils";

interface ProductFragranceNotesTabProps {
  form: UseFormReturn<ProductFormValues>;
  newNote: FragranceNote;
  setNewNote: React.Dispatch<React.SetStateAction<FragranceNote>>;
  addFragranceNote: () => void;
  removeFragranceNote: (index: number) => void;
}

const ProductFragranceNotesTab = ({
  form,
  newNote,
  setNewNote,
  addFragranceNote,
  removeFragranceNote,
}: ProductFragranceNotesTabProps) => {
  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-medium mb-2">Añadir nueva nota</h3>
        <div className="flex gap-2">
          <div className="flex-1">
            <Input
              placeholder="Descripción de la nota"
              value={newNote.description}
              onChange={(e) => setNewNote({...newNote, description: e.target.value})}
            />
          </div>
          <Select 
            value={newNote.note_type}
            onValueChange={(value) => setNewNote({...newNote, note_type: value as "top" | "middle" | "base"})}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Tipo de nota" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="top">Nota de Salida</SelectItem>
              <SelectItem value="middle">Nota de Corazón</SelectItem>
              <SelectItem value="base">Nota de Fondo</SelectItem>
            </SelectContent>
          </Select>
          <Button type="button" onClick={addFragranceNote}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Lista de notas añadidas */}
      <div>
        <h3 className="text-sm font-medium mb-2">Notas añadidas</h3>
        <div className="border rounded-md overflow-hidden">
          {form.watch('fragranceNotes')?.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead className="w-[100px]">Acción</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {form.watch('fragranceNotes')?.map((note, index) => (
                  <TableRow key={index}>
                    <TableCell>{note.description}</TableCell>
                    <TableCell>{getNoteTypeLabel(note.note_type)}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeFragranceNote(index)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="py-6 text-center text-muted-foreground">
              No hay notas de fragancia añadidas
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductFragranceNotesTab;
