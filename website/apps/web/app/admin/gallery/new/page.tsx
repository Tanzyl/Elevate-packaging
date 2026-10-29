import { PageHeader } from "@/components/admin/page-header";
import { GalleryForm } from "@/components/admin/gallery-form";

export default function NewGalleryPage() {
  return (
    <div>
      <PageHeader eyebrow="Media" title="Add images" />
      <GalleryForm />
    </div>
  );
}
