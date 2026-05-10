import { AdminMetric, AdminPageHeader, AdminPanel } from "../../../components/admin/AdminUi";
import { MediaUploadForm } from "../../../components/admin/MediaUploadForm";

const sampleMedia = [
  "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80",
  "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&w=900&q=80"
];

export default function MediaPage() {
  return (
    <div className="grid gap-6">
      <AdminPageHeader
        eyebrow="Media"
        title="Blob-Medien mit Alt-Text, Caption und Einsatzkontext."
        description="Upload, Vorschau, Tagging und spaetere Usage-Finder gehoeren in denselben redaktionellen Workflow."
      />

      <div className="grid gap-4 md:grid-cols-4">
        <AdminMetric label="Assets" value="36" detail="Showcase + Uploads" />
        <AdminMetric label="Storage" value="Blob" detail="Vercel Blob API aktiv" />
        <AdminMetric label="Alt-Texte" value="92%" detail="redaktionell gepflegt" />
        <AdminMetric label="Focal Points" value="12" detail="Hero-faehige Bilder" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <AdminPanel title="Upload">
          <div className="rounded-lg border border-dashed border-black/20 bg-paper p-8 text-center">
            <p className="text-2xl font-black">Drag & Drop Upload</p>
            <p className="mt-2 text-black/55">Uploads laufen ueber Vercel Blob, sobald `BLOB_READ_WRITE_TOKEN` gesetzt ist.</p>
          </div>
          <MediaUploadForm />
        </AdminPanel>

        <AdminPanel title="Media Library Preview">
          <div className="grid gap-3 md:grid-cols-2">
            {sampleMedia.map((image, index) => (
              <article key={image} className="overflow-hidden rounded-lg border border-black/10 bg-paper">
                <div className="min-h-[220px] bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
                <div className="p-4">
                  <p className="font-black">showcase-{index + 1}.jpg</p>
                  <p className="mt-1 text-sm text-black/55">Hero, Gallery, Template Preview</p>
                </div>
              </article>
            ))}
          </div>
        </AdminPanel>
      </div>
    </div>
  );
}
