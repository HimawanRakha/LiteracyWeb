"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight, CircleDashed, Pointer } from "lucide-react";
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
  const [currentStep, setCurrentStep] = useState<ModalStep>("upload");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [pages, setPages] = useState<number | "">(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("");

  // Langkah 1: Gunakan Gemini untuk mendapatkan Judul & Penulis yang akurat dari gambar.
  const getCoverInfoWithGemini = async (base64ImageData: string) => {
    setLoadingMessage("Menganalisis sampul buku...");
    const apiKey = process.env.NEXT_PUBLIC_GOOGLE_BOOKS_API_KEY || "";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [
        {
          parts: [{ text: "Analisis gambar sampul buku ini. Ekstrak hanya judul dan penulisnya. Jawab dalam format JSON yang diminta." }, { inlineData: { mimeType: "image/jpeg", data: base64ImageData.split(",")[1] } }],
        },
      ],
      generationConfig: {
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            title: { type: "STRING" },
            author: { type: "STRING" },
          },
          required: ["title", "author"],
        },
      },
    };

    try {
      const response = await fetch(apiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      return JSON.parse(result.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error("Gagal saat analisis gambar dengan Gemini:", error);
      return null;
    }
  };

  // Langkah 2: Gunakan Google Books API untuk melengkapi data.
  const fetchFullBookDetails = async (title: string, author: string) => {
    setLoadingMessage("Melengkapi detail dari database...");
    let query = `intitle:${encodeURIComponent(title)}`;
    if (author) {
      query += `+inauthor:${encodeURIComponent(author)}`;
    }

    const url = `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=1`;
    console.log("Mencari di Google Books:", url);

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error("Gagal mengambil data dari Google Books");
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const bookInfo = data.items[0].volumeInfo;
        return {
          genre: bookInfo.categories ? bookInfo.categories[0] : "",
          pages: bookInfo.pageCount || 0,
        };
      }
    } catch (error) {
      console.error("Error saat mencari detail buku:", error);
    }
    return null;
  };

  const handleAiProcessing = async (image: string) => {
    setIsLoading(true);

    // Panggil Gemini untuk info dasar
    const coverInfo = await getCoverInfoWithGemini(image);

    if (coverInfo && coverInfo.title) {
      // Set judul dan penulis segera setelah didapat
      setTitle(coverInfo.title);
      setAuthor(coverInfo.author);

      // Panggil Google Books untuk melengkapi data
      const extraDetails = await fetchFullBookDetails(coverInfo.title, coverInfo.author);
      if (extraDetails) {
        setGenre(extraDetails.genre);
        setPages(extraDetails.pages);
      }
    } else {
      alert("AI tidak dapat menganalisis buku dari gambar ini. Pastikan gambar jelas atau coba isi secara manual.");
    }

    setIsLoading(false);
    setCurrentStep("details");
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setUploadedImage(imageUrl);

        if (uploadMode === "ai") handleAiProcessing(imageUrl);
        else setCurrentStep("details");
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
      pages: Number(pages) || 0,
      coverImage: uploadedImage,
    };
    onAddBook(newBook);
    handleCloseAndReset();
  };

  const handleCloseAndReset = () => {
    onClose();
    setTimeout(() => {
      if (uploadMode !== "ai") setUploadMode("ai");
      else {
        resetFormAndImageState();
        setCurrentStep("upload");
      }
    }, 300);
  };

  const resetFormAndImageState = () => {
    setUploadedImage(null);
    setTitle("");
    setAuthor("");
    setGenre("");
    setPages(0);
  };

  useEffect(() => {
    resetFormAndImageState();
    setCurrentStep(uploadMode === "ai" ? "upload" : "details");
  }, [uploadMode]);

  if (!isOpen) return null;

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[999]">
        <div className="bg-white rounded-2xl p-8 flex flex-col items-center gap-4">
          <CircleDashed className="w-12 h-12 animate-spin text-green-600" />
          <p className="text-gray-700 font-medium">{loadingMessage}</p>
        </div>
      </div>
    );
  }

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
            <Button className="bg-green-700 hover:bg-green-800 text-white px-6 py-2 rounded-full" disabled style={{ cursor: "pointer" }}>
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
