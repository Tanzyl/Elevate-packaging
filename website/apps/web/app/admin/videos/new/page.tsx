import { PageHeader } from "@/components/admin/page-header";
import { VideoForm } from "@/components/admin/video-form";

export default function NewVideoPage() {
  return (
    <div>
      <PageHeader eyebrow="Media" title="Add video" />
      <VideoForm />
    </div>
  );
}
