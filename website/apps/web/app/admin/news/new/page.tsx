import { PageHeader } from "@/components/admin/page-header";
import { NewsForm } from "@/components/admin/news-form";

export default function NewNewsPage() {
  return (
    <div>
      <PageHeader eyebrow="Media" title="New post" />
      <NewsForm />
    </div>
  );
}
