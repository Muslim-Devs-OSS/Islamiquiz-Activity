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
            <main className="flex-grow flex flex-col items-center justify-center px-4 py-1 relative z-10 overflow-y-auto">
                <div className="w-full max-w-lg flex flex-col items-center gap-2 md:gap-3">
                    {/* Central Loading Icon/Logo Area */}
                    <div className="relative flex items-center justify-center animate-[bounce_2s_infinite_ease-in-out]">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-[#ff0033] via-[#ff8c00] to-[#ffd700] rounded-[1rem] flex items-center justify-center shadow-lg">
                            <MdMosque className="text-[#131313] w-[32px] h-[32px] md:w-[40px] md:h-[40px]" />
                        </div>
                        {/* Sparkles */}
                        <div className="absolute -top-2 -right-2 text-[#ffd700] animate-pulse">
                            <MdAutoAwesome className="w-4 h-4 md:w-6 md:h-6" />
                        </div>
                        <div className="absolute -bottom-1 -left-3 text-[#ff8c00] animate-pulse" style={{ animationDelay: '0.5s' }}>
                            <MdAutoAwesome className="w-3 h-3 md:w-5 md:h-5" />
                        </div>
                    </div>

                    {/* Loading Text */}
                    <div className="flex items-center gap-2 text-center">
                        <h1 className="font-display-lg text-lg md:text-xl font-bold text-[#ffd700] m-0">Loading...</h1>
                        <p className="font-body-md text-xs md:text-sm text-[#ff8c00] m-0 hidden md:block">Gathering questions from the scrolls</p>
                    </div>

                    {/* High-Energy Progress Bar */}
                    <div className="w-full bg-[#1a1a1a] rounded-full h-3 p-0.5 mt-1 shadow-inner">
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
                        className="w-full bg-[#1a1a1a] rounded-lg p-2 md:p-3 mt-1 transition-transform duration-300"
                        style={{ boxShadow: '0 0 10px rgba(255, 140, 0, 0.1)' }}
                    >
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-gradient-to-br from-[#ffd700] to-[#ff8c00] flex-shrink-0 flex items-center justify-center text-[#131313]">
                                <MdLightbulb className="w-3 h-3 md:w-4 md:h-4" />
                            </div>
                            <div className="flex flex-col flex-1 overflow-hidden">
                                <span className="font-label-bold text-[9px] md:text-[10px] font-bold text-[#ff8c00] tracking-wider uppercase mb-0.5">
                                    Did You Know?
                                </span>
                                <p className="font-body-lg text-[11px] md:text-xs text-white m-0 truncate">
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
