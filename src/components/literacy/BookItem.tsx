import { Card } from "@/components/ui/card";
import type { Book } from "@/index"; // Kita akan buat tipe data ini nanti

interface BookItemProps {
  book: Book;
}

// Komponen untuk menampilkan satu item buku di koleksi
const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <a href="#" className="block group">
      <Card className="w-72 h-[456px] bg-white p-4 relative overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
        <div className="w-full h-full flex flex-col items-center">
          {/* Tampilan gambar sampul */}
          <img src={book.coverImage} alt={`Cover of ${book.title}`} className="w-full h-4/5 object-cover rounded-md mb-3" />
          {/* Tampilan judul dan penulis */}
          <div className="text-center w-full">
            <h3 className="font-bold text-2xl truncate text-black">{book.title}</h3>
            <p className="text-lg text-gray-600">{book.author}</p>
          </div>
        </div>
      </Card>
    </a>
  );
};

export default BookItem;
