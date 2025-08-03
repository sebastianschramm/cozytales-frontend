import readStoryImg from "../assets/story_without_text.png";

// New, local translation object for the Story button text
const storyButtonTranslations = {
  en: "Story",
  es: "Historia",
  // Add more languages as needed
  // fr: "Histoire",
};

const StoryButton = ({ onClick, disabled, loading, language = "en" }) => {
  // Get translated "Story" text
  const storyButtonText = storyButtonTranslations[language] || storyButtonTranslations["en"];

  return (
    <div className="relative">
      <button
        onClick={onClick}
        disabled={disabled}
        className={`
          relative w-40 h-40 sm:w-48 sm:h-48 rounded-[3rem] overflow-hidden shadow-lg
          ${!disabled ? 'hover:scale-105 transition active:scale-95' : 'cursor-not-allowed opacity-70'}
        `}
      >
        <img src={readStoryImg} alt="Read a story" className="w-full h-full object-cover" />

        <div className={`
          absolute inset-0 bg-black bg-opacity-50
          flex items-center justify-center p-2
          ${loading ? 'opacity-100' : 'opacity-0 hover:opacity-100 transition'}
          ${disabled && !loading ? 'opacity-0' : ''}
        `}>
          {loading && (
            <div
              className="absolute inset-0 m-auto rounded-full animate-breathe"
              style={{
                  width: '110px', // Adjust as needed
                  height: '110px', // Adjust as needed
                  border: '4px solid white',
                  boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.7)',
              }}
            ></div>
          )}

          <span className="text-white text-lg sm:text-xl font-semibold text-center px-2 z-10">
            {storyButtonText} {/* <--- Use the language-dependent text */}
          </span>
        </div>
      </button>
    </div>
  );
};

export default StoryButton;