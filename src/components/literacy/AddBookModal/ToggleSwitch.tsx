import type { UploadMode } from "./AddBookModal";

interface ToggleSwitchProps {
  uploadMode: UploadMode;
  setUploadMode: (mode: UploadMode) => void;
}

// Komponen untuk switch antara mode AI dan Manual
const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ uploadMode, setUploadMode }) => {
  return (
    <div className="flex items-center justify-center mb-8 mt-2">
      <div className="relative bg-gray-100 rounded-full p-1 flex">
        <button onClick={() => setUploadMode("ai")} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors relative z-10 ${uploadMode === "ai" ? "text-white" : "text-gray-600"}`} style={{ cursor: "pointer" }}>
          Automatic AI ✨
        </button>
        <div className="w-px bg-gray-300 mx-1"></div>
        <button onClick={() => setUploadMode("manual")} className={`px-6 py-2 rounded-full text-sm font-medium transition-colors relative z-10 ${uploadMode === "manual" ? "text-white" : "text-gray-600"}`} style={{ cursor: "pointer" }}>
          Manual
        </button>
        {/* Latar belakang bergerak */}
        <div className={`absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out ${uploadMode === "ai" ? "left-1 right-2/5 bg-gradient-to-r from-green-500 to-blue-500" : "left-3/5 right-1 bg-green-700"}`} />
      </div>
    </div>
  );
};

export default ToggleSwitch;
