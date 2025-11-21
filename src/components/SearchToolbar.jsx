import { Search, Plus, Download } from 'lucide-react';

export function SearchToolbar({
    searchTerm,
    onSearchChange,
    filterColor,
    onColorFilterChange,
    filterTag,
    onTagFilterChange,
    availableTags,
    colors,
    onAddNote,
    onExportPDF,
    hasNotes
}) {
    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
            <div className="flex flex-wrap gap-4 items-center">
                <div className="flex-1 min-w-64 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Buscar notas, etiquetas..."
                        value={searchTerm}
                        onChange={(e) => onSearchChange(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none transition"
                    />
                </div>
                <select
                    value={filterColor}
                    onChange={(e) => onColorFilterChange(e.target.value)}
                    className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                >
                    <option value="">Todos los colores</option>
                    {colors.map(color => (
                        <option key={color.value} value={color.value}>{color.name}</option>
                    ))}
                </select>
                {availableTags.length > 0 && (
                    <select
                        value={filterTag}
                        onChange={(e) => onTagFilterChange(e.target.value)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-400 focus:outline-none"
                    >
                        <option value="">Todas las etiquetas</option>
                        {availableTags.map(tag => (
                            <option key={tag} value={tag}>#{tag}</option>
                        ))}
                    </select>
                )}
                <button
                    onClick={onAddNote}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition shadow-md hover:shadow-lg"
                >
                    <Plus className="w-5 h-5" />
                    Nueva Nota
                </button>
                {hasNotes && (
                    <button
                        onClick={onExportPDF}
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-xl hover:from-blue-600 hover:to-cyan-600 transition shadow-md hover:shadow-lg"
                    >
                        <Download className="w-5 h-5" />
                        Exportar PDF
                    </button>
                )}
            </div>
        </div>
    );
}