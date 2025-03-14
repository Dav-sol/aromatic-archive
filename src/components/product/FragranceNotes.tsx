
import { Droplet } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

type Note = {
  id: string;
  description: string;
  note_type: string;
  product_id: string | null;
};

interface FragranceNotesProps {
  notes: {
    top: Note[];
    middle: Note[];
    base: Note[];
  };
}

const FragranceNotes = ({ notes }: FragranceNotesProps) => {
  // Function to render the notes of fragrance with their type
  const renderNotes = (notesList: Note[], type: 'top' | 'middle' | 'base') => {
    if (!notesList || notesList.length === 0) return null;
    
    const typeLabels = {
      top: 'Notas de Salida',
      middle: 'Notas de Corazón',
      base: 'Notas de Fondo'
    };
    
    return (
      <div>
        <h4 className="font-medium text-sm">{typeLabels[type]}</h4>
        <div className="flex flex-wrap gap-2 mt-2">
          {notesList.map((note) => (
            <Badge key={note.id} variant="outline" className="flex items-center gap-1">
              <Droplet className="h-3 w-3" />
              {note.description}
            </Badge>
          ))}
        </div>
      </div>
    );
  };

  if (!notes.top.length && !notes.middle.length && !notes.base.length) {
    return null;
  }

  return (
    <div className="py-4 border-b">
      <h3 className="font-medium mb-3">Notas de Fragancia</h3>
      <div className="space-y-4">
        {renderNotes(notes.top, 'top')}
        {renderNotes(notes.middle, 'middle')}
        {renderNotes(notes.base, 'base')}
      </div>
    </div>
  );
};

export default FragranceNotes;
