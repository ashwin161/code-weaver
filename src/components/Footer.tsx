const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="py-8 px-6 text-center border-t border-border">
      <p className="text-muted-foreground text-sm">
        © {year} Your Name. Crafted with code.
      </p>
    </footer>
  );
};

export default Footer;
