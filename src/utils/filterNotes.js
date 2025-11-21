export function filterNotes(notes, searchTerm, filterColor, filterTag) {
    return notes.filter(note => {
        const matchesSearch =
            note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
            note.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesColor = !filterColor || note.color.value === filterColor;
        const matchesTag = !filterTag || note.tags.includes(filterTag);

        return matchesSearch && matchesColor && matchesTag;
    });
}