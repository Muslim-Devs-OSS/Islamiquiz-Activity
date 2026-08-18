import React, { useEffect, useMemo, useState } from 'react'
import { Moon, Users, Infinity as InfinityIcon, Settings, X, Volume2, Gauge, Languages, Hash, ChevronRight, Sparkles } from 'lucide-react'
import { useDiscordSdk } from '../hooks/useDiscordSdk'
import { useGameContext, usePlayers } from '../hooks/usePlayers'
import type { TPlayerOptions } from '../entities/Player'

/*
  Wiring notes (Robo.js + Colyseus + Discord Embedded App SDK)
  -------------------------------------------------------------
  1. GUILD CONTEXT
     discordSdk.guildId is null in a DM/GDM activity instance and set inside
     a server, so it's the right guard for showing Party/Endless at all.

  2. LIVE PRESENCE (blue avatar stacks)
     Comes straight from Colyseus now — see the three diffs alongside this
     file (Player.ts, State.ts, StateHandlerRoom.ts). They add a synced
     `mode` string field to the Player schema (`''` = idling) and a
     `setMode` message so any client can flip it. usePlayers() already
     gives you the live, synced array — this component just groups it by
     mode client-side, no polling needed.

  3. MULTI-CHANNEL
     Discord launches a separate activity instance per voice channel
     automatically, so this "just works" across channels as long as your
     Colyseus room is scoped per channel (join the room with
     `channelId: discordSdk.channelId` as a join option / room filter, the
     same way the official multiplayer-video template keys its
     useSyncState calls on discordSdk.channelId) — otherwise every channel
     running the activity shares one lobby's player list.
     Restricting *which* channels are allowed to launch it at all is a
     Developer Portal > Activities > URL Mapping setting, not app code.

  4. CHANNEL NAME
     The client SDK only exposes discordSdk.channelId, not the channel's
     name — resolving that needs your bot token server-side. This
     component calls GET /api/channel-name (a Robo file route you'd add
     under src/api) and falls back to showing the raw id if that route
     isn't there yet.

  5. SETTINGS
     Gear icon opens a placeholder drawer — hook each row up to wherever
     you persist prefs (Flashcore, your own DB, etc).
*/

type ModeId = 'singleplayer' | 'party' | 'endless'

const MODES: Array<{
  id: ModeId
  label: string
  labelAr: string
  icon: typeof Moon
  blurb: string
  alwaysVisible: boolean
}> = [
  { id: 'singleplayer', label: 'Singleplayer', labelAr: 'فردي', icon: Moon, blurb: 'Answer solo, race the clock.', alwaysVisible: true },
  { id: 'party', label: 'Party', labelAr: 'جماعي', icon: Users, blurb: 'Everyone in the channel plays live.', alwaysVisible: false },
  { id: 'endless', label: 'Endless', labelAr: 'بلا نهاية', icon: InfinityIcon, blurb: 'No finish line, just streaks.', alwaysVisible: false },
]

function initials(name: string) {
  return name.slice(0, 2).toUpperCase()
}

function AvatarStack({ people, max = 3 }: { people: TPlayerOptions[]; max?: number }) {
  if (!people || people.length === 0) return null
  const shown = people.slice(0, max)
  const overflow = people.length - shown.length
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex' }}>
        {shown.map((p, i) => (
          <div
            key={p.sessionId}
            title={p.name}
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: '#3B4CC0',
              border: '2px solid #150B08',
              color: '#EAF0FF',
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: i === 0 ? 0 : -8,
              boxShadow: '0 0 0 1px rgba(108,140,255,0.35)',
              overflow: 'hidden',
            }}
          >
            {p.avatarUri ? (
              <img src={p.avatarUri} alt="" width={26} height={26} style={{ objectFit: 'cover' }} />
            ) : (
              initials(p.name)
            )}
          </div>
        ))}
        {overflow > 0 && (
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: '50%',
              background: '#1D1410',
              border: '2px solid #150B08',
              color: '#C9A24B',
              fontFamily: "'Inter', sans-serif",
              fontSize: 10,
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginLeft: -8,
            }}
          >
            +{overflow}
          </div>
        )}
      </div>
      <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 11, color: '#8C7C5E' }}>playing now</span>
    </div>
  )
}

function StarPlate({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        position: 'relative',
        height: 108,
        borderRadius: 10,
        background: 'linear-gradient(180deg, #170F0B 0%, #120B08 100%)',
        border: '1px solid rgba(201,162,75,0.16)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <svg viewBox="0 0 200 200" width="150%" height="150%" style={{ position: 'absolute', opacity: 0.1 }}>
        <g transform="translate(100,100)" stroke="#C9A24B" strokeWidth={1} fill="none">
          <polygon points="0,-70 14,-14 70,0 14,14 0,70 -14,14 -70,0 -14,-14" />
          <polygon points="0,-70 14,-14 70,0 14,14 0,70 -14,14 -70,0 -14,-14" transform="rotate(22.5)" />
        </g>
      </svg>
      {children}
    </div>
  )
}

