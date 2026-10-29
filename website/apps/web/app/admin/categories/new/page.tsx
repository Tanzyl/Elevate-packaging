import { PageHeader } from "@/components/admin/page-header";
import { CategoryForm } from "@/components/admin/category-form";

export default function NewCategoryPage() {
  return (
    <div>
      <PageHeader eyebrow="Catalogue" title="New category" />
      <CategoryForm />
    </div>
  );
}
