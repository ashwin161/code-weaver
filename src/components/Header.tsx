import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  onScrollTo: (target: string) => void;
}

const Header = ({ onScrollTo }: HeaderProps) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("theme");
    const dark = saved === "dark";
    setIsDark(dark);
    document.documentElement.classList.toggle("dark", dark);
  }, []);

  const toggle = () => {
    const newDark = !isDark;
    setIsDark(newDark);
    localStorage.setItem("theme", newDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newDark);
  };

  return (
    <header className="fixed top-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 backdrop-blur-md bg-background/80">
      <div className="text-2xl font-bold font-display tracking-tight">YN<span className="text-primary">.</span></div>
      <nav className="flex items-center gap-4 md:gap-8">
        <button onClick={() => onScrollTo("about")} className="hidden md:block text-muted-foreground hover:text-primary transition-colors text-sm font-medium">About</button>
        <button onClick={() => onScrollTo("work")} className="hidden md:block text-muted-foreground hover:text-primary transition-colors text-sm font-medium">Work</button>
        <Button variant="ghost" size="icon" onClick={toggle} className="rounded-full border border-border hover:bg-secondary hover:text-primary transition-all">
          {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        <Button onClick={() => onScrollTo("contact")} className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all">
          Let's Talk
        </Button>
      </nav>
    </header>
  );
};

export default Header;
