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
  const ref = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-item", { scrollTrigger: { trigger: ref.current, start: "top 80%" }, y: 60, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out" });
    }, ref);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "Thanks for reaching out. I'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="min-h-screen py-24 px-6 md:px-12 flex items-center justify-center">
      <div className="w-full max-w-xl">
        <h2 className="contact-item text-3xl md:text-5xl font-display font-bold mb-8 text-center">Ready to collaborate?</h2>
        <form onSubmit={handleSubmit} className="contact-item bg-card border border-border rounded-3xl p-8 md:p-12 space-y-6 shadow-xl">
          {[{ id: "name", type: "text", label: "Name" }, { id: "email", type: "email", label: "Email" }].map((f) => (
            <div key={f.id} className="space-y-2">
              <label htmlFor={f.id} className="text-sm text-muted-foreground">{f.label}</label>
              <Input id={f.id} type={f.type} required value={form[f.id as keyof typeof form]} onChange={(e) => setForm({ ...form, [f.id]: e.target.value })} className="bg-secondary/50 border-border focus:border-primary rounded-xl h-12 transition-all" />
            </div>
          ))}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm text-muted-foreground">Message</label>
            <Textarea id="message" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-secondary/50 border-border focus:border-primary rounded-xl resize-none transition-all" />
          </div>
          <Button type="submit" className="w-full rounded-full py-6 text-base bg-primary text-primary-foreground hover:bg-primary/90 hover:translate-y-[-2px] hover:shadow-lg hover:shadow-primary/30 transition-all">
            Send Message
          </Button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
