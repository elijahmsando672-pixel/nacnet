"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useUpdateProduct } from "@/hooks/queries/use-products";
import { getProductById } from "@/lib/api/endpoints/products";
import { PageHeader } from "@/components/shared/page-header";
import { ProductForm, type ProductFormValues } from "@/components/merchant/product-form";
import { toast } from "sonner";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const updateProduct = useUpdateProduct();

  const { data: product, isLoading } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });

  const onSubmit = (data: ProductFormValues) => {
    updateProduct.mutate(
      { id, data },
      {
        onSuccess: () => {
          toast.success("Product updated");
          router.push("/dashboard/products");
        },
        onError: () => toast.error("Failed to update product"),
      },
    );
  };

  if (isLoading) return <div className="p-8 text-center text-muted-foreground">Loading...</div>;
  if (!product) return <div className="p-8 text-center text-muted-foreground">Product not found</div>;

  return (
    <div className="space-y-6">
      <PageHeader title={`Edit: ${product.name}`} description="Update product details" />
      <div className="rounded-lg border bg-card p-6">
        <ProductForm
          initialData={{
            name: product.name,
            description: product.description,
            price: product.price,
            compareAtPrice: product.compareAtPrice,
            imageUrl: product.imageUrl,
            category: product.category,
            stock: product.stock,
            status: product.status,
          }}
          onSubmit={onSubmit}
          isSubmitting={updateProduct.isPending}
        />
      </div>
    </div>
  );
}
