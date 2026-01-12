import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sun, Moon, Menu, X } from "lucide-react";
import AnimatedLogo from "./AnimatedLogo";

interface HeaderProps {
  onScrollTo: (target: string) => void;
}

const Header = ({ onScrollTo }: HeaderProps) => {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  const navItems = [
    { label: "About", target: "about" },
    { label: "Work", target: "work" },
    { label: "Skills", target: "skills" },
    { label: "Contact", target: "contact" },
  ];

  const handleNavClick = (target: string) => {
    onScrollTo(target);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 w-full px-6 md:px-12 py-4 flex justify-between items-center z-50 transition-all duration-500 ${
          isScrolled 
            ? "backdrop-blur-xl bg-background/70 border-b border-border/50 shadow-lg shadow-background/5" 
            : "backdrop-blur-md bg-background/30"
        }`}
      >
        <AnimatedLogo />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-2">
          {navItems.map(({ label, target }) => (
            <button 
              key={target}
              onClick={() => handleNavClick(target)} 
              className="relative px-4 py-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium group"
            >
              <span className="relative z-10">{label}</span>
              <span className="absolute inset-0 bg-foreground/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          ))}
          
          <div className="w-[1px] h-6 bg-border mx-2" />
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full border border-border/50 hover:bg-secondary hover:border-primary/30 hover:text-primary transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {theme === "dark" ? <Sun className="w-5 h-5 relative z-10" /> : <Moon className="w-5 h-5 relative z-10" />}
          </Button>
          
          <Button 
            onClick={() => handleNavClick("contact")}
            className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 hover:shadow-lg hover:shadow-foreground/10 transition-all duration-300 relative overflow-hidden group"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <span className="relative z-10">Let's Talk</span>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-3">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={toggleTheme}
            className="rounded-full border border-border/50"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
          
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="rounded-full border border-border/50"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-x-0 top-[72px] z-40 md:hidden transition-all duration-500 ${
          isMobileMenuOpen 
            ? "opacity-100 translate-y-0 pointer-events-auto" 
            : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <nav className="mx-4 p-4 rounded-2xl bg-background/95 backdrop-blur-xl border border-border/50 shadow-xl shadow-background/10">
          {navItems.map(({ label, target }, index) => (
            <button 
              key={target}
              onClick={() => handleNavClick(target)} 
              className="w-full text-left px-4 py-3 text-foreground hover:text-primary hover:bg-primary/5 rounded-xl transition-all duration-300 font-medium"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {label}
            </button>
          ))}
          <div className="mt-4 pt-4 border-t border-border">
            <Button 
              onClick={() => handleNavClick("contact")}
              className="w-full rounded-full bg-foreground text-background"
            >
              Let's Talk
            </Button>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Header;
