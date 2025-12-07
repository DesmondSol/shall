import { useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ArrowRight, Heart, Star, Sparkles, Instagram, Mail, Phone, ShoppingBag, Menu, X, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";

// Assets
import heroBg from "@assets/generated_images/artisan_hands_crafting_silk_ribbon_roses.png";
import bouquetRed from "@assets/generated_images/luxurious_bouquet_of_red_and_blush_ribbon_roses.png";
import bouquetWhite from "@assets/generated_images/elegant_white_wedding_ribbon_bouquet.png";
import grandBox from "@assets/generated_images/grand_hatbox_filled_with_ribbon_roses.png";
import textureBg from "@assets/generated_images/abstract_silk_ribbon_texture_background.png";

// Animation Variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);

  // Scroll listener for nav
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 50);
    });
  }

  return (
    <div className="min-h-screen bg-background text-foreground font-sans overflow-x-hidden">
      <Navigation isScrolled={isScrolled} />
      <HeroSection />
      <PhilosophySection />
      <CollectionsSection />
      <TieredCollectionsSection />
      <GallerySection />
      <PricingSection />
      <ConciergeSection />
      <Footer />
    </div>
  );
}

function Navigation({ isScrolled }: { isScrolled: boolean }) {
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/90 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <a href="#" className={`text-2xl font-serif tracking-tighter font-bold ${isScrolled ? "text-foreground" : "text-white"}`}>
          Shäll Bouquets
        </a>
        
        <div className="hidden md:flex gap-8 items-center">
          {["Philosophy", "Collections", "Pricing", "Concierge"].map((item) => (
            <a 
              key={item} 
              href={`#${item.toLowerCase()}`}
              className={`text-sm tracking-widest uppercase hover:text-primary transition-colors ${
                isScrolled ? "text-foreground" : "text-white/90"
              }`}
            >
              {item}
            </a>
          ))}
          <Button variant="outline" className={`rounded-none border-primary text-primary hover:bg-primary hover:text-white transition-all ${!isScrolled && "border-white text-white hover:bg-white hover:text-black"}`}>
            Order Now
          </Button>
        </div>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden text-primary">
              <Menu className={isScrolled ? "text-foreground" : "text-white"} />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col gap-6 mt-12">
              <a href="#philosophy" className="text-2xl font-serif">Philosophy</a>
              <a href="#collections" className="text-2xl font-serif">Collections</a>
              <a href="#pricing" className="text-2xl font-serif">Pricing</a>
              <a href="#concierge" className="text-2xl font-serif">Concierge</a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}

function HeroSection() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax */}
      <motion.div style={{ y }} className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black/40 z-10" />
        <motion.img 
          src={heroBg} 
          alt="Artisan hands crafting flowers" 
          className="w-full h-full object-cover"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        />
      </motion.div>

      <div className="relative z-20 text-center text-white max-w-4xl px-4">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p variants={fadeIn} className="text-sm md:text-base tracking-[0.3em] uppercase mb-4 text-white/80">
            A New Language of Luxury
          </motion.p>
          <motion.h1 variants={fadeIn} className="text-5xl md:text-7xl lg:text-8xl font-serif font-medium mb-6 leading-tight">
            Forever Flowers,<br/>Woven with Intention
          </motion.h1>
          <motion.p variants={fadeIn} className="text-lg md:text-xl font-light text-white/90 mb-10 max-w-2xl mx-auto">
            Not Just a Bouquet—An Heirloom. Ethiopian craftsmanship meets timeless elegance.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Button size="lg" className="rounded-none bg-white text-black hover:bg-white/90 hover:scale-105 transition-transform duration-300 px-8 py-6 text-lg tracking-widest">
              ENTER THE GARDEN
            </Button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/70 flex flex-col items-center gap-2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-[1px] h-12 bg-white/50" />
      </motion.div>
    </section>
  );
}

