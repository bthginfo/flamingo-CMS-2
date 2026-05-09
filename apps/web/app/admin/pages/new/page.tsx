import { sectionDefinitions } from "@flamingo/sections";
import { NewPageForm } from "../../../../components/admin/NewPageForm";

export default function NewPage() {
  return (
    <div className="max-w-3xl">
      <h1 className="text-3xl font-black">Neue Seite</h1>
      <p className="mt-2 text-black/60">
        Der Flow erstellt zuerst einen Draft. Danach können beliebige globale Sections eingefügt werden.
      </p>
      <NewPageForm
        sections={sectionDefinitions.map((section) => ({
          type: section.type,
          label: section.label
        }))}
      />
    </div>
  );
}
