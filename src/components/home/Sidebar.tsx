import { MdPerson, MdMic, MdMicOff, MdPlayArrow } from 'react-icons/md'
import type { TPlayerOptions } from '../../entities/Player'

interface SidebarProps {
    me?: TPlayerOptions;
    players: TPlayerOptions[];
}

function initials(name?: string) {
    if (!name) return '—'
    return name.slice(0, 2).toUpperCase()
}

export const Sidebar = ({ me, players }: SidebarProps) => {
    return (
        <aside className="w-full md:w-72 bg-surface dark:bg-surface text-primary dark:text-primary font-body-md rounded-l-[1.5rem] md:rounded-l-[2rem] h-full bg-surface-container dark:bg-surface-container shadow-[-4px_0_0_0_rgba(0,0,0,0.2)] flex flex-col gap-4 p-4 z-20 shrink-0 overflow-y-auto">
            {/* User Profile Header */}
            <div className="flex items-center gap-3 bg-surface-bright p-3 rounded-xl shrink-0">
                <div className="relative">
                    {me?.avatarUri ? (
                        <img className="w-12 h-12 rounded-full border-[3px] border-tertiary object-cover" src={me.avatarUri} alt="Avatar" />
                    ) : (
                        <div className="w-12 h-12 rounded-full border-[3px] border-tertiary flex items-center justify-center bg-surface-container text-lg font-bold text-on-surface">
                            {initials(me?.name)}
                        </div>
                    )}
                    <div className="absolute -bottom-2 -right-2 bg-secondary-container text-on-secondary-container font-label-bold text-[10px] px-2 py-0.5 rounded-full shadow-sm border border-background">
                        Lvl 42
                    </div>
                </div>
                <div>
                    <h2 className="font-headline-sm text-[16px] text-on-surface leading-tight m-0">
                        Salam, {me?.name || 'Explorer'}!
                    </h2>
                    <p className="font-label-bold text-[12px] text-on-surface-variant m-0">Seeker Rank</p>
                </div>
            </div>

            <div className="flex-1 flex flex-col gap-2 overflow-y-auto">
                <h3 className="font-label-bold text-[12px] text-outline-variant uppercase tracking-widest pl-2 m-0 shrink-0">
                    Users
                </h3>
                {players.map((p) => {
                    const isIdle = !p.mode || p.mode === '';
                    const inParty = p.mode === 'party';
                    const modeText = inParty ? 'In Party' : (isIdle ? 'Idle' : `Playing ${p.mode}`);
                    
                    return (
                        <div key={p.sessionId} className="flex items-center gap-2 p-2 rounded-lg bg-surface hover:bg-surface-bright transition-colors cursor-pointer group shrink-0">
                            <div className="relative shrink-0">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center overflow-hidden ${inParty ? 'bg-tertiary-container' : (isIdle ? 'bg-surface-container-high' : 'bg-primary-container')}`}>
                                    {p.avatarUri ? (
                                        <img src={p.avatarUri} alt="" className="w-full h-full object-cover" />
                                    ) : (
                                        <MdPerson className={`w-4 h-4 ${inParty ? 'text-on-tertiary-container' : (isIdle ? 'text-on-surface-variant' : 'text-on-primary-container')}`} />
                                    )}
                                </div>
                                <div className={`absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border border-surface flex items-center justify-center ${inParty ? 'bg-secondary-container' : (isIdle ? 'bg-outline' : 'bg-primary-container')}`}>
                                    {inParty ? (
                                        <MdMic className="text-on-secondary-container w-[10px] h-[10px]" />
                                    ) : (isIdle ? (
                                        <MdMicOff className="text-surface w-[10px] h-[10px]" />
                                    ) : (
                                        <MdPlayArrow className="text-on-primary-container w-[10px] h-[10px]" />
                                    ))}
                                </div>
                            </div>
                            <div className="flex-1 overflow-hidden">
                                <p className="font-body-md text-[13px] text-on-surface leading-snug m-0 truncate">
                                    <span className={`font-bold ${inParty ? 'text-tertiary' : (isIdle ? 'text-on-surface-variant' : 'text-primary')}`}>{p.name}</span>
                                </p>
                                <p className={`font-label-bold text-[9px] ${inParty ? 'text-secondary-fixed' : 'text-outline'} capitalize m-0 truncate`}>{modeText}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
            
            {/* CTA */}
            <button
                className="mt-auto w-full bg-tertiary text-on-tertiary font-headline-sm text-[16px] py-2 rounded-full bouncy-shadow-secondary active-press hover-lift transition-all border-b-[3px] border-on-tertiary-fixed flex justify-center items-center gap-2 text-on-secondary-fixed shrink-0"
                style={{
                    background: 'linear-gradient(to right, rgb(255, 140, 0), rgb(255, 215, 0))',
                    boxShadow: 'rgba(255, 140, 0, 0.6) 0px 0px 10px, rgb(128, 102, 0) 0px 4px 0px 0px',
                    borderWidth: 'medium',
                    borderStyle: 'none',
                    borderColor: 'currentcolor',
                    borderImage: 'none'
                }}
            >
                Create Party
            </button>
        </aside>
    )
}
