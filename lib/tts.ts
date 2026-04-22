export function speak(text: string) {
  const u = new SpeechSynthesisUtterance(text);
  u.lang = "id-ID";
  u.rate = 1;
  u.pitch = 1.2;

  speechSynthesis.speak(u);
}
