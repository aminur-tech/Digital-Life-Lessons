import { Heart } from "lucide-react";
import React, { useEffect, useState } from "react";

const FavoriteButton = ({ initialSaved = false, onToggle }) => {
  const [saved, setSaved] = useState(initialSaved);

  // Sync with updated parent props (after refetch)
  useEffect(() => {
    setSaved(initialSaved);
  }, [initialSaved]);

  const toggleSave = () => {
    onToggle?.(); // call mutation
    setSaved(prev => !prev);
  };

  return (
    <button
      onClick={toggleSave}
      className="flex items-center gap-2 px-3 py-2 border border-base-300 rounded-lg 
             transition-all duration-300 active:scale-95
             bg-base-100 hover:bg-base-200 text-base-content"
    >
      <Heart
        className={`w-5 h-5 transition-colors ${saved
            ? "text-error fill-error"
            : "text-base-content/50"
          }`}
      />
      <span className="font-medium text-sm">
        {saved ? "Favorited" : "Favorite"}
      </span>
    </button>
  );
};

export default FavoriteButton;