function PhilosophySection() {
  return (
    <section id="philosophy" className="py-24 md:py-32 relative bg-background overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
        <img src={textureBg} alt="Texture" className="w-full h-full object-cover" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.h2 variants={fadeIn} className="text-4xl md:text-5xl font-serif mb-8 text-primary">
              Why Ribbon, Why Forever?
            </motion.h2>
            <motion.p variants={fadeIn} className="text-xl md:text-2xl font-light mb-12 italic text-muted-foreground">
              "We believe the most precious emotions shouldn’t wilt."
            </motion.p>
            
            <div className="space-y-8">
              {[
                { title: "For the Fashion-Forward", desc: "This is accessory artistry. A statement piece for your space or person." },
                { title: "For the Sentimental Soul", desc: "A tactile memory you can hold, years later, that still looks perfect." },
                { title: "For the Conscious Consumer", desc: "Sustainable, reusable, and waste-free celebration." },
                { title: "For the Detail-Obsessed", desc: "Unlimited customization. Color, size, texture, occasion—we speak your vision." }
              ].map((item, i) => (
                <motion.div key={i} variants={fadeIn} className="flex gap-4 group">
                  <div className="w-1 h-full bg-primary/20 group-hover:bg-primary transition-colors min-h-[3rem]" />
                  <div>
                    <h3 className="text-lg font-medium font-serif mb-1">{item.title}</h3>
                    <p className="text-muted-foreground font-light">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative h-[600px] w-full"
          >
            <div className="absolute top-10 left-10 w-3/4 h-3/4 bg-primary/5 z-0" />
            <img 
              src={bouquetRed} 
              alt="Red Ribbon Bouquet" 
              className="absolute inset-0 w-full h-full object-cover shadow-2xl z-10"
              style={{ clipPath: "polygon(10% 0, 100% 0, 100% 90%, 0% 100%)" }}
            />
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-primary/30 z-20 flex items-center justify-center bg-background/80 backdrop-blur-sm">
              <span className="font-serif text-2xl text-primary">Est. 2025</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function CollectionsSection() {
  const collections = [
    {
      title: "The Secret Whisper",
      subtitle: "Confessions & Proposals",
      desc: "For when the moment must be as eternal as the feeling.",
      image: bouquetRed,
      items: ["The 'One & Only' Single Rose", "The 'Yes' Ensemble", "The Serenade Set"]
    },
    {
      title: "The Eternal Vow",
      subtitle: "Weddings & Anniversaries",
      desc: "Recreate your wedding bouquet to cherish forever.",
      image: bouquetWhite,
      items: ["Bridal Heirloom Bouquet", "Bridesmaid Keepsakes", "'Year After Year' Series"]
    },
    {
      title: "The Celebratory Spark",
      subtitle: "Birthdays & Achievements",
      desc: "Milestones deserve markers that last.",
      image: grandBox,
      items: ["Birthday Brilliance Box", "The Crown Her Collection", "Graduation Sheaf"]
    },
    {
      title: "The Gentle Embrace",
      subtitle: "Sympathy & Memorial",
      desc: "Beauty that comforts and endures.",
      image: textureBg, // Using texture as placeholder for wreath
      items: ["Soft Remembrance Wreath", "Petal Memory Box"]
    }
  ];

  return (
    <section id="collections" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-sm tracking-widest uppercase">Curated Collections</span>
          <h2 className="text-4xl md:text-5xl font-serif mt-4">Every Chapter of Your Story</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {collections.map((col, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative bg-background overflow-hidden border border-border/50 hover:shadow-xl transition-all duration-500"
            >
              <div className="grid md:grid-cols-2 h-full">
                <div className="h-64 md:h-full overflow-hidden">
                  <img 
                    src={col.image} 
                    alt={col.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <span className="text-xs text-primary uppercase tracking-widest mb-2">{col.subtitle}</span>
                  <h3 className="text-2xl font-serif mb-4 group-hover:text-primary transition-colors">{col.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed">{col.desc}</p>
                  <ul className="space-y-2 mb-8">
                    {col.items.map((item, i) => (
                      <li key={i} className="flex items-center text-xs font-medium text-foreground/80">
                        <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <Button variant="link" className="self-start p-0 h-auto text-primary group-hover:translate-x-2 transition-transform">
                    Explore Collection <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TieredCollectionsSection() {
  const tiers = [
    {
      name: "Petal Pouch",
      price: "400 Birr",
      desc: "Subtle, portable elegance.",
      details: ["1-3 delicate ribbon flowers", "Luxurious velvet drawstring pouch", "Ideal for thoughtful gestures"],
      icon: Heart
    },
    {
      name: "Signature Sparkle",
      price: "1,200 Birr",
      desc: "Our classic statement piece.",
      details: ["5-15 roses in requested designs", "Premium gift box with tissue", "Optional crystal accents"],
      icon: Sparkles,
      featured: true
    },
    {
      name: "Grand Bloom Box",
      price: "3,600 Birr",
      desc: "An experience, a masterpiece.",
      details: ["18+ roses in artful arrangement", "Ornate keepsake box or vase", "Custom foliage & theming"],
      icon: Star
    }
  ];

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Signature Tiers</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">Choose the perfect scale for your sentiment.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className={`relative p-8 border ${tier.featured ? "border-primary shadow-lg bg-primary/5" : "border-border"} hover:border-primary/50 transition-colors duration-300 flex flex-col`}
            >
              {tier.featured && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white text-xs py-1 px-4 uppercase tracking-widest">
                  Most Loved
                </div>
              )}
              
              <tier.icon className={`w-8 h-8 mb-6 ${tier.featured ? "text-primary" : "text-muted-foreground"}`} />
              
              <h3 className="text-2xl font-serif mb-2">{tier.name}</h3>
              <p className="text-muted-foreground text-sm mb-6 h-10">{tier.desc}</p>
              
              <div className="text-3xl font-serif mb-8">
                <span className="text-sm font-sans text-muted-foreground mr-1">Starting at</span>
                {tier.price}
              </div>

              <Separator className="mb-6" />

              <ul className="space-y-4 mb-8 flex-1">
                {tier.details.map((detail, i) => (
                  <li key={i} className="flex items-start text-sm text-foreground/80">
                    <Check className="w-4 h-4 text-primary mr-3 mt-0.5 shrink-0" />
                    {detail}
                  </li>
                ))}
              </ul>

              <Button className={`w-full rounded-none py-6 ${tier.featured ? "bg-primary text-white hover:bg-primary/90" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"}`}>
                Select Tier
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GallerySection() {
  return (
    <section className="py-24 bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-serif mb-4">The Gallery of Smiles</h2>
            <p className="text-white/60">Behind Every Petal, A Story.</p>
          </div>
          
          <div className="flex gap-8 text-center">
            {[
              { num: "60+", label: "Happy Customers" },
              { num: "3k+", label: "Flowers Crafted" },
              { num: "20+", label: "Events" }
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-3xl font-serif text-primary">{stat.num}</div>
                <div className="text-xs uppercase tracking-widest text-white/50">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 h-[600px]">
          <div className="col-span-2 row-span-2 relative group overflow-hidden">
            <img src={heroBg} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery 1" />
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="font-serif italic text-xl px-8 text-center">"A birthday surprise that made her cry happy tears."</p>
            </div>
          </div>
          <div className="col-span-1 row-span-1 relative group overflow-hidden">
            <img src={bouquetRed} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery 2" />
          </div>
          <div className="col-span-1 row-span-2 relative group overflow-hidden">
             <img src={bouquetWhite} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery 3" />
             <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <p className="font-serif italic text-sm px-4 text-center">"A wedding bouquet that now sits on a mantlepiece."</p>
            </div>
          </div>
          <div className="col-span-1 row-span-1 relative group overflow-hidden">
            <img src={grandBox} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Gallery 4" />
          </div>
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  return (
    <section id="pricing" className="py-24 bg-background">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Transparency in Artistry</h2>
          <p className="text-muted-foreground">All prices serve as a base guide. Final quote reflects your custom choices.</p>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-2xl font-serif mb-6 text-primary border-b border-primary/20 pb-2 inline-block">Petite Perfection</h3>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-primary/10">
                  <TableHead className="w-[100px] text-primary">Roses</TableHead>
                  <TableHead className="text-right w-[120px] text-primary">Price (Birr)</TableHead>
                  <TableHead className="pl-8 text-primary">Perfect For...</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { roses: "1", price: "400", desc: "\"I'm thinking of you.\"" },
                  { roses: "5", price: "1,200", desc: "\"You mean so much.\"" },
                  { roses: "10", price: "2,400", desc: "\"You are spectacular.\"" },
                  { roses: "15", price: "3,200", desc: "\"My heart is full.\"" }
                ].map((row, i) => (
                  <TableRow key={i} className="hover:bg-primary/5 border-primary/10 transition-colors">
                    <TableCell className="font-medium font-serif">{row.roses} Rose{row.roses !== "1" && "s"}</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">{row.price}</TableCell>
                    <TableCell className="pl-8 italic text-muted-foreground">{row.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div>
            <h3 className="text-2xl font-serif mb-6 text-primary border-b border-primary/20 pb-2 inline-block">Grand Declarations</h3>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-primary/10">
                  <TableHead className="w-[100px] text-primary">Roses</TableHead>
                  <TableHead className="text-right w-[120px] text-primary">Price (Birr)</TableHead>
                  <TableHead className="pl-8 text-primary">Perfect For...</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  { roses: "18", price: "3,600", desc: "\"You are my everything.\"" },
                  { roses: "24", price: "4,800", desc: "\"Happy Anniversary, my love.\"" },
                  { roses: "36", price: "6,000", desc: "\"My partner in all things.\"" },
                  { roses: "50", price: "9,200", desc: "\"A love that knows no bounds.\"" }
                ].map((row, i) => (
                  <TableRow key={i} className="hover:bg-primary/5 border-primary/10 transition-colors">
                    <TableCell className="font-medium font-serif">{row.roses} Roses</TableCell>
                    <TableCell className="text-right font-mono text-muted-foreground">{row.price}</TableCell>
                    <TableCell className="pl-8 italic text-muted-foreground">{row.desc}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}

function ConciergeSection() {
  return (
    <section id="concierge" className="py-24 bg-secondary/30 relative overflow-hidden">
      <div className="absolute right-0 bottom-0 opacity-5 w-1/2 h-full pointer-events-none">
         <img src={heroBg} className="w-full h-full object-cover mix-blend-multiply grayscale" alt="texture" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16">
          <div>
            <span className="text-primary text-sm tracking-widest uppercase block mb-4">The Custom Concierge</span>
            <h2 className="text-5xl md:text-6xl font-serif mb-8 leading-tight">"You Dream It,<br/>We Make It"</h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-md">
              Have a vision that doesn't fit a box? We specialize in the unique.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {[
                "Corporate Gifting",
                "Event Backdrops",
                "Exact Replicas",
                "Fabric Integration"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 bg-white/50 border border-white/50 shadow-sm">
                   <div className="w-2 h-2 bg-primary rotate-45" />
                   <span className="font-serif text-lg">{item}</span>
                </div>
              ))}
            </div>

            <div className="space-y-6">
              <h3 className="font-serif text-2xl mb-4">Contact The Atelier</h3>
              <a href="mailto:shallbouquetsever@gmail.com" className="flex items-center gap-4 hover:text-primary transition-colors">
                <div className="w-10 h-10 bg-white flex items-center justify-center shadow-sm">
                  <Mail className="w-4 h-4" />
                </div>
                <span>shallbouquetsever@gmail.com</span>
              </a>
              <a href="tel:+251929315590" className="flex items-center gap-4 hover:text-primary transition-colors">
                <div className="w-10 h-10 bg-white flex items-center justify-center shadow-sm">
                  <Phone className="w-4 h-4" />
                </div>
                <span>+251 929 315 590</span>
              </a>
              <a href="#" className="flex items-center gap-4 hover:text-primary transition-colors">
                <div className="w-10 h-10 bg-white flex items-center justify-center shadow-sm">
                  <Instagram className="w-4 h-4" />
                </div>
                <span>@shallbouquets</span>
              </a>
            </div>
          </div>

          <div className="bg-white p-8 md:p-12 shadow-2xl border border-border/50 relative">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
            <h3 className="text-2xl font-serif mb-8 text-center">Begin Your Commission</h3>
            
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Name</label>
                  <Input placeholder="Your Name" className="rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-muted-foreground">Contact</label>
                  <Input placeholder="Phone or Email" className="rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Occasion</label>
                <Input placeholder="Wedding, Anniversary, Just Because..." className="rounded-none border-t-0 border-x-0 border-b border-input bg-transparent px-0 focus-visible:ring-0 focus-visible:border-primary" />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-muted-foreground">Share Your Dream</label>
                <Textarea placeholder="Describe your vision, colors, and feelings..." className="rounded-none border-input bg-transparent min-h-[120px] focus-visible:ring-0 focus-visible:border-primary resize-none" />
              </div>

              <Button type="submit" className="w-full bg-primary text-white rounded-none py-6 text-lg hover:bg-primary/90 transition-all mt-4">
                Request Digital Sketch
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-foreground text-background py-16 border-t border-white/10">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-serif mb-6">Shäll Bouquets</h2>
        <p className="text-white/60 mb-8 font-light italic">Forever starts with a single, perfect petal.</p>
        
        <div className="w-12 h-[1px] bg-white/20 mx-auto mb-8" />
        
        <div className="text-xs text-white/40 max-w-2xl mx-auto leading-relaxed">
          <p className="mb-4">Addis Ababa, Ethiopia</p>
          <p>*Each Shäll Bouquet is a unique, handcrafted work of art. Minor variations in hue and form are part of its authentic charm. Please allow 5-7 days for standard commissions.</p>
          <p className="mt-8">© 2025 Shäll Bouquets. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
