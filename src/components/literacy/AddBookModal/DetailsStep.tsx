import { Plus } from "lucide-react";
import type { UploadMode } from "./AddBookModal";

interface DetailsStepProps {
  uploadMode: UploadMode;
  uploadedImage: string | null;
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formData: {
    title: string;
    author: string;
    genre: string;
    pages: number;
  };
  setFormData: {
    setTitle: (val: string) => void;
    setAuthor: (val: string) => void;
    setGenre: (val: string) => void;
    setPages: (val: number) => void;
  };
}

const DetailsStep: React.FC<DetailsStepProps> = ({ uploadMode, uploadedImage, handleFileUpload, formData, setFormData }) => {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-shrink-0 w-full md:w-64">
        {uploadedImage ? (
          <img src={uploadedImage} alt="Book cover" className="w-full h-auto md:w-64 md:h-80 object-cover rounded-lg shadow-lg mx-auto" />
        ) : (
          uploadMode === "manual" && (
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center h-80 flex flex-col justify-center">
              <p className="text-gray-600 mb-6 text-sm">Upload foto cover buku anda</p>
              <div className="flex flex-col items-center">
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload-manual" />
                <label htmlFor="file-upload-manual" className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center mb-4 hover:border-gray-600 cursor-pointer">
                  <Plus className="w-8 h-8 text-gray-600" />
                </label>
              </div>
            </div>
          )
        )}
      </div>

      <div className="flex-1 space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-2">Judul</label>
          <input type="text" value={formData.title} onChange={(e) => setFormData.setTitle(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Penulis</label>
          <input type="text" value={formData.author} onChange={(e) => setFormData.setAuthor(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Jenis</label>
          <input type="text" value={formData.genre} onChange={(e) => setFormData.setGenre(e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">Jumlah halaman</label>
          <input type="number" value={formData.pages} onChange={(e) => setFormData.setPages(Number(e.target.value))} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" />
        </div>
        <p className="text-sm text-gray-500 italic">*Edit jika tidak sesuai</p>
      </div>
    </div>
  );
};

export default DetailsStep;
