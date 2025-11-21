export function ColorPicker({ currentColor, colors, onColorChange }) {
    return (
        <div className="flex gap-1 mb-3 mt-8">
            {colors.map(color => (
                <button
                    key={color.value}
                    onClick={() => onColorChange(color)}
                    className={`w-6 h-6 ${color.value} rounded-full border-2 ${currentColor.value === color.value ? 'border-gray-800 scale-110' : 'border-gray-400'
                        } hover:scale-110 transition-transform`}
                    title={color.name}
                />
            ))}
        </div>
    );
}