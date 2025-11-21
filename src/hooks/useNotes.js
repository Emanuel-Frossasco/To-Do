import { useState, useEffect } from 'react';
import { COLORS } from '../constants/colors';

export function useNotes() {
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const saved = localStorage.getItem('sticky-notes');
        if (saved) {
            setNotes(JSON.parse(saved));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('sticky-notes', JSON.stringify(notes));
    }, [notes]);

    const addNote = () => {
        const newNote = {
            id: Date.now(),
            title: '',
            content: '',
            color: COLORS[0],
            tags: [],
            createdAt: new Date().toISOString(),
        };
        setNotes([newNote, ...notes]);
    };

    const updateNote = (id, field, value) => {
        setNotes(notes.map(note =>
            note.id === id ? { ...note, [field]: value } : note
        ));
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };
    return { notes, addNote, updateNote, deleteNote, setNotes };
}