import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

interface HeaderProps {
  onScrollTo: (target: string) => void;
}

const Header = ({ onScrollTo }: HeaderProps) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      // Default to light mode
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <header className="fixed top-0 w-full px-6 md:px-12 py-6 flex justify-between items-center z-50 backdrop-blur-md bg-background/80 border-b border-border/50">
      <AnimatedLogo />
      
      <nav className="flex items-center gap-4 md:gap-8">
        <button 
          onClick={() => onScrollTo("about")} 
          className="hidden md:block text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
        >
          About
        </button>
        <button 
          onClick={() => onScrollTo("work")} 
          className="hidden md:block text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
        >
          Work
        </button>
        
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleTheme}
          className="rounded-full border border-border hover:bg-secondary hover:text-primary transition-all duration-300"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </Button>
        
        <Button 
          onClick={() => onScrollTo("contact")}
          className="rounded-full px-6 bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
        >
          Let's Talk
        </Button>
      </nav>
    </header>
  );
};

export default Header;
