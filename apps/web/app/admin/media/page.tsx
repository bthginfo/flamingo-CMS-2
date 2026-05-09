export default function MediaPage() {
  return (
    <div>
      <h1 className="text-3xl font-black">Medien</h1>
      <p className="mt-2 text-black/60">
        Upload, Alt-Texte, Tags, Ordner, Focal Point, Usage Finder und sichere Datei-Validierung.
      </p>
      <div className="mt-8 rounded-2xl border border-dashed border-black/20 bg-white p-12 text-center shadow-sm">
        <p className="text-xl font-black">Drag & Drop Upload</p>
        <p className="mt-2 text-black/55">S3/R2 Storage Adapter wird hier angeschlossen.</p>
      </div>
    </div>
  );
}
