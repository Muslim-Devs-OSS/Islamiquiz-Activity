import { MdHome, MdBolt, MdAutoStories, MdLeaderboard, MdSettings } from 'react-icons/md'

export const Navbar = () => {
    return (
        <nav className="bg-background dark:bg-background text-primary dark:text-primary font-headline-sm text-headline-sm w-full py-2 bg-surface-container-low dark:bg-surface-container-low shadow-[0_4px_0_0_rgba(0,0,0,0.3)] dark:shadow-[0_4px_0_0_rgba(0,0,0,0.5)] flex justify-between items-center px-4 md:px-6 z-50 shrink-0">
            <div className="font-display-lg text-[24px] md:text-[32px] text-secondary dark:text-secondary-fixed hover:scale-110 transition-transform duration-200 active:translate-y-1 active:shadow-none cursor-pointer">
                IslamiQuiz
            </div>
            <div className="hidden md:flex gap-md items-center">
                <button className="text-primary font-bold scale-110 hover:scale-110 transition-transform duration-200 active:translate-y-1 active:shadow-none flex items-center gap-2">
                    <MdHome className="w-6 h-6" />
                    Home
                </button>
                <button className="text-on-background opacity-80 hover:scale-110 transition-transform duration-200 active:translate-y-1 active:shadow-none flex items-center gap-2">
                    <MdBolt className="w-6 h-6" />
                    Daily Challenge
                </button>
                <button className="text-on-background opacity-80 hover:scale-110 transition-transform duration-200 active:translate-y-1 active:shadow-none flex items-center gap-2">
                    <MdAutoStories className="w-6 h-6" />
                    Learn
                </button>
            </div>
            <div className="flex gap-sm items-center">
                <button className="w-10 h-10 flex items-center justify-center text-on-background opacity-80 hover:scale-110 transition-transform duration-200 active:translate-y-1 active:shadow-none rounded-full bg-surface-container-high">
                    <MdLeaderboard className="w-6 h-6" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center text-on-background opacity-80 hover:scale-110 transition-transform duration-200 active:translate-y-1 active:shadow-none rounded-full bg-surface-container-high">
                    <MdSettings className="w-6 h-6" />
                </button>
            </div>
        </nav>
    )
}
