import { pages } from "../../../lib/seed";

export default function AdminPages() {
  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black">Seiten</h1>
          <p className="mt-2 text-black/60">
            Neue Seiten erstellen, Slugs bearbeiten, Navigation steuern und Sections verwalten.
          </p>
        </div>
        <a className="rounded-full bg-flamingo px-5 py-3 text-sm font-black text-white" href="/admin/pages/new">
          Neue Seite
        </a>
      </div>
      <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-sm">
        {pages.map((page) => (
          <a
            key={page.id}
            className="grid gap-4 border-b border-black/5 p-5 transition hover:bg-black/[0.025] md:grid-cols-[1fr_180px_140px_120px]"
            href={`/admin/pages/${page.id}`}
          >
            <div>
              <p className="font-black">{page.title}</p>
              <p className="text-sm text-black/50">{page.fullPath}</p>
            </div>
            <p className="text-sm font-bold text-black/60">{page.type}</p>
            <p className="text-sm font-bold text-emerald-700">{page.status}</p>
            <p className="text-sm font-bold text-black/45">Bearbeiten</p>
          </a>
        ))}
      </div>
    </div>
  );
}
