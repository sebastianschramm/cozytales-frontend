import { useState, useRef } from "react";
import StoryButton from "./components/StoryButton";
import EmotionButton from "./components/EmotionButton";
import FlagDropdown from "./components/FlagDropdown";
import storyPrompts from "./prompts";
import emotionPrompts from "./emotionPrompts";
import logo from "./assets/logo_characters_purple_bg_cropped.png";

function App() {
  const [country, setCountry] = useState({ code: "USA", language: "en" });
  // 'idle', 'story', 'anxiety', 'sadness', 'anger'
  // This state is the core of the button disabling logic.
  // It tracks what action is currently happening.
  const [currentAction, setCurrentAction] = useState('idle');
  const [errorMessage, setErrorMessage] = useState(null);
  const audioRef = useRef(null);

  const url = "<YOUR_BACKEND_API_URL>";

  // Function to handle showing error messages and resetting the state
  const showError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000); // Clear the error message after 5 seconds
    setCurrentAction('idle');
  };

  const handleEmotion = async (emotion) => {
    // If any action is already in progress, prevent new actions immediately.
    if (currentAction !== 'idle') return;

    setCurrentAction(emotion); // Set action to the specific emotion
    setErrorMessage(null); // Clear any old error messages

    // Pause and clear any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      const promptText = emotionPrompts[emotion][country.language] || emotionPrompts["anxiety"]["en"];
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: promptText,
          language: country.language,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch audio");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();

      // Reset to 'idle' when audio ends
      audio.onended = () => {
        setCurrentAction('idle');
        audioRef.current = null;
      };
    } catch (error) {
      console.error("Error playing emotion audio:", error);
      showError("Sorry, couldn't play the emotion audio.");
    }
  };


  const handleReadStory = async () => {
    console.log("handleReadStory called");
    // If any action is already in progress, prevent new actions immediately.
    if (currentAction !== 'idle') return;

    setCurrentAction('story'); // Set action to 'story'
    setErrorMessage(null); // Clear any old error messages

    // Pause and clear any existing audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }

    try {
      console.log("Fetching story prompt for language:", country.language);
      const promptText = storyPrompts[country.language] || storyPrompts["en"];
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: promptText,
          language: country.language,
        }),
      });
      console.log("Response status:", response.status);

      if (!response.ok) throw new Error("Failed to fetch audio");

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);

      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play();

      // Reset to 'idle' when audio ends
      audio.onended = () => {
        setCurrentAction('idle');
        audioRef.current = null;
      };
    } catch (error) {
      console.error("Error playing story:", error);
      showError("Sorry, couldn't play the story.");
    }
  };

  return (
    <div className="h-screen bg-purple-100 flex flex-col font-sans">
      {/* Fixed Top Banner */}
      <div className="bg-purple-200 shadow-md z-10 py-3 flex items-center justify-center relative h-20 flex-shrink-0">
        
        {/* Flag Dropdown on the left with max-width 100px */}
        <div className="absolute left-4 sm:left-8 max-w-[100px]">
          <FlagDropdown country={country} setCountry={setCountry} />
        </div>

        {/* Logo centered */}
        <img src={logo} alt="Logo" className="h-16 object-contain rounded-[1.0rem] mx-auto shadow-[0_6px_20px_rgba(0,0,0,0.3)]" />
      </div>

      {/* Main Content - Scrollable content area */}
      <div className="flex-1 overflow-y-auto">
        <div className="flex justify-center items-center py-8 min-h-full">
          <div className="max-w-sm mx-auto w-full flex flex-col items-center gap-8 px-4">
            
            {/* Story Button Card */}
            <div className="bg-[#fad465]/70 rounded-2xl shadow-lg p-6 w-full">
              <div className="flex justify-center">
                <StoryButton
                  language={country.language}
                  onClick={handleReadStory}
                  // Disable the button if any action is in progress (not 'idle')
                  disabled={currentAction !== 'idle'} 
                  loading={currentAction === 'story'} // Show spinner if the 'story' action is active
                />
              </div>
            </div>

            {/* Emotions Cards - One button per card */}
            <div className="w-full flex flex-col gap-4">

              <div className="bg-[#d6e483]/70 rounded-2xl shadow-lg p-6 w-full">
                <div className="flex justify-center">
                  <EmotionButton
                    emotion="anxiety"
                    language={country.language}
                    onClick={() => handleEmotion("anxiety")}
                    // Disable the button if any action is in progress (not 'idle')
                    disabled={currentAction !== 'idle'} 
                    loading={currentAction === 'anxiety'} // Show spinner if this specific emotion is active
                  />
                </div>
              </div>

              <div className="bg-[#7892dd]/70 rounded-2xl shadow-lg p-6 w-full">
                <div className="flex justify-center">
                  <EmotionButton
                    emotion="sadness"
                    language={country.language}
                    onClick={() => handleEmotion("sadness")}
                    disabled={currentAction !== 'idle'}
                    loading={currentAction === 'sadness'}
                  />
                </div>
              </div>

              <div className="bg-[#f94a3f]/70 rounded-2xl shadow-lg p-6 w-full">
                <div className="flex justify-center">
                  <EmotionButton
                    emotion="anger"
                    language={country.language}
                    onClick={() => handleEmotion("anger")}
                    disabled={currentAction !== 'idle'}
                    loading={currentAction === 'anger'}
                  />
                </div>
              </div>
            </div>

            {/* Error Message Box */}
            {errorMessage && (
              <div className="fixed bottom-4 left-1/2 -translate-x-1/2 p-4 rounded-lg shadow-xl text-white bg-red-500 z-50 transition-all duration-300">
                <p>{errorMessage}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
