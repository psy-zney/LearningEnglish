import { CloudOff, RotateCcw } from "lucide-react";

export function BackendUnavailable({ title, retryHref }: { title: string; retryHref: string }) {
  return (
    <div className="study-page">
      <section className="study-panel grid min-h-80 place-items-center p-8 text-center">
        <div className="max-w-lg">
          <CloudOff className="mx-auto size-10 text-[var(--warning)]" />
          <h1 className="mt-4 text-2xl font-extrabold">{title}</h1>
          <p className="muted mt-3 leading-7">
            KhÃ´ng thá»ƒ káº¿t ná»‘i backend LearningEnglish. Dá»¯ liá»‡u local váº«n an toÃ n; hÃ£y kiá»ƒm tra mÃ¡y Windows vÃ  Cloudflare Tunnel rá»“i thá»­ láº¡i.
          </p>
          <a href={retryHref} className="btn-primary mt-5">
            <RotateCcw className="size-4" /> Thá»­ láº¡i
          </a>
        </div>
      </section>
    </div>
  );
}
