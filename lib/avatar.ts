const map: any = {
  idle: ["diam.JPG", "gabut.JPG", "berkedip.JPG"],
  greeting: ["menyapa.JPG", "menyapa-2.JPG"],
  funny: ["ketawa-2.JPG", "ngakak.JPG"],
  shy: ["malu.JPG", "senyum.JPG"],
  angry: ["cemberut.JPG", "ngambek.JPG"],
  shock: ["kaget.JPG"],
  sleepy: ["ngantuk.JPG"],
  talk: ["bicara.JPG", "berkedip.JPG"]
};

export function getAvatar(emotion: string) {
  const arr = map[emotion] || map.idle;
  return "/avatar/" + arr[Math.floor(Math.random() * arr.length)];
}
