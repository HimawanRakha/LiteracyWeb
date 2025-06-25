import { Plus } from "lucide-react";
import { Card } from "@/components/ui/card"; // Pastikan path import ini benar

interface AddBookCardProps {
  onOpenModal: () => void;
}

// Komponen untuk kartu "Tambahkan buku anda"
const AddBookCard: React.FC<AddBookCardProps> = ({ onOpenModal }) => {
  return (
    <div className="hidden lg:block relative">
      <Card className="w-72 h-[456px] bg-white/95 backdrop-blur-sm border-2 border-dashed border-black p-6 relative cursor-pointer" onClick={onOpenModal}>
        {/* Pita Penanda */}
        <div
          className="absolute top-0 right-8 w-12 h-20 bg-transparent bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url('/images/Vector 1.png')" }} // Pastikan path gambar ini benar
        ></div>
        <div className="flex flex-col items-center justify-center h-full text-center">
          <div className="w-12 h-12 border-2 border-gray-400 rounded-full flex items-center justify-center mb-4">
            <Plus className="w-6 h-6 text-gray-600" />
          </div>
          <p className="text-gray-700 font-medium">Tambahkan buku anda</p>
        </div>
      </Card>
    </div>
  );
};

export default AddBookCard;
