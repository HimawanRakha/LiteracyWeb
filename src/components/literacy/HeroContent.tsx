import { Button } from "@/components/ui/button";

interface HeroContentProps {
  onNavigateToCollection: () => void;
}

// Komponen untuk konten utama di hero section
const HeroContent: React.FC<HeroContentProps> = ({ onNavigateToCollection }) => {
  return (
    <div className="flex-1 max-w-5xl py-12">
      <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-6 leading-tight">
        PERJALANAN{" "}
        <span className="text-green-600">
          LITERASIMU
          <br />
          DIMULAI DI SINI!
        </span>
      </h1>
      <p className="text-2xl md:text-3xl text-black mb-8 max-w-lg font-bold">
        Dashboard Literasi Pribadimu –<br />
        Pantau, Evaluasi, Raih Target Bacaan
      </p>
      <Button onClick={onNavigateToCollection} size="lg" className="bg-white text-black hover:bg-white/90 font-semibold px-7 py-7 rounded-md text-xl" style={{ cursor: "pointer" }}>
        Baca sekarang
      </Button>
    </div>
  );
};

export default HeroContent;
