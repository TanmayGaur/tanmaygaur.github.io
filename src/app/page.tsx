import AnimatedBackground from "@/components/animated-background2";
import OrbitalNav from "@/components/orbital-nav";
import PageContainer from "@/components/page-container";
import { NavigationProvider } from "@/context/navigation-context";


export default function Home() {
  return (
  <NavigationProvider>
    <main className="min-h-screen bg-black/60 text-white overflow-hidden">
      <AnimatedBackground />
    
      <OrbitalNav />
      <PageContainer />
    </main>
  </NavigationProvider>
  );
}
