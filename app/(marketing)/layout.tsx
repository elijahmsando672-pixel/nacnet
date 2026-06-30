import { LandingHeader } from "@/components/layouts/landing-header";
import { LandingFooter } from "@/components/layouts/landing-footer";

export default function MarketingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <LandingHeader />
      <main className="flex-1">{children}</main>
      <LandingFooter />
    </div>
  );
}
