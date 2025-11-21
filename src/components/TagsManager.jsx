import { useState } from 'react';
import { Tag, X } from 'lucide-react';

export function TagsManager({ tags, onAddTag, onRemoveTag }) {
    const [tagInput, setTagInput] = useState('');

    const handleAddTag = (e) => {
        if (e.key === 'Enter' && tagInput.trim()) {
            onAddTag(tagInput);
            setTagInput('');
        }
    };

    return (
        <div>
            <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                    <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-white bg-opacity-60 rounded-full text-sm font-medium"
                    >
                        <Tag className="w-3 h-3" />
                        {tag}
                        <button
                            onClick={() => onRemoveTag(tag)}
                            className="hover:text-red-600 transition"
                        >
                            <X className="w-3 h-3" />
                        </button>
                    </span>
                ))}
            </div>
            <input
                type="text"
                placeholder="+ Agregar etiqueta (Enter)..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleAddTag}
                className="w-full mt-2 px-3 py-2 bg-white bg-opacity-40 rounded-lg text-sm outline-none placeholder-gray-500"
            />
        </div>
    );
}