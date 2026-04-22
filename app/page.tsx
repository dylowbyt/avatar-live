"use client";

import { useState, useEffect } from "react";
import { detectEmotion } from "@/lib/emotion";
import { getAvatar } from "@/lib/avatar";
import { speak } from "@/lib/tts";

export default function Page() {
  const [avatar, setAvatar] = useState("/avatar/diam.JPG");
  const [input, setInput] = useState("");
  const [chat, setChat] = useState<any[]>([]);

  // idle animation
  useEffect(() => {
    const interval = setInterval(() => {
      const idle = ["gabut.JPG", "berkedip.JPG"];
      setAvatar("/avatar/" + idle[Math.floor(Math.random()*idle.length)]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  async function send() {
    if (!input) return;

    setChat(c => [...c, { role: "user", text: input }]);

    const emotion = detectEmotion(input);
    setAvatar(getAvatar(emotion));

    // delay biar natural
    await new Promise(r => setTimeout(r, 800));

    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ text: input })
    });

    const data = await res.json();

    setChat(c => [...c, { role: "ai", text: data.reply }]);

    // talking animation
    let talking = true;
    const talkLoop = setInterval(() => {
      setAvatar(getAvatar("talk"));
    }, 300);

    speak(data.reply);

    setTimeout(() => {
      clearInterval(talkLoop);
      setAvatar("/avatar/diam.JPG");
    }, 3000);

    setInput("");
  }

  return (
    <div className="flex h-screen bg-black text-white">
      
      {/* AVATAR */}
      <div className="flex-1 flex items-center justify-center">
        <img
          src={avatar}
          className="max-h-[90%] transition-all duration-300 animate-pulse"
        />
      </div>

      {/* CHAT */}
      <div className="w-80 flex flex-col p-4">
        <div className="flex-1 overflow-y-auto">
          {chat.map((c, i) => (
            <div key={i} className="mb-2">
              <b>{c.role === "user" ? "Viewer" : "AI"}:</b> {c.text}
            </div>
          ))}
        </div>

        <div className="flex">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            className="flex-1 p-2 text-black"
          />
          <button onClick={send} className="bg-blue-500 px-4">
            Kirim
          </button>
        </div>
      </div>
    </div>
  );
}
