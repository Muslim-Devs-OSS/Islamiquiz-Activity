import { usePlayers, useGamePhase } from '../hooks/usePlayers'
import { Player } from '../components/Player'
import Homepage from './Home'

export const Activity = () => {
	const players = usePlayers()
	const phase = useGamePhase()

	if (phase === 'lobby'){
		return <Homepage/>
	}

	return (
		<div className="voice__channel__container">
			{players.map((p) => (
				<Player key={p.userId} {...p} />
			))}
		</div>
	)
}
