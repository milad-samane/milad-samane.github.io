import { useEffect, useRef, useState } from "react";
import { Music, Heart } from "lucide-react";
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
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const tracks = [
    {
      title: "Ghalbe Mani",
      artist: "Haamim",
      src: "/music/Haamim - Ghalbe Mani (128).mp3",
      duration: "3:45",
    },
    {
      title: "Az Doost Dashtan",
      artist: "Homayoun Shajaryan",
      src: " /music/Homayoun Shajaryan-Az Doost Dashtan -musicdel.ir 128.mp3",
      duration: "4:10",
    },
    {
      title: "Chelcheragh",
      artist: "Reza Yazdani",
      src: "/music/Reza Yazdani - Chelcheragh (128).mp3",
      duration: "4:00",
    },
  ];

  const photos = [
    {
      src: "/images/decorative-roses.jpg",
      label: "Roses",
    },
    {
      src: "/images/photo_2026-01-05_12-11-38.jpg",
      label: "Memory 1",
    },
    {
      src: "/images/photo_2026-01-05_12-12-44.jpg",
      label: "Memory 2",
    },
    {
      src: "/images/photo_2026-01-05_12-13-18.jpg",
      label: "Memory 3",
    },
  ];

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
        <div className="max-w-2xl mx-auto px-4 text-center">
          <div
            className="mb-8 bg-cover bg-center rounded-lg h-64 shadow-lg"
            style={{
              backgroundImage: "url('/images/hero-romantic-2.jpg')",
            }}
          />

          <div className="font-persian text-lg md:text-xl text-foreground/80 leading-relaxed mb-8 space-y-6" dir="rtl">
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
              {tracks.map((track, index) => (
                <div
                  key={track.src}
                  className={`flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-colors cursor-pointer ${
                    index === currentTrackIndex ? "bg-primary/10" : ""
                  }`}
                  onClick={() => {
                    setCurrentTrackIndex(index);
                    if (audioRef.current) {
                      audioRef.current.play().catch(() => {});
                    }
                  }}
                >
                  <Music className="w-5 h-5 text-primary flex-shrink-0" />
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">
                      {index + 1}. {track.title}
                    </p>
                    <p className="text-sm text-foreground/60">
                      {track.artist}
                    </p>
                  </div>
                  <span className="text-sm text-foreground/50">
                    {track.duration}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg text-center">
              <audio
                controls
                className="w-full mt-4"
                ref={audioRef}
                src={tracks[currentTrackIndex]?.src}
              >
                Your browser does not support the audio element.
              </audio>
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
            {photos.map((photo) => (
              <div
                key={photo.src}
                className="romantic-frame h-64 bg-cover bg-center flex items-center justify-center hover:shadow-xl transition-shadow"
                style={{ backgroundImage: `url('${photo.src}')` }}
              >
                <div className="bg-background/70 px-4 py-2 rounded-full text-sm text-foreground/70">
                  {photo.label}
                </div>
              </div>
            ))}
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
