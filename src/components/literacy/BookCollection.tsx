import AddBookCard from "./AddBookCard";
import BookItem from "./BookItem";
import type { Book } from "@/index";
import { ArrowLeft } from "lucide-react";

interface BookCollectionProps {
  books: Book[];
  onAddNewBook: () => void;
  onGoBack: () => void; // Prop baru untuk handle kembali
}

// Komponen untuk halaman Koleksi Buku
const BookCollection: React.FC<BookCollectionProps> = ({ books, onAddNewBook, onGoBack }) => {
  return (
    <div className="min-h-screen w-full relative py-12 px-6 bg-white">
      {/* Tombol Kembali */}
      <button
        onClick={onGoBack}
        className="absolute top-8 left-8 z-20 flex items-center justify-center w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition-colors shadow-md"
        aria-label="Kembali ke halaman utama"
        style={{ cursor: "pointer" }}
      >
        <ArrowLeft className="w-6 h-6" />
      </button>

      {/* Dekorasi Latar Belakang */}
      <div className="w-screen h-screen absolute top-0 left-0 overflow-hidden ">
        <img src="/layer 1.png" alt="" className="absolute top-0 left-0" />
        <img src="/layer 2.png" alt="" className="absolute top-0 left-1/4" />
        <img src="/layer 3.png" alt="" className="absolute top-0 left-1/2" />
        <img src="/layer 4.png" alt="" className="absolute top-0 right-0" />
        <img src="/layer 5.png" alt="" className="absolute top-1/8 right-0" />
        <img src="/layer 6.png" alt="" className="absolute bottom-0 right-0" />
        <img src="/layer 7.png" alt="" className="absolute bottom-0 right-1/4" />
        <img src="/layer 8.png" alt="" className="absolute bottom-0 left-0" />
        <img src="/layer 9.png" alt="" className="absolute top-1/8 left-0" />
      </div>

      <h1 className="text-5xl font-bold text-center mb-12 text-green-800 relative z-10">KOLEKSI</h1>

      <div className="w-full flex justify-center">
        {/* Kontainer untuk daftar buku yang bisa digulir horizontal */}
        <div className="inline-flex items-start gap-8 overflow-x-auto whitespace-nowrap py-4 px-6 relative z-10 no-scrollbar">
          {books.map((book) => (
            // flex-shrink-0 mencegah kartu buku menjadi lebih kecil
            <div key={book.id} className="flex-shrink-0">
              <BookItem book={book} />
            </div>
          ))}
          <div className="flex-shrink-0">
            <AddBookCard onOpenModal={onAddNewBook} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCollection;
