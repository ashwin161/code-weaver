import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-animate", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
        y: 60,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon.",
    });
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="min-h-screen py-24 px-6 md:px-12 flex items-center justify-center"
    >
      <div className="w-full max-w-xl">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-8 text-center contact-animate">
          Ready to collaborate?
        </h2>

        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-3xl p-8 md:p-12 space-y-6 shadow-xl contact-animate">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm text-muted-foreground">Name</label>
            <Input
              id="name"
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-secondary/50 border-border focus:border-primary rounded-xl h-12 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-muted-foreground">Email</label>
            <Input
              id="email"
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-secondary/50 border-border focus:border-primary rounded-xl h-12 transition-all duration-300"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="message" className="text-sm text-muted-foreground">Message</label>
            <Textarea
              id="message"
              required
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="bg-secondary/50 border-border focus:border-primary rounded-xl resize-none transition-all duration-300"
            />
          </div>

          <Button 
            type="submit"
            className="w-full rounded-full py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/30 transition-all duration-300"
          >
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
