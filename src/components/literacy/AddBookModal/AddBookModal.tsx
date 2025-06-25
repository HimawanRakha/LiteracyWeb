"use client";

import { useState, useEffect } from "react";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ToggleSwitch from "@/components/literacy/AddBookModal/ToggleSwitch";
import UploadStep from "@/components/literacy/AddBookModal/UploadStep";
import DetailsStep from "@/components/literacy/AddBookModal/DetailsStep";
import type { Book } from "@/index";

interface AddBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddBook: (book: Book) => void;
}

export type UploadMode = "ai" | "manual";
export type ModalStep = "upload" | "details";

const AddBookModal: React.FC<AddBookModalProps> = ({ isOpen, onClose, onAddBook }) => {
  const [uploadMode, setUploadMode] = useState<UploadMode>("ai");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<ModalStep>("upload");

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState(0);

  // Fungsi untuk mereset semua state form
  const resetFormAndImageState = () => {
    setUploadedImage(null);
    setTitle("");
    setAuthor("");
    setGenre("");
    setPages(0);
  };

  // Effect ini berjalan setiap kali `uploadMode` berubah (saat toggle diklik)
  // Ini memastikan state direset dan tampilan (step) diatur dengan benar
  useEffect(() => {
    resetFormAndImageState(); // Reset semua input dan gambar
    if (uploadMode === "ai") {
      setCurrentStep("upload"); // Mode AI dimulai dari langkah upload
    } else {
      setCurrentStep("details"); // Mode Manual langsung ke langkah detail
    }
  }, [uploadMode]);

  // Fungsi untuk menutup modal dan meresetnya ke kondisi awal
  const handleCloseAndReset = () => {
    onClose();
    // Beri sedikit jeda agar tidak ada kedipan visual saat modal tertutup
    setTimeout(() => {
      // Mengembalikan mode ke 'ai' akan secara otomatis memicu useEffect di atas
      // untuk mereset semua state lainnya ke kondisi awal.
      if (uploadMode !== "ai") {
        setUploadMode("ai");
      } else {
        // Jika sudah di mode 'ai', reset secara manual
        resetFormAndImageState();
        setCurrentStep("upload");
      }
    }, 300);
  };

  if (!isOpen) return null;

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setCurrentStep("details");
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please select a valid image file.");
    }
  };

  const handleFinish = () => {
    if (!uploadedImage || !title || !author) {
      alert("Judul, Penulis, dan Gambar sampul wajib diisi.");
      return;
    }
    const newBook: Book = {
      id: crypto.randomUUID(),
      title,
      author,
      genre,
      pages,
      coverImage: uploadedImage,
    };
    onAddBook(newBook);
    handleCloseAndReset(); // Tutup dan reset modal setelah selesai
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-3xl p-6 relative">
        <button onClick={handleCloseAndReset} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700" style={{ cursor: "pointer" }}>
          <X className="w-5 h-5" />
        </button>

        <ToggleSwitch uploadMode={uploadMode} setUploadMode={setUploadMode} />

        {currentStep === "upload" ? (
          <UploadStep handleFileUpload={handleFileUpload} />
        ) : (
          <DetailsStep uploadMode={uploadMode} uploadedImage={uploadedImage} handleFileUpload={handleFileUpload} formData={{ title, author, genre, pages }} setFormData={{ setTitle, setAuthor, setGenre, setPages }} />
        )}

        <div className="flex justify-end pt-4 mt-4 border-t">
          {currentStep === "upload" ? (
            <Button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-md" disabled={!uploadedImage} onClick={() => setCurrentStep("details")}>
              Next <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          ) : (
            <Button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-full" disabled={!uploadedImage || !title || !author} onClick={handleFinish} style={{ cursor: "pointer" }}>
              Finish
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddBookModal;
