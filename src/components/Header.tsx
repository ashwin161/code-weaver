import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

interface HeaderProps {
  onScrollTo: (target: string) => void;
}

const Header = ({ onScrollTo }: HeaderProps) => {
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="fixed top-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 backdrop-blur-md">
      <div className="text-2xl font-bold font-display tracking-tight">
        YN<span className="text-primary">.</span>
      </div>
      
      <nav className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={() => onScrollTo("about")} 
          className="hidden md:block text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          About
        </button>
        <button 
          onClick={() => onScrollTo("work")} 
          className="hidden md:block text-muted-foreground hover:text-foreground transition-colors text-sm"
        >
          Work
        </button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full border border-border hover:bg-secondary hover:text-primary"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        
        <Button 
          onClick={() => onScrollTo("contact")}
          className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg hover:shadow-primary/20 transition-all duration-300"
        >
          Let's Talk
        </Button>
      </nav>
    </header>
  );
};

export default Header;
