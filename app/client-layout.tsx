'use client'

import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageWrapper from "@/components/PageWrapper";
import { usePathname, useRouter } from "next/navigation";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  
  // Map pathname to section for navigation highlighting
  const getCurrentSection = () => {
    if (!pathname) return 'home';
    if (pathname === '/') return 'home';
    if (pathname.startsWith('/about')) return 'about';
    if (pathname.startsWith('/blog')) return 'blog';
    if (pathname.startsWith('/contact')) return 'contact';
    if (pathname.startsWith('/pika')) return 'pika';
    if (pathname.startsWith('/tec')) return 'tec';
    return 'home';
  };

  const handleSectionChange = (section: string) => {
    const routes: Record<string, string> = {
      'home': '/',
      'about': '/about',
      'blog': '/blog',
      'contact': '/contact',
      'pika': '/pika',
      'tec': '/tec',
    };
    
    const route = routes[section] || '/';
    router.push(route as any);
  };

  return (
    <>
      <Navigation 
        currentSection={getCurrentSection()} 
        onSectionChange={handleSectionChange} 
      />
      {children}
      <Footer />
    </>
  );
}
