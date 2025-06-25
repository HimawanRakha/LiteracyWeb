import { User } from "lucide-react";

interface NavigationProps {
  onNavigateToCollection: () => void;
  onNavigateToHome: () => void;
}

// Komponen untuk bilah navigasi
const Navigation: React.FC<NavigationProps> = ({ onNavigateToCollection, onNavigateToHome }) => {
  return (
    <nav className="relative z-10 flex items-center justify-between p-4 md:p-6">
      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full ml-5">{/* Anda bisa menempatkan logo di sini */}</div>

      <div className="flex items-center space-x-4 md:space-x-8">
        <button onClick={onNavigateToHome} className="text-white font-medium underline underline-offset-4 text-lg md:text-xl bg-transparent border-none cursor-pointer">
          Home
        </button>
        <a href="#" className="text-white/80 font-medium hover:text-white transition-colors text-lg md:text-xl">
          About Us
        </a>
        <button onClick={onNavigateToCollection} className="text-white/80 font-medium hover:text-white transition-colors text-lg md:text-xl bg-transparent border-none cursor-pointer">
          Koleksi
        </button>
      </div>

      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-white" />
      </div>
    </nav>
  );
};

export default Navigation;
