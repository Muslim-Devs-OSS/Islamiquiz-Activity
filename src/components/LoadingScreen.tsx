import { useEffect, useState } from 'react';
import { MdMosque, MdAutoAwesome, MdLightbulb } from 'react-icons/md';

export const LoadingScreen = () => {
    const [progress, setProgress] = useState(65);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev < 95) {
                    return prev + Math.random() * 5;
                }
                return prev;
            });
        }, 800);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="h-screen w-screen text-white flex flex-col font-body-md overflow-hidden relative" style={{
            backgroundColor: '#131313',
            backgroundImage: 'radial-gradient(#1a1a1a 1px, transparent 1px), radial-gradient(#1a1a1a 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px'
        }}>
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-[clamp(0.5rem,2vh,2rem)] relative z-10 overflow-y-auto">
                <div className="w-full max-w-lg flex flex-col items-center gap-[clamp(0.5rem,3vh,1.5rem)]">
                    {/* Central Loading Icon/Logo Area */}
                    <div className="relative flex items-center justify-center animate-[bounce_2s_infinite_ease-in-out]">
                        <div className="w-[clamp(64px,15vh,160px)] aspect-square bg-gradient-to-tr from-[#ff0033] via-[#ff8c00] to-[#ffd700] rounded-[clamp(1rem,3vh,2rem)] flex items-center justify-center shadow-lg">
                            <MdMosque className="text-[#131313] w-[50%] h-[50%]" />
                        </div>
                        {/* Sparkles */}
                        <div className="absolute -top-2 -right-2 text-[#ffd700] animate-pulse">
                            <MdAutoAwesome className="w-[clamp(16px,4vh,40px)] h-[clamp(16px,4vh,40px)]" />
                        </div>
                        <div className="absolute -bottom-1 -left-3 text-[#ff8c00] animate-pulse" style={{ animationDelay: '0.5s' }}>
                            <MdAutoAwesome className="w-[clamp(12px,3vh,32px)] h-[clamp(12px,3vh,32px)]" />
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="flex items-center gap-[clamp(0.25rem,1vh,0.5rem)] text-center">
                        <h1 className="font-display-lg text-[clamp(16px,4vh,36px)] font-bold text-[#ffd700] m-0">Loading...</h1>
                        <p className="font-body-md text-[clamp(12px,2vh,18px)] text-[#ff8c00] m-0 hidden md:block">Gathering questions from the scrolls</p>
                    </div>

                    {/* High-Energy Progress Bar */}
                    <div className="w-full bg-[#1a1a1a] rounded-full h-[clamp(0.5rem,2vh,1rem)] p-[clamp(2px,0.5vh,4px)] mt-1 shadow-inner">
                        <div 
                            className="h-full rounded-full bg-gradient-to-r from-[#ff0033] via-[#ff8c00] to-[#ffd700] relative overflow-hidden transition-all duration-1000 ease-out"
                            style={{ 
                                width: `${progress}%`,
                            }}
                        >
                            <div className="absolute inset-0" style={{
                                backgroundImage: 'linear-gradient(45deg, rgba(255, 255, 255, 0.15) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0.15) 75%, transparent 75%, transparent)',
                                backgroundSize: '20px 20px',
                                animation: 'progress-move 2s linear infinite'
                            }}></div>
                        </div>
                    </div>

                    {/* 'Did You Know?' Card */}
                    <div 
                        className="w-full bg-[#1a1a1a] rounded-lg p-[clamp(0.5rem,2vh,1.5rem)] mt-1 transition-transform duration-300"
                        style={{ boxShadow: '0 0 10px rgba(255, 140, 0, 0.1)' }}
                    >
                        <div className="flex items-center gap-[clamp(0.5rem,2vh,1rem)]">
                            <div className="w-[clamp(24px,5vh,48px)] aspect-square rounded-full bg-gradient-to-br from-[#ffd700] to-[#ff8c00] flex-shrink-0 flex items-center justify-center text-[#131313]">
                                <MdLightbulb className="w-[50%] h-[50%]" />
                            </div>
                            <div className="flex flex-col flex-1 overflow-hidden">
                                <span className="font-label-bold text-[clamp(9px,1.5vh,14px)] font-bold text-[#ff8c00] tracking-wider uppercase mb-0.5">
                                    Did You Know?
                                </span>
                                <p className="font-body-lg text-[clamp(11px,2vh,16px)] text-white m-0 truncate">
                                    Omar the developer is a really cool Italian
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
