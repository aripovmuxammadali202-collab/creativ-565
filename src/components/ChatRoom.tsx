import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Send, Users, ShieldAlert, Sparkles, MessageSquare } from 'lucide-react';
import { ChatMessage, UserProfile } from '../types';
import { MOCK_CHATS } from '../data/books';

interface ChatRoomProps {
  profile: UserProfile;
}

export default function ChatRoom({ profile }: ChatRoomProps) {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('najot_chat_messages');
    return saved ? JSON.parse(saved) : MOCK_CHATS;
  });
  const [typedMsg, setTypedMsg] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('najot_chat_messages', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMsg.trim()) return;

    const myMessage: ChatMessage = {
      id: 'msg-' + Date.now(),
      senderName: profile.fullName,
      senderRole: profile.role === 'admin' ? 'admin' : 'student',
      senderAvatar: profile.avatar,
      message: typedMsg.trim(),
      time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };

    setMessages((prev) => [...prev, myMessage]);
    setTypedMsg('');

    // Trigger dynamic simulation replies in Uzbek language to make the app alive!
    setTimeout(() => {
      const answers = [
        "Juda ajoyib fikr! Men ham xozir o'sha bo'limni ko'rayotgan edim.",
        "To'g'ri, bilim eng katta sarmoyadir! Najot Ta'lim darsliklari juda tushunarli tartiblangan.",
        "Bu yerda xotira o'yini o'ynab ko'rdingizmi? Haqiqiy miya jangi ekan, balansizni osongina oshiradi!",
        "Muhammadali Oripov va Temurbek Adhamov asos solgan ushbu kitoblar sayti juda qulay va ko'rkam chiqibdi. Haqiqiy IT dizayni!",
        "Darslar va audio-kitoblar bo'yicha kimda qanday savollar bor? Mentorlarimiz ham shu yerda javob berishadi.",
        "Tashakkur! Bu sayt darslarimizda ham juda katta asqotmoqda."
      ];
      const botName = ["Dilshod IT", "Shahnoza Malik", "Javohir_Backend", "Gulnoza_UX/UI"][Math.floor(Math.random() * 4)];
      const botAvatar = ["💻", "👩‍🎨", "🛡️", "🌟"][Math.floor(Math.random() * 4)];
      
      const simulatedReply: ChatMessage = {
        id: 'reply-' + Date.now(),
        senderName: botName,
        senderRole: 'student',
        senderAvatar: botAvatar,
        message: answers[Math.floor(Math.random() * answers.length)],
        time: new Date().toLocaleTimeString('uz-UZ', { hour: '2-digit', minute: '2-digit' }),
        isMe: false
      };

      setMessages((prev) => [...prev, simulatedReply]);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto my-6 bg-zinc-950 border border-zinc-900 rounded-3xl overflow-hidden" id="chat-panel">
      {/* Header */}
      <div className="p-4 bg-zinc-900/60 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-2 bg-emerald-950/40 rounded-xl text-emerald-400 border border-emerald-500/10">
            <MessageSquare className="w-5 h-5" />
          </span>
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
              Najot Chat-Xonasi <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </h3>
            <p className="text-[10px] text-zinc-500">Talaba va mentorlar o'zaro tajriba almashadigan muloqot guruhi</p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-zinc-400 bg-zinc-950 border border-zinc-800 px-3 py-1.5 rounded-xl font-mono">
          <Users className="w-3.5 h-3.5 text-emerald-400" /> ONLAYN: {messages.length + 4}
        </div>
      </div>

      {/* Message box */}
      <div className="h-[380px] p-4 overflow-y-auto space-y-4 bg-zinc-950/40 scrollbar-thin scrollbar-thumb-zinc-800 scrollbar-track-transparent">
        {messages.map((m) => {
          const isSenderAdmin = m.senderRole === 'admin';
          const isSenderMentor = m.senderRole === 'mentor';
          
          return (
            <div
              key={m.id}
              className={`flex items-start gap-2.5 ${m.isMe ? 'flex-row-reverse' : ''}`}
            >
              <div className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 font-bold flex items-center justify-center shrink-0">
                {m.senderAvatar}
              </div>

              <div className={`max-w-[70%] space-y-1 ${m.isMe ? 'text-right' : 'text-left'}`}>
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 justify-start">
                  <span>{m.senderName}</span>
                  {isSenderAdmin && (
                    <span className="px-1 bg-red-950 text-red-400 text-[8px] border border-red-500/20 font-sans rounded">Asoschi Admin</span>
                  )}
                  {isSenderMentor && (
                    <span className="px-1 bg-amber-950 text-amber-400 text-[8px] border border-amber-500/20 font-sans rounded">Mentor</span>
                  )}
                  <span className="text-[9px] text-zinc-600 font-normal">{m.time}</span>
                </div>

                <div
                  className={`p-3 rounded-2xl text-xs font-medium leading-relaxed ${
                    m.isMe
                      ? 'bg-emerald-500 text-zinc-950 rounded-tr-none font-semibold'
                      : 'bg-zinc-900 border border-zinc-800 text-zinc-200 rounded-tl-none'
                  }`}
                >
                  {m.message}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input container */}
      <form onSubmit={handleSendMessage} className="p-3 bg-zinc-900/60 border-t border-zinc-800 flex gap-2">
        <input
          type="text"
          value={typedMsg}
          onChange={(e) => setTypedMsg(e.target.value)}
          placeholder="Muloqot qilish yoki savollar berish uchun yozing..."
          className="flex-1 py-2 px-4 bg-zinc-950 border border-zinc-800 focus:outline-none focus:border-emerald-500 text-xs text-white placeholder-zinc-600 rounded-xl"
        />
        <button
          type="submit"
          className="p-2.5 cursor-pointer bg-emerald-500 hover:bg-emerald-400 text-zinc-950 rounded-xl transition-all shadow-[0_0_8px_rgba(16,185,129,0.2)]"
        >
          <Send className="w-4 h-4 text-zinc-950" />
        </button>
      </form>
    </div>
  );
}
