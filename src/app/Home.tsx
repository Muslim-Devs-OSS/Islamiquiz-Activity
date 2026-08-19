import React, { useEffect, useState } from 'react'
import { useDiscordSdk } from '../hooks/useDiscordSdk'
import { useGameContext, usePlayers } from '../hooks/usePlayers'
import type { TPlayerOptions } from '../entities/Player'
import { Navbar } from '../components/layout/Navbar'
import { Footer } from '../components/layout/Footer'
import { Hero } from '../components/home/Hero'
import { Sidebar } from '../components/home/Sidebar'

type ModeId = 'singleplayer' | 'party' | 'endless'

export default function IslamiQuizHome() {
    const { discordSdk } = useDiscordSdk()
    const { room } = useGameContext()
    const players = usePlayers() as TPlayerOptions[]

    const [, setChannelName] = useState<string | null>(null)
    const me = players.find((p) => p.sessionId === room?.sessionId)

    useEffect(() => {
        let cancelled = false
        fetch(`/api/channel-name?channelId=${discordSdk.channelId}`)
            .then((r) => (r.ok ? r.json() : null))
            .then((data) => {
                if (!cancelled && data?.name) setChannelName(data.name)
            })
            .catch(() => {})
        return () => {
            cancelled = true
        }
    }, [discordSdk.channelId])

    function selectMode(modeId: ModeId) {
        room?.send('setMode', { mode: modeId })
    }

    return (
        <div className="bg-background text-on-background h-screen w-screen overflow-hidden font-body-md flex flex-col">
            <Navbar />
            <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                <Hero onSelectMode={selectMode} />
                <Sidebar me={me} players={players} />
            </div>
        </div>
    )
}