import { PageHeader } from "@/components/admin/page-header";
import { InnovationForm } from "@/components/admin/innovation-form";

export default function NewInnovationPage() {
  return (
    <div>
      <PageHeader eyebrow="Content" title="New innovation" />
      <InnovationForm />
    </div>
  );
}
