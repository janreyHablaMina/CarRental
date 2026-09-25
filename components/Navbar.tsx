"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Do not render this public navbar on admin pages
  if (pathname.startsWith("/admin")) return null;

  const handleNav = (hash: string) => {
    setMenuOpen(false);
    if (pathname === "/") {
      document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/${hash}`);
    }
  };

  return (
    <header className={`topbar ${scrolled ? "topbar-scrolled" : ""}`}>
      <button 
        className="wordmark" 
        onClick={() => {
          if (pathname === "/") {
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            router.push("/");
          }
        }} 
        aria-label="DriveX home"
      >
        DRIVE<span>X</span>
      </button>
      
      <nav className="desktop-nav" aria-label="Primary navigation">
        <Link href="/vehicles">All Cars</Link>
        <button onClick={() => handleNav("#how")}>How It Works</button>
        <button onClick={() => handleNav("#why")}>About</button>
        <Link href="/contact" style={{ color: pathname === "/contact" ? "#4da3ff" : "inherit" }}>Contact</Link>
      </nav>
      
      <button className="nav-cta desktop-cta" onClick={() => handleNav("#booking")}>
        Book now <ArrowRight size={16} />
      </button>
      
      <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
        {menuOpen ? <X /> : <Menu />}
      </button>
      
      {menuOpen && (
        <nav className="mobile-nav">
          <Link href="/vehicles" onClick={() => setMenuOpen(false)}>All Cars</Link>
          <button onClick={() => handleNav("#how")}>How It Works</button>
          <button onClick={() => handleNav("#why")}>About</button>
          <Link href="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>
          <button onClick={() => handleNav("#booking")}>Book Now</button>
        </nav>
      )}
    </header>
  );
}
