import { Library } from "lucide-react";
import { BackendUnavailable } from "@/components/backend-unavailable";
import { LibraryExplorer } from "@/components/library/library-explorer";
import type { ContentListResponse, ContentView } from "@/domain/api-contracts";
import { apiRequest } from "@/lib/api-client";

export const dynamic = "force-dynamic";

export default async function LibraryPage() {
  let items: ContentView[];
  try {
    ({ items } = await apiRequest<ContentListResponse>("/api/library"));
  } catch (error) {
    console.error("Library backend request failed:", error);
    return <BackendUnavailable title="Chưa tải được Library" retryHref="/library" />;
  }

  return (
    <div className="study-page space-y-6">
      <header className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="eyebrow">Library · Approved source</p>
          <h1 className="mt-2 text-3xl font-extrabold leading-tight tracking-[-0.015em] md:text-4xl">Tìm theo pattern, không chỉ theo nghĩa.</h1>
          <p className="muted mt-3 max-w-2xl leading-7">Verbs có forms và argument patterns; phrases giữ nguyên chunk; tenses có decision rule và contrast.</p>
        </div>
        <div className="status-pill w-fit"><Library className="size-3.5" />{items.length} mục</div>
      </header>
      <LibraryExplorer items={items} />
    </div>
  );
}
