export const Footer = () => {
    return (
        <footer className="bg-surface-container-lowest dark:bg-surface-container-lowest text-tertiary dark:text-tertiary font-label-bold text-label-bold w-full mt-xl rounded-t-xl flat no shadows flex flex-col md:flex-row justify-between items-center px-lg py-md gap-md z-10 relative">
            <div className="font-headline-sm text-headline-sm text-primary">
                IslamiQuiz
            </div>
            <div className="flex gap-md">
                <a className="text-on-surface-variant hover:text-primary transition-colors active:opacity-70" href="#">Privacy</a>
                <a className="text-on-surface-variant hover:text-primary transition-colors active:opacity-70" href="#">How to Play</a>
                <a className="text-on-surface-variant hover:text-primary transition-colors active:opacity-70" href="#">Contact</a>
            </div>
            <div className="text-on-surface-variant opacity-60 text-center md:text-right">
                © {new Date().getFullYear()} IslamiQuiz - Fun Learning for Everyone!
            </div>
        </footer>
    )
}
