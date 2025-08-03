const LoadingWheel = ({ size = 24, color = "text-purple-600" }) => {
  return (
    <div className={`inline-block ${color}`}>
      <svg 
        className="animate-spin" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24" 
        fill="none"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="60"
          strokeDashoffset="40"
          opacity="0.3"
        />
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="15"
          strokeDashoffset="0"
        />
      </svg>
    </div>
  );
};

const MinimalLoadingOverlay = ({ loading }) => {
  if (!loading) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <LoadingWheel size={65} color="text-gray-500" />
    </div>
  );
};

export default MinimalLoadingOverlay;
