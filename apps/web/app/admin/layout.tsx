import { BarChart3, Database, FileText, FormInput, Image, Layers3, Palette, Search, Settings } from "lucide-react";
import { redirect } from "next/navigation";
import { LogoutButton } from "../../components/admin/LogoutButton";
import { getSessionFromCookies } from "../../lib/auth";

const nav = [
  { label: "Dashboard", href: "/admin", icon: BarChart3 },
  { label: "Seiten", href: "/admin/pages", icon: FileText },
  { label: "Collections", href: "/admin/collections", icon: Database },
  { label: "Medien", href: "/admin/media", icon: Image },
  { label: "Navigation", href: "/admin/navigation", icon: Layers3 },
  { label: "Design", href: "/admin/design", icon: Palette },
  { label: "SEO", href: "/admin/seo", icon: Search },
  { label: "Formulare", href: "/admin/forms", icon: FormInput },
  { label: "Einstellungen", href: "/admin/settings", icon: Settings }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = getSessionFromCookies();
  if (!session) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#f4f2ee] text-ink">
      <aside className="fixed inset-y-0 left-0 hidden w-[19rem] border-r border-white/10 bg-[#09090c] p-4 text-white md:block">
        <a className="flex items-center gap-3 rounded-lg bg-white/[0.06] p-3" href="/admin">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-flamingo text-sm font-black">F</span>
          <span>
            <span className="block text-lg font-black leading-none">Flamingo CMS</span>
            <span className="mt-1 block text-xs font-bold uppercase tracking-[0.16em] text-white/35">Workspace</span>
          </span>
        </a>
        <nav className="mt-8 grid gap-1">
          {nav.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.href}
                className="flex items-center gap-3 rounded-md px-3 py-3 text-sm font-bold text-white/58 transition hover:bg-white/10 hover:text-white"
                href={item.href}
              >
                <Icon size={18} />
                {item.label}
              </a>
            );
          })}
        </nav>
        <div className="absolute inset-x-4 bottom-4 rounded-lg border border-white/10 bg-white/[0.06] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-white/35">Production</p>
          <p className="mt-2 text-2xl font-black">57 Routen</p>
          <p className="mt-2 text-sm leading-6 text-white/50">Templates, Admin und Public Pages laufen aus demselben CMS-Kern.</p>
        </div>
      </aside>
      <div className="md:pl-[19rem]">
        <header className="sticky top-0 z-30 border-b border-black/10 bg-[#fbfaf8]/90 px-5 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-black/40">
                Tenant Admin
              </p>
              <p className="font-black">FlamingoMedia Showcase</p>
              <p className="text-xs text-black/45">
                {session.user.name} · {session.user.role}
              </p>
            </div>
            <div className="flex gap-2">
              <a className="rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-bold" href="/">
                Website ansehen
              </a>
              <LogoutButton />
              <button className="rounded-full bg-ink px-4 py-2 text-sm font-black text-white">
                Publish
              </button>
            </div>
          </div>
        </header>
        <main className="p-5 md:p-8">{children}</main>
      </div>
    </div>
  );
}
