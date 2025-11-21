import { useState } from 'react';
import { useNotes } from './hooks/useNotes';
import { filterNotes } from './utils/filterNotes';
import { exportNotesToPDF } from './utils/exportToPDF';
import { COLORS } from './constants/colors';
import { SearchToolbar } from './components/SearchToolbar';
import { NoteCard } from './components/NoteCard';
import { EmptyState } from './components/EmptyState';

export default function App() {
    const { notes, addNote, updateNote, deleteNote, setNotes } = useNotes();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterColor, setFilterColor] = useState('');
    const [filterTag, setFilterTag] = useState('');
    const [draggedNote, setDraggedNote] = useState(null);

    const allTags = [...new Set(notes.flatMap(n => n.tags))];
    const filteredNotes = filterNotes(notes, searchTerm, filterColor, filterTag);
    const handleDragStart = (e, note) => {
        setDraggedNote(note);
        e.dataTransfer.effectAllowed = 'move';
    };
    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
    };
    const handleDrop = (e, targetNote) => {
        e.preventDefault();
        if (!draggedNote || draggedNote.id === targetNote.id) return;

        const draggedIndex = notes.findIndex(n => n.id === draggedNote.id);
        const targetIndex = notes.findIndex(n => n.id === targetNote.id);

        const newNotes = [...notes];
        newNotes.splice(draggedIndex, 1);
        newNotes.splice(targetIndex, 0, draggedNote);

        setNotes(newNotes);
        setDraggedNote(null);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">📝 Mis Notas</h1>
                    <p className="text-gray-600">Organiza tus ideas de forma visual</p>
                </div>
                <SearchToolbar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                    filterColor={filterColor}
                    onColorFilterChange={setFilterColor}
                    filterTag={filterTag}
                    onTagFilterChange={setFilterTag}
                    availableTags={allTags}
                    colors={COLORS}
                    onAddNote={addNote}
                    onExportPDF={() => exportNotesToPDF(filteredNotes)}
                    hasNotes={filteredNotes.length > 0}
                />
                {filteredNotes.length === 0 ? (
                    <EmptyState
                        hasNotes={notes.length > 0}
                        message={notes.length === 0
                            ? 'Haz clic en "Nueva Nota" para comenzar'
                            : 'Intenta con otros filtros de búsqueda'}
                    />
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {filteredNotes.map(note => (
                            <NoteCard
                                key={note.id}
                                note={note}
                                onUpdate={updateNote}
                                onDelete={deleteNote}
                                onDragStart={handleDragStart}
                                onDragOver={handleDragOver}
                                onDrop={handleDrop}
                                colors={COLORS}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}