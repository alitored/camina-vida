'use client';
export default function NotionBlockRenderer({ blocks }) {
  if (!Array.isArray(blocks) || blocks.length === 0) {
    return <p className="text-center text-muted">No hay contenido disponible.</p>;
  }

  return (
    <section className="max-w-4xl mx-auto space-y-6">
      {blocks.map((block) => {
        const key = block.id;
        if (!block || !block.type) return null;

        const text = block[block.type]?.rich_text?.map(rt => rt.plain_text).join('') || '';

        switch (block.type) {
          case 'paragraph':
            return <p key={key} className="text-base text-texto-secundario">{text}</p>;

          case 'heading_1':
            return <h1 key={key} className="text-2xl font-bold text-verde-oscuro mt-8">{text}</h1>;

          case 'heading_2':
            return <h2 key={key} className="text-xl font-semibold text-verde-oscuro mt-6">{text}</h2>;

          case 'heading_3':
            return <h3 key={key} className="text-lg font-semibold text-verde mt-4">{text}</h3>;

          case 'quote':
            return (
              <blockquote key={key} className="border-l-4 border-verde-oscuro pl-4 italic text-texto-secundario">
                {text}
              </blockquote>
            );

          case 'bulleted_list_item':
            return <li key={key} className="list-disc ml-6 text-texto">{text}</li>;

          case 'numbered_list_item':
            return <li key={key} className="list-decimal ml-6 text-texto">{text}</li>;

          case 'callout': {
            const icon = block.callout?.icon?.emoji || '💡';
            return (
              <div key={key} className="flex items-start gap-3 bg-verde-claro/10 border-l-4 border-verde-oscuro p-4 rounded">
                <div className="text-xl">{icon}</div>
                <div className="text-texto">{text}</div>
              </div>
            );
          }

          case 'image': {
            const imageUrl = block.image?.type === 'external'
              ? block.image.external.url
              : block.image.file?.url;

            return imageUrl ? (
              <div key={key} className="my-6">
                <img src={imageUrl} alt="Imagen de Notion" className="rounded shadow max-w-full h-auto" />
              </div>
            ) : null;
          }

          case 'video': {
            const videoUrl = block.video?.type === 'external'
              ? block.video.external.url
              : block.video.file?.url;

            return videoUrl ? (
              <div key={key} className="my-6 aspect-video">
                <iframe
                  src={videoUrl}
                  title="Video embebido"
                  className="w-full h-full rounded shadow"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null;
          }

          case 'table': {
            const rows = block.children || [];
            return (
              <table key={key} className="w-full text-left border border-gray-300 rounded overflow-hidden">
                <tbody>
                  {rows.map((row, i) => (
                    <tr key={row.id || i} className="border-b border-gray-200">
                      {row.table_row?.cells?.map((cell, j) => (
                        <td key={j} className="px-4 py-2 text-sm text-texto">
                          {cell.map(rt => rt.plain_text).join('')}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            );
          }

          default:
            return null;
        }
      })}
    </section>
  );
}
