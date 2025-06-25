import { Plus } from "lucide-react";

interface UploadStepProps {
  handleFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Komponen untuk langkah upload file di mode AI
const UploadStep: React.FC<UploadStepProps> = ({ handleFileUpload }) => {
  return (
    <div>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
        <p className="text-gray-600 mb-6 text-sm">Upload foto cover buku anda</p>
        <div className="flex flex-col items-center">
          <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" id="file-upload" />
          <label htmlFor="file-upload" className="w-16 h-16 border-2 border-gray-400 rounded-full flex items-center justify-center mb-4 hover:border-gray-600 transition-colors cursor-pointer">
            <Plus className="w-8 h-8 text-gray-600" />
          </label>
        </div>
      </div>
    </div>
  );
};

export default UploadStep;
