"use client";

import { useState } from "react";
import Navigation from "./Navigation";
import HeroContent from "./HeroContent";
import AddBookCard from "./AddBookCard";
import AddBookModal from "./AddBookModal/AddBookModal";
import BookCollection from "./BookCollection";
import type { Book } from "@/index";

// Komponen Induk Utama yang mengatur tampilan
export default function LiteracyLanding() {
  const [view, setView] = useState<"landing" | "collection">("landing");
  const [books, setBooks] = useState<Book[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBook = (newBook: Book) => {
    setBooks((prevBooks) => [...prevBooks, newBook]);
    setView("collection");
  };

  // Fungsi untuk kembali ke landing page
  const handleGoToLanding = () => {
    setView("landing");
  };

  // Fungsi untuk pergi ke halaman koleksi
  const handleGoToCollection = () => {
    setView("collection");
  };

  const openModal = () => setIsModalOpen(true);

  // Render konten berdasarkan state 'view'
  const renderContent = () => {
    if (view === "collection") {
      // Melewatkan fungsi onGoBack dan onNavigateToCollection
      return <BookCollection books={books} onAddNewBook={openModal} onGoBack={handleGoToLanding} />;
    }

    // Default view adalah 'landing'
    return (
      <div className="relative z-10 h-screen">
        <div className="absolute inset-0 bg-cover bg-center -z-10" style={{ backgroundImage: "url('/images/bg-nature.jpg')" }}>
          <div className="absolute inset-0 bg-black/10"></div>
        </div>
        <Navigation onNavigateToHome={handleGoToLanding} onNavigateToCollection={handleGoToCollection} />
        <main className="relative z-10 flex items-center justify-between px-6 py-12 max-w-7xl mx-auto">
          <HeroContent onNavigateToCollection={handleGoToCollection} />
          <AddBookCard onOpenModal={openModal} />
        </main>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white">
      {renderContent()}

      <AddBookModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onAddBook={handleAddBook} />
    </div>
  );
}
