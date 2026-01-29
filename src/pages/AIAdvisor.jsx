import React, { useState, useRef, useEffect } from 'react';
import aiChatService from '../services/api/aiChatService';

const AIAdvisor = () => {
    const [messages, setMessages] = useState([
        { id: 1, type: 'bot', text: "Namaste! I am your AI Agriculture Advisor. You can ask me questions or upload a photo of your crop to check for diseases." }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [imageFile, setImageFile] = useState(null);
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim() && !imageFile) return;

        const newUserMsg = {
            id: Date.now(),
            type: 'user',
            text: input,
            image: imageFile ? URL.createObjectURL(imageFile) : null
        };

        setMessages(prev => [...prev, newUserMsg]);
        setInput('');
        setImageFile(null);
        setLoading(true);

        try {
            // If image is present, analyze it
            if (newUserMsg.image) {
                const analysis = await aiChatService.analyzeImage(imageFile);
                const botResponse = {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: `I've analyzed the image. \n\n**Diagnosis:** ${analysis.disease}\n**Confidence:** ${(analysis.confidence * 100).toFixed(1)}%\n\n**Recommended Treatment:**\n${analysis.treatment}`,
                    isAnalysis: true
                };
                setMessages(prev => [...prev, botResponse]);
            }
            // If only text
            else if (newUserMsg.text) {
                const response = await aiChatService.sendMessage(newUserMsg.text);
                const botResponse = {
                    id: Date.now() + 1,
                    type: 'bot',
                    text: response
                };
                setMessages(prev => [...prev, botResponse]);
            }
        } catch (error) {
            console.error("AI Error:", error);
            setMessages(prev => [...prev, { id: Date.now(), type: 'bot', text: "Sorry, I encountered an error providing advice. Please try again." }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
        }
    };

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col max-w-5xl mx-auto bg-white dark:bg-surface-dark-elevated rounded-2xl shadow-sm border border-slate-200 dark:border-border-dark overflow-hidden">
            {/* Header */}
            <div className="p-4 border-b border-slate-200 dark:border-border-dark bg-slate-50 dark:bg-surface-dark flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <span className="material-symbols-outlined text-2xl">smart_toy</span>
                </div>
                <div>
                    <h2 className="font-bold text-slate-800 dark:text-gray-200">AI Crop Doctor</h2>
                    <p className="text-xs text-green-600 font-medium flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        Online
                    </p>
                </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-[#121212]">
                {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] rounded-2xl p-4 shadow-sm ${msg.type === 'user'
                                ? 'bg-primary text-white rounded-br-none'
                                : 'bg-white dark:bg-surface-dark-elevated border border-slate-100 dark:border-border-dark text-slate-800 dark:text-gray-200 rounded-bl-none'
                            }`}>
                            {msg.image && (
                                <div className="mb-3 rounded-lg overflow-hidden border border-white/20">
                                    <img src={msg.image} alt="Upload" className="max-w-xs max-h-60 object-cover" />
                                </div>
                            )}
                            <div className="whitespace-pre-wrap text-sm leading-relaxed">
                                {msg.text}
                            </div>
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white dark:bg-surface-dark-elevated p-4 rounded-2xl rounded-bl-none border border-slate-100 dark:border-border-dark flex gap-1">
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-75"></span>
                            <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-150"></span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-surface-dark border-t border-slate-200 dark:border-border-dark">
                {imageFile && (
                    <div className="mb-2 flex items-center gap-2 bg-slate-100 dark:bg-white/5 p-2 rounded-lg w-fit">
                        <span className="material-symbols-outlined text-slate-500 text-sm">image</span>
                        <span className="text-xs text-slate-700 dark:text-gray-300 truncate max-w-[200px]">{imageFile.name}</span>
                        <button onClick={() => setImageFile(null)} className="text-slate-400 hover:text-red-500">
                            <span className="material-symbols-outlined text-sm">close</span>
                        </button>
                    </div>
                )}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="p-3 text-slate-500 hover:text-primary hover:bg-green-50 dark:hover:bg-primary/10 rounded-full transition-colors"
                        title="Upload Image"
                    >
                        <span className="material-symbols-outlined">add_a_photo</span>
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        className="hidden"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask about crops or upload a photo..."
                        className="flex-1 bg-slate-100 dark:bg-white/5 border-none rounded-xl px-4 py-3 text-slate-800 dark:text-white placeholder:text-slate-400 focus:ring-2 focus:ring-primary focus:outline-none"
                    />

                    <button
                        onClick={handleSend}
                        disabled={!input.trim() && !imageFile}
                        className="p-3 bg-primary text-white rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
                    >
                        <span className="material-symbols-outlined">send</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AIAdvisor;