function LanternIcon({ flip = false }: { flip?: boolean }) {
  return (
    <svg width="26" height="46" viewBox="0 0 26 46" fill="none" style={{ transform: flip ? 'scaleX(-1)' : 'none' }}>
      <line x1="13" y1="0" x2="13" y2="8" stroke="#C9A24B" strokeWidth={1.5} strokeDasharray="2 2" />
      <rect x="3" y="8" width="20" height="4" rx="1" fill="#C9A24B" />
      <path d="M6 12 L20 12 L18 34 L8 34 Z" fill="#241611" stroke="#C9A24B" strokeWidth={1.2} />
      <line x1="9" y1="14" x2="8" y2="32" stroke="#EAC873" strokeWidth={1} opacity={0.7} />
      <line x1="13" y1="14" x2="13" y2="32" stroke="#EAC873" strokeWidth={1} opacity={0.7} />
      <line x1="17" y1="14" x2="18" y2="32" stroke="#EAC873" strokeWidth={1} opacity={0.7} />
      <rect x="3" y="34" width="20" height="4" rx="1" fill="#C9A24B" />
      <polygon points="13,38 17,44 9,44" fill="#C9A24B" />
    </svg>
  )
}

export default function IslamiQuizHome() {
  const { discordSdk, session } = useDiscordSdk()
  const { room } = useGameContext()
  const players = usePlayers() as TPlayerOptions[]

  const [settingsOpen, setSettingsOpen] = useState(false)
  const [channelName, setChannelName] = useState<string | null>(null)

  const inGuild = Boolean(discordSdk.guildId)
  const me = players.find((p) => p.sessionId === room?.sessionId)
  const myMode = (me?.mode ?? '') as ModeId | ''

  const visibleModes = useMemo(() => MODES.filter((m) => m.alwaysVisible || inGuild), [inGuild])

  const presenceByMode = useMemo(() => {
    const map: Record<ModeId, TPlayerOptions[]> = { singleplayer: [], party: [], endless: [] }
    for (const p of players) {
      if (p.mode === 'singleplayer' || p.mode === 'party' || p.mode === 'endless') {
        map[p.mode].push(p)
      }
    }
    return map
  }, [players])

  useEffect(() => {
    // Optional: add a GET /api/channel-name route (src/api/channel-name.ts) that
    // resolves discordSdk.channelId to a display name via your bot token.
    // Falls back to the raw id if the route doesn't exist yet.
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
    <div
      style={{
        minHeight: '100vh',
        background: 'radial-gradient(1200px 500px at 50% -10%, rgba(107,18,32,0.35), transparent), #0B0705',
        fontFamily: "'Inter', sans-serif",
        color: '#F3E7CC',
        display: 'flex',
        flexDirection: 'column',
        padding: '22px 26px 18px',
        position: 'relative',
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700&family=Amiri:wght@400;700&family=Inter:wght@400;500;600&display=swap');
        * { box-sizing: border-box; }
        .iq-card { transition: transform 160ms ease, border-color 160ms ease, box-shadow 160ms ease; cursor: pointer; }
        .iq-card:hover { transform: translateY(-3px); border-color: rgba(201,162,75,0.55); box-shadow: 0 10px 28px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,162,75,0.25); }
        .iq-card:hover .iq-plate-glow { opacity: 1; }
        .iq-play-btn { transition: gap 160ms ease, color 160ms ease; }
        .iq-card:hover .iq-play-btn { gap: 8px; color: #EAC873; }
        .iq-gear:hover { transform: rotate(35deg); }
        .iq-gear { transition: transform 220ms ease; }
      `}</style>

      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', marginBottom: 30 }}>
        <button
          onClick={() => setSettingsOpen(true)}
          aria-label="Open settings"
          className="iq-gear"
          style={{
            position: 'absolute',
            left: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(201,162,75,0.08)',
            border: '1px solid rgba(201,162,75,0.25)',
            borderRadius: 8,
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#C9A24B',
          }}
        >
          <Settings size={17} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <LanternIcon />
          <h1
            style={{
              margin: 0,
              fontFamily: "'Cinzel', serif",
              fontWeight: 700,
              fontSize: 34,
              letterSpacing: '0.04em',
              background: 'linear-gradient(180deg, #F3D68A 0%, #C9A24B 55%, #8C6D2A 100%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textShadow: '0 2px 18px rgba(201,162,75,0.25)',
            }}
          >
            IslamiQuiz
          </h1>
          <LanternIcon flip />
        </div>
      </div>

      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(201,162,75,0.35), transparent)', marginBottom: 34 }} />

      {/* mode grid */}
      <div
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: visibleModes.length === 1 ? 'minmax(280px, 420px)' : `repeat(${visibleModes.length}, minmax(0, 1fr))`,
          justifyContent: 'center',
          gap: 22,
          alignContent: 'start',
        }}
      >
        {visibleModes.map((mode) => {
          const Icon = mode.icon
          const modePlayers = presenceByMode[mode.id]
          const isSelected = myMode === mode.id
          return (
            <div
              key={mode.id}
              className="iq-card"
              onClick={() => selectMode(mode.id)}
              style={{
                background: 'linear-gradient(180deg, #1B110C 0%, #130C09 100%)',
                border: isSelected ? '1px solid #C9A24B' : '1px solid rgba(201,162,75,0.18)',
                borderRadius: 14,
                padding: 16,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <StarPlate>
                <div
                  className="iq-plate-glow"
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(60px 60px at 50% 50%, rgba(107,18,32,0.4), transparent)',
                    opacity: 0.5,
                    transition: 'opacity 200ms ease',
                  }}
                />
                <Icon size={34} color="#EAC873" strokeWidth={1.6} style={{ position: 'relative' }} />
              </StarPlate>

              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: "'Amiri', serif", fontWeight: 700, fontSize: 20, color: '#F3E7CC' }}>{mode.label}</span>
                  <span style={{ fontFamily: "'Amiri', serif", fontSize: 15, color: '#8C7C5E' }}>{mode.labelAr}</span>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 12.5, color: '#9A8B6E', lineHeight: 1.4 }}>{mode.blurb}</p>
              </div>

              <div style={{ minHeight: 22 }}>
                <AvatarStack people={modePlayers} />
              </div>

              <div
                className="iq-play-btn"
                style={{
                  marginTop: 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  borderTop: '1px solid rgba(201,162,75,0.14)',
                  paddingTop: 10,
                  color: '#C9A24B',
                  fontSize: 13,
                  fontWeight: 600,
                }}
              >
                {isSelected ? 'In this mode' : 'Play'}
                <ChevronRight size={15} />
              </div>
            </div>
          )
        })}
      </div>

      {/* footer status bar */}
      <div style={{ marginTop: 28, paddingTop: 14, borderTop: '1px solid rgba(201,162,75,0.14)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: '50%',
              background: '#3B4CC0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#EAF0FF',
              fontSize: 11,
              fontWeight: 600,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {me?.avatarUri ? <img src={me.avatarUri} alt="" width={30} height={30} style={{ objectFit: 'cover' }} /> : me ? initials(me.name) : '—'}
            <span style={{ position: 'absolute', bottom: -1, right: -1, width: 9, height: 9, borderRadius: '50%', background: myMode ? '#4CD97B' : '#8C7C5E', border: '2px solid #0B0705' }} />
          </div>
          <div>
            <div style={{ fontSize: 12.5, fontWeight: 500, color: '#F3E7CC' }}>{myMode ? MODES.find((m) => m.id === myMode)?.label : 'Idling'}</div>
            <div style={{ fontSize: 11, color: '#6C5E45' }}>{myMode ? 'In a mode' : 'Not in a mode yet'}</div>
          </div>
        </div>

        {inGuild && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11.5, color: '#8C7C5E', border: '1px solid rgba(201,162,75,0.16)', borderRadius: 20, padding: '5px 10px' }}>
            <Hash size={12} />
            {channelName ?? discordSdk.channelId}
          </div>
        )}
      </div>

      {/* settings drawer */}
      {settingsOpen && (
        <div onClick={() => setSettingsOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', display: 'flex', justifyContent: 'flex-end', zIndex: 20 }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 300, height: '100%', background: '#140D0A', borderLeft: '1px solid rgba(201,162,75,0.25)', padding: 22, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontFamily: "'Cinzel', serif", fontSize: 17, color: '#EAC873', letterSpacing: '0.03em' }}>Settings</span>
              <button onClick={() => setSettingsOpen(false)} aria-label="Close settings" style={{ background: 'none', border: 'none', color: '#8C7C5E', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <SettingRow icon={Volume2} label="Sound" hint="Effects & voice lines" />
            <SettingRow icon={Gauge} label="Difficulty" hint="Question pool used" />
            <SettingRow icon={Languages} label="Language" hint="Question text & audio" />
            <SettingRow icon={Sparkles} label="Reciter style" hint="For audio question modes" />

            <p style={{ marginTop: 'auto', fontSize: 11, color: '#5A4C36', lineHeight: 1.5 }}>
              Wire these to Flashcore (Robo's built-in DB) or your own prefs store — this panel is scaffolding.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

function SettingRow({ icon: Icon, label, hint }: { icon: typeof Volume2; label: string; hint: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 0', borderBottom: '1px solid rgba(201,162,75,0.1)' }}>
      <div style={{ width: 32, height: 32, borderRadius: 8, background: 'rgba(201,162,75,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#C9A24B', flexShrink: 0 }}>
        <Icon size={15} />
      </div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: '#F3E7CC' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#6C5E45' }}>{hint}</div>
      </div>
      <ChevronRight size={14} color="#6C5E45" />
    </div>
  )
}