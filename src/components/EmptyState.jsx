export function EmptyState({ hasNotes, message }) {
    return (
        <div className="text-center py-20">
            <div className="text-6xl mb-4">📌</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">
                {hasNotes ? 'No se encontraron notas' : '¡Crea tu primera nota!'}
            </h3>
            <p className="text-gray-500">
                {message}
            </p>
        </div>
    );
}