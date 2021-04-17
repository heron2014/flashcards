const getUserScore = (correct: number, incorrect: number) => {
  const total = correct + incorrect;
  const score = Math.round((correct / total) * 100);
  const info = {
    primary: '',
    secondary: '',
    icon: '',
    score: `${score}%`,
  };
  if (score < 69) {
    info.secondary = 'Not too bad!';
    info.primary = 'You just need a bit more practice!';
    info.icon = 'sad';
  } else if (score <= 85) {
    info.secondary = 'Great score!';
    info.primary = 'Keep up the good work!';
    info.icon = 'meh';
  } else if (score > 85) {
    info.secondary = 'Excellent score!';
    info.primary = 'You are a FlashMaster!';
    info.icon = 'happy';
  }
  return info;
};

export default getUserScore;
