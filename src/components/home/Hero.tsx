import { useState } from 'react'
import { MdGroups, MdDiversity3, MdPerson, MdLocalFireDepartment, MdInfoOutline } from 'react-icons/md'

interface HeroProps {
    onSelectMode: (modeId: 'singleplayer' | 'party' | 'endless') => void;
}

export const Hero = ({ onSelectMode }: HeroProps) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <main className="flex-1 p-4 md:p-6 flex flex-col gap-4 overflow-y-auto h-full">
            {/* Game Modes (Scattered Grid) */}
            <section
                className="bg-tertiary-container rounded-[2rem] p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden bouncy-shadow-primary transform animate-float flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #FF0000 0%, #FF8C00 100%)' }}
            >
                <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-secondary-container rounded-full opacity-50 mix-blend-screen blur-xl"></div>
                <div className="absolute bottom-[-40px] right-10 w-32 h-32 bg-primary-container rounded-full opacity-40 mix-blend-screen blur-2xl"></div>
                <div className="flex-1 z-10 flex flex-col gap-3 items-start">
                    <div className="inline-block px-3 py-1 bg-secondary-fixed text-on-secondary-fixed font-label-bold text-[12px] rounded-full mb-1 shadow-sm">
                        ✨ Most Exciting Mode!
                    </div>
                    <div className="flex items-center gap-2">
                        <h1 className="font-display-lg text-[32px] md:text-[40px] text-on-tertiary-container leading-tight drop-shadow-md m-0">
                            Play with VC
                        </h1>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors text-on-tertiary-container opacity-80"
                            title="Toggle Info"
                        >
                            <MdInfoOutline className="w-6 h-6" />
                        </button>
                    </div>
                    {showInfo && (
                        <p className="font-body-md text-[14px] md:text-[16px] text-tertiary-fixed max-w-md m-0 line-clamp-2 md:line-clamp-none">
                            Team up with friends in a Discord Voice Channel for high-speed Islamic trivia! Test your collective knowledge and climb the ranks together.
                        </p>
                    )}
                    <button
                        onClick={() => onSelectMode('party')}
                        className="mt-2 bg-secondary-fixed text-on-secondary-fixed font-headline-sm text-[16px] px-6 py-2 rounded-full bouncy-shadow-secondary active-press hover-lift transition-all flex items-center gap-2 group"
                    >
                        <MdGroups className="group-hover:rotate-12 transition-transform w-5 h-5" />
                        START VC MATCH
                    </button>
                </div>
                <div className="flex-1 w-full flex justify-center z-10 relative mt-4 md:mt-0">
                    <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-secondary-fixed bg-surface-container overflow-hidden flex items-center justify-center animate-float-delay shadow-[0_0_20px_rgba(255,223,51,0.3)]">
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container to-background flex items-center justify-center">
                            <MdDiversity3 className="text-secondary-fixed drop-shadow-lg w-[70px] h-[70px] md:w-[90px] md:h-[90px]" />
                        </div>
                    </div>
                </div>
            </section>
            
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-shrink-0">
                <div
                    onClick={() => onSelectMode('singleplayer')}
                    className="bg-surface-container rounded-xl p-4 flex flex-col items-center text-center gap-2 bouncy-shadow-surface hover-lift transition-all cursor-pointer active-press group"
                >
                    <div className="w-14 h-14 bg-primary-container rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MdPerson className="text-on-primary-container w-7 h-7" />
                    </div>
                    <h3 className="font-headline-sm text-[18px] text-on-surface m-0">Solo Campaign</h3>
                    {showInfo && (
                        <p className="font-body-md text-[12px] text-on-surface-variant m-0">
                            Journey through history at your own pace.
                        </p>
                    )}
                </div>
                <div
                    onClick={() => onSelectMode('endless')}
                    className="bg-surface-container rounded-xl p-4 flex flex-col items-center text-center gap-2 bouncy-shadow-surface hover-lift transition-all cursor-pointer active-press group"
                >
                    <div className="w-14 h-14 bg-error-container rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MdLocalFireDepartment className="text-on-error-container w-7 h-7" />
                    </div>
                    <h3 className="font-headline-sm text-[18px] text-on-surface m-0">Endless Survival</h3>
                    {showInfo && (
                        <p className="font-body-md text-[12px] text-on-surface-variant m-0">
                            How long can you last against the ticking clock?
                        </p>
                    )}
                </div>
            </section>
        </main>
    )
}
