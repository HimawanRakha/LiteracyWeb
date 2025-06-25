import { User } from "lucide-react";

// Komponen untuk bilah navigasi
const Navigation = () => {
  return (
    <nav className="relative z-10 flex items-center justify-between p-4 md:p-6">
      <div className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full ml-5">{/* Anda bisa menempatkan logo di sini */}</div>

      <div className="flex items-center space-x-4 md:space-x-8">
        <a href="#" className="text-white font-medium underline underline-offset-4 text-lg md:text-xl">
          Home
        </a>
        <a href="#" className="text-white/80 font-medium hover:text-white transition-colors text-lg md:text-xl">
          About Us
        </a>
        <a href="#" className="text-white/80 font-medium hover:text-white transition-colors text-lg md:text-xl">
          Koleksi
        </a>
      </div>

      <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
        <User className="w-6 h-6 text-white" />
      </div>
    </nav>
  );
};

export default Navigation;
