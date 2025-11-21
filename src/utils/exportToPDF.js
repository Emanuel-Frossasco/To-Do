export function exportNotesToPDF(notes) {
    const printWindow = window.open('', '_blank');
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Mis Notas</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          .note { 
            page-break-inside: avoid; 
            margin-bottom: 30px; 
            padding: 15px; 
            border: 2px solid #ccc;
            border-radius: 8px;
          }
          .note-title { font-size: 18px; font-weight: bold; margin-bottom: 10px; }
          .note-content { margin-bottom: 10px; line-height: 1.6; }
          .note-tags { font-size: 12px; color: #666; }
          .tag { 
            display: inline-block; 
            background: #e5e7eb; 
            padding: 2px 8px; 
            border-radius: 12px; 
            margin-right: 5px;
          }
        </style>
      </head>
      <body>
        <h1>Mis Notas</h1>
        <p>Exportado el ${new Date().toLocaleDateString()}</p>
        ${notes.map(note => `
          <div class="note">
            <div class="note-title">${note.title || 'Sin título'}</div>
            <div class="note-content">${note.content || 'Sin contenido'}</div>
            ${note.tags.length > 0 ? `
              <div class="note-tags">
                ${note.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
              </div>
            ` : ''}
          </div>
        `).join('')}
      </body>
    </html>
  `;
    printWindow.document.write(html);
    printWindow.document.close();
    setTimeout(() => {
        printWindow.print();
    }, 250);
}