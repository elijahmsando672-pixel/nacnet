import { StoreHeader } from "@/components/layouts/store-header";
import { StoreFooter } from "@/components/layouts/store-footer";
import { Navbar } from "@/components/store/navbar";
import { Banner } from "@/components/store/banner";

const categories = [
  { name: "Phones", slug: "phones" },
  { name: "Audio", slug: "audio" },
  { name: "Cases", slug: "cases" },
  { name: "Accessories", slug: "accessories" },
];

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Banner message="Free shipping on orders over $50!" link={{ href: "/products", text: "Shop now" }} />
      <StoreHeader />
      <Navbar categories={categories} />
      <main className="flex-1">{children}</main>
      <StoreFooter />
    </div>
  );
}
