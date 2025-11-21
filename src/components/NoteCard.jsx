import { Trash2, GripVertical } from 'lucide-react';
import { ColorPicker } from './ColorPicker';
import { TagsManager } from './TagsManager';

export function NoteCard({
    note,
    onUpdate,
    onDelete,
    onDragStart,
    onDragOver,
    onDrop,
    colors
}) {
    return (
        <div
            draggable
            onDragStart={(e) => onDragStart(e, note)}
            onDragOver={onDragOver}
            onDrop={(e) => onDrop(e, note)}
            className={`${note.color.value} ${note.color.border} border-4 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 cursor-move relative group`}
        >
            <div className="absolute top-2 left-2 opacity-0 group-hover:opacity-50 transition-opacity">
                <GripVertical className="w-5 h-5 text-gray-600" />
            </div>
            <button
                onClick={() => onDelete(note.id)}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                title="Eliminar nota"
            >
                <Trash2 className="w-4 h-4" />
            </button>
            <ColorPicker
                currentColor={note.color}
                colors={colors}
                onColorChange={(color) => onUpdate(note.id, 'color', color)}
            />
            <input
                type="text"
                placeholder="Título de la nota..."
                value={note.title}
                onChange={(e) => onUpdate(note.id, 'title', e.target.value)}
                className="w-full mb-3 text-xl font-bold bg-transparent border-none outline-none placeholder-gray-500"
            />
            <textarea
                placeholder="Escribe aquí tu nota..."
                value={note.content}
                onChange={(e) => onUpdate(note.id, 'content', e.target.value)}
                className="w-full h-32 bg-transparent border-none outline-none resize-none placeholder-gray-500 text-gray-800"
            />
            <div className="mt-3">
                <TagsManager
                    tags={note.tags}
                    onAddTag={(tag) => onUpdate(note.id, 'tags', [...note.tags, tag])}
                    onRemoveTag={(tagToRemove) =>
                        onUpdate(note.id, 'tags', note.tags.filter(t => t !== tagToRemove))
                    }
                />
            </div>
            <div className="mt-3 text-xs text-gray-600 opacity-70">
                {new Date(note.createdAt).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                })}
            </div>
        </div>
    );
}