import { PageHeader } from "@/components/admin/page-header";
import { ProductForm } from "@/components/admin/product-form";

export default function NewProductPage() {
  return (
    <div>
      <PageHeader eyebrow="Catalogue" title="New product" />
      <ProductForm />
    </div>
  );
}
