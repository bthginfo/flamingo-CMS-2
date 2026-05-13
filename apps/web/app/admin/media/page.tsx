import { AdminMetric, AdminPageHeader, AdminPanel } from "../../../components/admin/AdminUi";
import { MediaLibraryClient } from "../../../components/admin/MediaLibraryClient";
import { MediaUploadForm } from "../../../components/admin/MediaUploadForm";

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

        <AdminPanel title="Media Library">
          <MediaLibraryClient />
        </AdminPanel>
      </div>
    </div>
  );
}
