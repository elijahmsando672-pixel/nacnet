import { Smartphone, Headphones, ShieldCheck, Cable, ArrowRight } from "lucide-react";
import Link from "next/link";
import { listProducts } from "@/lib/api/endpoints/products";
import { HeroSlider } from "@/components/store/hero-slider";
import { FlashSale } from "@/components/store/flash-sale";
import { ProductGrid } from "@/components/store/product-grid";
import { CategoryCard } from "@/components/store/category-card";
import { Breadcrumb } from "@/components/store/breadcrumb";
import { Button } from "@/components/ui/button";

const categoryData = [
  { name: "Phones", slug: "phones", icon: Smartphone },
  { name: "Audio", slug: "audio", icon: Headphones },
  { name: "Cases", slug: "cases", icon: ShieldCheck },
  { name: "Accessories", slug: "accessories", icon: Cable },
];

const slides = [
  {
    title: "Latest Smartphones",
    description: "iPhone 16 Pro, Galaxy S25 and more — discover the newest arrivals",
    cta: { text: "Shop Phones", href: "/category/phones" },
  },
  {
    title: "Premium Audio",
    description: "AirPods, wireless earbuds, and headsets for every lifestyle",
    cta: { text: "Browse Audio", href: "/category/audio" },
  },
  {
    title: "Accessories Galore",
    description: "Cases, chargers, screen protectors, and everything in between",
    cta: { text: "Shop Accessories", href: "/category/accessories" },
  },
];

export default async function StoreHomePage() {
  const { data: products } = await listProducts();
  const flashProducts = products.slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 space-y-12">
      <Breadcrumb items={[]} />

      <HeroSlider slides={slides} />

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold tracking-tight">Shop by Category</h2>
          <Button variant="ghost" size="sm" asChild>
            <Link href="/products" className="gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categoryData.map((cat) => (
            <CategoryCard
              key={cat.slug}
              name={cat.name}
              slug={cat.slug}
              productCount={products.filter((p) => p.category === cat.name).length}
              icon={cat.icon}
            />
          ))}
        </div>
      </section>

      <FlashSale products={flashProducts} targetDate="2026-07-03T00:00:00Z" />

      <section>
        <h2 className="text-2xl font-bold tracking-tight">Featured Products</h2>
        <p className="mt-1 text-sm text-muted-foreground">Explore our complete collection</p>
        <div className="mt-6">
          <ProductGrid products={products} />
        </div>
      </section>
    </div>
  );
}
