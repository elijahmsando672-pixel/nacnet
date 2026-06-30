"use client";
import { useRouter } from "next/navigation";
import { useCreateProduct } from "@/hooks/queries/use-products";
import { PageHeader } from "@/components/shared/page-header";
import { ProductForm, type ProductFormValues } from "@/components/merchant/product-form";
import { toast } from "sonner";

export default function NewProductPage() {
  const router = useRouter();
  const createProduct = useCreateProduct();

  const onSubmit = (data: ProductFormValues) => {
    createProduct.mutate(
      { ...data, merchantId: "merchant-1" },
      {
        onSuccess: () => {
          toast.success("Product created");
          router.push("/dashboard/products");
        },
        onError: () => toast.error("Failed to create product"),
      },
    );
  };

  return (
    <div className="space-y-6">
      <PageHeader title="New Product" description="Add a product to your catalog" />
      <div className="rounded-lg border bg-card p-6">
        <ProductForm onSubmit={onSubmit} isSubmitting={createProduct.isPending} />
      </div>
    </div>
  );
}
