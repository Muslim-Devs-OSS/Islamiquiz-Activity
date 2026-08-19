import { useState } from 'react'
import { MdGroups, MdDiversity3, MdPerson, MdLocalFireDepartment, MdInfoOutline } from 'react-icons/md'

interface HeroProps {
    onSelectMode: (modeId: 'singleplayer' | 'party' | 'endless') => void;
}

export const Hero = ({ onSelectMode }: HeroProps) => {
    const [showInfo, setShowInfo] = useState(false);

    return (
        <main className="flex-1 p-2 md:p-4 flex flex-col gap-2 md:gap-3 overflow-hidden h-full min-h-0">
            {/* Game Modes (Scattered Grid) */}
            <section
                className="flex-[1.5] min-h-[130px] bg-tertiary-container rounded-[1.5rem] md:rounded-[2rem] p-3 md:p-5 flex flex-col md:flex-row items-center justify-between gap-2 md:gap-6 relative overflow-hidden bouncy-shadow-primary transform animate-float"
                style={{ background: 'linear-gradient(135deg, #FF0000 0%, #FF8C00 100%)' }}
            >
                <div className="absolute top-[-20px] left-[-20px] w-24 h-24 bg-secondary-container rounded-full opacity-50 mix-blend-screen blur-xl pointer-events-none"></div>
                <div className="absolute bottom-[-40px] right-10 w-32 h-32 bg-primary-container rounded-full opacity-40 mix-blend-screen blur-2xl pointer-events-none"></div>
                
                {/* Left Side: Content */}
                <div className="flex-1 z-10 flex flex-col gap-1.5 md:gap-2 items-start justify-center h-full w-full">
                    <div className="inline-block px-2 py-0.5 bg-secondary-fixed text-on-secondary-fixed font-label-bold text-[10px] md:text-[12px] rounded-full mb-0.5 shadow-sm flex-shrink-0">
                        ✨ Most Exciting Mode!
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        <h1 className="font-display-lg text-[22px] md:text-[32px] lg:text-[40px] text-on-tertiary-container leading-tight drop-shadow-md m-0 truncate">
                            Play with VC
                        </h1>
                        <button 
                            onClick={(e) => { e.stopPropagation(); setShowInfo(!showInfo); }}
                            className="p-1 rounded-full hover:bg-white/20 transition-colors text-on-tertiary-container opacity-80"
                            title="Toggle Info"
                        >
                            <MdInfoOutline className="w-5 h-5 md:w-6 md:h-6" />
                        </button>
                    </div>
                    {showInfo && (
                        <p className="font-body-md text-[12px] md:text-[14px] text-tertiary-fixed max-w-md m-0 leading-snug">
                            Team up with friends in a Discord Voice Channel for high-speed Islamic trivia! Test your collective knowledge and climb the ranks together.
                        </p>
                    )}
                    <button
                        onClick={() => onSelectMode('party')}
                        className="mt-1 md:mt-2 bg-secondary-fixed text-on-secondary-fixed font-headline-sm text-[12px] md:text-[15px] px-4 py-1.5 md:px-6 md:py-2 rounded-full bouncy-shadow-secondary active-press hover-lift transition-all flex items-center gap-2 group flex-shrink-0"
                    >
                        <MdGroups className="group-hover:rotate-12 transition-transform w-4 h-4 md:w-5 md:h-5" />
                        START VC MATCH
                    </button>
                </div>

                {/* Right Side: Graphic */}
                <div className="flex-shrink-0 z-10 relative flex justify-center items-center h-full w-auto">
                    <div className="w-20 h-20 md:w-28 md:h-28 lg:w-40 lg:h-40 rounded-full border-2 md:border-4 border-secondary-fixed bg-surface-container overflow-hidden flex items-center justify-center animate-float-delay shadow-[0_0_20px_rgba(255,223,51,0.3)] flex-shrink-0">
                        <div className="w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-container to-background flex items-center justify-center">
                            <MdDiversity3 className="text-secondary-fixed drop-shadow-lg w-10 h-10 md:w-14 md:h-14 lg:w-20 lg:h-20" />
                        </div>
                    </div>
                </div>
            </section>
            
            {/* Bottom Cards */}
            {/* Bottom Cards */}
            <section className="flex-[1] min-h-[70px] grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3">
                <div
                    onClick={() => onSelectMode('singleplayer')}
                    className="bg-surface-container rounded-xl p-2 md:p-3 flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center gap-3 md:gap-2 bouncy-shadow-surface hover-lift transition-all cursor-pointer active-press group h-full"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-primary-container rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MdPerson className="text-on-primary-container w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex flex-col flex-1 justify-center">
                        <h3 className="font-headline-sm text-[14px] md:text-[16px] text-on-surface m-0 truncate">Solo Campaign</h3>
                        {showInfo && (
                            <p className="font-body-md text-[11px] md:text-[12px] text-on-surface-variant m-0 mt-0.5">
                                Journey through history at your own pace.
                            </p>
                        )}
                    </div>
                </div>
                <div
                    onClick={() => onSelectMode('endless')}
                    className="bg-surface-container rounded-xl p-2 md:p-3 flex flex-row md:flex-col items-center justify-start md:justify-center text-left md:text-center gap-3 md:gap-2 bouncy-shadow-surface hover-lift transition-all cursor-pointer active-press group h-full"
                >
                    <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 bg-error-container rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <MdLocalFireDepartment className="text-on-error-container w-5 h-5 md:w-6 md:h-6" />
                    </div>
                    <div className="flex flex-col flex-1 justify-center">
                        <h3 className="font-headline-sm text-[14px] md:text-[16px] text-on-surface m-0 truncate">Endless Survival</h3>
                        {showInfo && (
                            <p className="font-body-md text-[11px] md:text-[12px] text-on-surface-variant m-0 mt-0.5">
                                How long can you last against the ticking clock?
                            </p>
                        )}
                    </div>
                </div>
            </section>
        </main>
    )
}
