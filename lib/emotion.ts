export function detectEmotion(text: string) {
  text = text.toLowerCase();

  if (text.includes("hai") || text.includes("halo")) return "greeting";
  if (text.includes("haha") || text.includes("wkwk")) return "funny";
  if (text.includes("cantik") || text.includes("imut")) return "shy";
  if (text.includes("anjing") || text.includes("bodoh")) return "angry";
  if (text.includes("wow")) return "shock";
  if (text.includes("tidur")) return "sleepy";

  return "idle";
}
