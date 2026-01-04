import { useEffect, useRef, useState } from "react";
import { Music, Heart, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Design Philosophy: Romantic Elegance with Modern Sophistication
 * - Color Palette: Cream background with dusty rose and warm gold accents
 * - Typography: Playfair Display (serif) for headings, Lato (sans-serif) for body
 * - Layout: Vertical scroll journey with asymmetric positioning
 * - Animations: Gentle fade-ins and parallax effects
 */

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Observe sections for fade-in animation
      const sections = document.querySelectorAll("[data-section]");
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.75) {
          setVisibleSections((prev) => {
            const newSet = new Set(prev);
            newSet.add(section.id);
            return newSet;
          });
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Our Love Story - Milad & Samane",
        text: "Join us in celebrating our love story",
        url: window.location.href,
      });
    } else {
      alert("Share link: " + window.location.href);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/80 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="font-display text-2xl font-bold text-primary">
            Our Love Story
          </h1>
          <div className="flex gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-primary hover:bg-primary/10"
            >
              <Share2 className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden pt-20"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/hero-romantic-1.jpg')",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/50" />
        </div>

        <div className="relative z-10 text-center max-w-2xl mx-auto px-4">
          <div className="mb-6 animate-pulse">
            <Heart className="w-12 h-12 mx-auto text-primary/60" />
          </div>
          <h1 className="font-display text-6xl md:text-7xl font-bold text-foreground mb-4">
            Milad & Samane
          </h1>
          <p className="font-serif-accent text-2xl italic text-foreground/70 mb-8">
            A love story worth celebrating
          </p>
          <div className="flex justify-center gap-4">
            <Button
              onClick={() =>
                document
                  .getElementById("story")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
            >
              Our Story
            </Button>
            <Button
              onClick={() =>
                document
                  .getElementById("playlist")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              variant="outline"
              className="border-primary text-primary hover:bg-primary/10 px-8 py-3"
            >
              <Music className="w-4 h-4 mr-2" />
              Playlist
            </Button>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section
        id="story"
        data-section
        className={`py-20 md:py-32 transition-all duration-700 ${
          visibleSections.has("story") ? "fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                Our Beginning
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Every great love story starts with a moment. A glance, a smile, a conversation
                that changes everything. Our story is one of those beautiful moments that
                turned into a lifetime of memories.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                From that first meeting to this very moment, every day with you has been a
                gift. Thank you for being my greatest adventure.
              </p>
            </div>
            <div className="romantic-frame h-96 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <p className="text-6xl mb-4">💕</p>
                <p className="text-foreground/60">Your photo here</p>
              </div>
            </div>
          </div>

          <div className="section-divider" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="romantic-frame h-96 bg-gradient-to-br from-accent/10 to-primary/10 flex items-center justify-center order-2 md:order-1">
              <div className="text-center">
                <p className="text-6xl mb-4">💑</p>
                <p className="text-foreground/60">Your photo here</p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-6">
                Growing Together
              </h2>
              <p className="text-lg text-foreground/80 leading-relaxed mb-4">
                Love isn't just about the big moments. It's about the quiet mornings, the
                inside jokes, the way you make me laugh when I want to cry.
              </p>
              <p className="text-lg text-foreground/80 leading-relaxed">
                Every day, I fall in love with you all over again. Thank you for choosing
                to build this beautiful life with me.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Playlist Section */}
      <section
        id="playlist"
        data-section
        className={`py-20 md:py-32 bg-gradient-to-b from-transparent to-primary/5 transition-all duration-700 ${
          visibleSections.has("playlist") ? "fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-4">
              Our Playlist
            </h2>
            <p className="text-lg text-foreground/70">
              The soundtrack to our love story
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 md:p-12">
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors"
                >
                  <Music className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">Song {i}</p>
                    <p className="text-sm text-foreground/60">Artist Name</p>
                  </div>
                  <span className="text-sm text-foreground/50">3:45</span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-center">
              <p className="text-foreground/70 mb-4">
                Add your Spotify playlist or songs here
              </p>
              <Button className="bg-primary hover:bg-primary/90 text-white">
                Add Your Playlist
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Photos Section */}
      <section
        id="photos"
        data-section
        className={`py-20 md:py-32 transition-all duration-700 ${
          visibleSections.has("photos") ? "fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-primary mb-12 text-center">
            Our Memories
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="romantic-frame h-64 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center hover:shadow-xl transition-shadow"
              >
                <div className="text-center">
                  <p className="text-5xl mb-2">📷</p>
                  <p className="text-foreground/60">Photo {i}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing Section */}
      <section
        id="closing"
        data-section
        className={`py-20 md:py-32 bg-gradient-to-b from-primary/5 to-transparent transition-all duration-700 ${
          visibleSections.has("closing") ? "fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div
            className="mb-8 bg-cover bg-center rounded-lg h-64 shadow-lg"
            style={{
              backgroundImage: "url('/images/hero-romantic-2.jpg')",
            }}
          />

          <div className="font-persian text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 text-right space-y-6">
            <p className="font-semibold text-primary mb-4">
              به نامِ آفریننده عشق
            </p>
            <p>
              نازنینم، خانم‌گلیِ من،
            </p>
            <p>
              امروز که به عقب نگاه می‌کنم، به هجدهم دی‌ماه سال گذشته، باورم نمی‌شود که یک «سلام» ساده و کمی شوخی، سرآغازِ زیباترین فصل زندگی من شد. انگار همین دیروز بود که لابلای اولین حرف‌هایمان فهمیدیم چقدر دنیایمان به هم نزدیک است
            </p>
            <p>
              یادم هست چقدر زود صمیمی شدیم. همان شب‌ها بود که فهمیدم تو فقط یک همراه نیستی، بلکه کسی هستی که نگاه عمیق و مسئولانه‌اش به زندگی و آینده، دقیقا همان چیزی است که همیشه در رویاهایم به دنبالش بودم.
            </p>
            <p>
              عزیزِ دلم، هرگز فراموش نمی‌کنم، آن روزهای جنگ و نامزدی، لرزش صدایم و تپش قلبم گواهی می‌داد که نیمه‌ی گمشده‌ام را یافته‌ام و می‌خواهم با تمام توان برای آن تلاش کنم. از آن روز به بعد، واژه‌ی «ما» برای من معنای دیگری پیدا کرد.
            </p>
            <p>
              در این یک سال، ما از مرزهای یک آشنایی ساده گذشتیم و ریشه‌هایمان در خانه‌های هم دوید.
            </p>
            <p>
              «نفسِ» من، تو حالا تمامِ دنیای منی. در این سالگرد، دوباره به تو قول می‌دهم که همان تکیه‌گاهی باشم که همیشه آرزویش را داشتی. ممنونم که با آمدنت، زمستان سرد دی‌ماه مرا به بهاری همیشگی تبدیل کردی.
            </p>
            <p className="font-semibold text-primary mt-6">
              سالگردِ یکی شدنِ دل‌هایمان مبارک، گلِ من.
            </p>
            <p className="text-foreground/70 mt-4">
              دوستدارِ همیشگی تو، میلاد
            </p>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              onClick={handleShare}
              className="bg-primary hover:bg-primary/90 text-white px-8 py-3"
            >
              <Share2 className="w-4 h-4 mr-2" />
              Share This Page
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-8 text-center text-foreground/60">
        <p className="text-sm">
          Made with <Heart className="w-4 h-4 inline text-primary" /> for our
          anniversary
        </p>
      </footer>
    </div>
  );
}
