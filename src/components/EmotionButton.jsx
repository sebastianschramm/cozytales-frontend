import anxietyImg from "../assets/anxiety.png";
import sadnessImg from "../assets/sadness.png";
import angerImg from "../assets/anger.png";

const emotionImages = {
  anxiety: anxietyImg,
  sadness: sadnessImg,
  anger: angerImg,
};

const emotionTranslations = {
  en: {
    anxiety: "Anxiety",
    sadness: "Sadness",
    anger: "Anger",
  },
  es: {
    anxiety: "Ansiedad",
    sadness: "Tristeza",
    anger: "Ira",
  },
};

const EmotionButton = ({ emotion, onClick, language = "en", disabled, loading }) => {
  const img = emotionImages[emotion];
  const translatedEmotion = emotionTranslations[language][emotion];

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        relative w-40 h-40 rounded-[2.5rem] overflow-hidden shadow-md
        ${!disabled ? 'hover:scale-105 transition' : ''}
        ${disabled ? 'cursor-not-allowed opacity-70' : ''}
      `}
    >
      <img src={img} alt={translatedEmotion} className="w-full h-full object-cover" />

      {/* This is the main overlay that handles both loading and hover states */}
      <div className={`
        absolute inset-0 bg-black bg-opacity-50
        flex items-center justify-center p-2
        ${loading ? 'opacity-100' : 'opacity-0 hover:opacity-100 transition'}
      `}>
        {loading && ( // <--- Only render the breathing ring if loading
          <div
            className="absolute inset-0 m-auto rounded-full animate-breathe"
            // Start smaller, expand to cover the text. Adjust max-width/height as needed.
            // Using a large value for w/h with m-auto will center it.
            // The border will act as the ring.
            style={{
                width: '110px', // Base size, will scale up
                height: '110px', // Base size, will scale up
                border: '4px solid white', // White border for the ring
                boxShadow: '0 0 10px 5px rgba(255, 255, 255, 0.7)', // Subtle glow
            }}
          ></div>
        )}

        {/* Emotion Name - Always visible within the overlay */}
        <span className="text-white text-lg font-semibold text-center px-2 z-10"> {/* z-10 to ensure text is above the ring */}
          {translatedEmotion}
        </span>
      </div>
    </button>
  );
};

export default EmotionButton;