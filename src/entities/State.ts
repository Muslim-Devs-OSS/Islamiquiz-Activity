import { Schema, MapSchema, type } from '@colyseus/schema'
import { TPlayerOptions, Player } from './Player.js'

export type TGamePhase = 'lobby' | 'playing'

export interface IState {
	roomName: string
	channelId: string
}

export class State extends Schema {
	@type({ map: Player })
	players = new MapSchema<Player>()

	@type('string')
	public roomName: string

	@type('string')
	public channelId: string

	@type('string')
	public phase: TGamePhase = 'lobby'

	constructor(attributes: IState) {
		super()
		this.roomName = attributes.roomName
		this.channelId = attributes.channelId
	}

	private _getPlayer(sessionId: string): Player | undefined {
		return Array.from(this.players.values()).find((p) => p.sessionId === sessionId)
	}

	createPlayer(sessionId: string, playerOptions: TPlayerOptions) {
		const existing = this._getPlayer(sessionId)
		if (existing == null) {
			this.players.set(playerOptions.userId, new Player({ ...playerOptions, sessionId }))
		}
	}

	removePlayer(sessionId: string) {
		const player = this._getPlayer(sessionId)
		if (player != null) this.players.delete(player.userId)
	}

	startTalking(sessionId: string) {
		const player = this._getPlayer(sessionId)
		if (player != null) player.talking = true
	}

	stopTalking(sessionId: string) {
		const player = this._getPlayer(sessionId)
		if (player != null) player.talking = false
	}

	startGame() {
		this.phase = 'playing'
	}

	returnToLobby() {
		this.phase = 'lobby'
	}

	setPlayerMode(sessionId: string, mode: string) {
   	const player = this._getPlayer(sessionId)

		if (player != null) {
      // '' clears it — call this again with '' when a match/lobby ends
      player.mode = mode
    }
  }
}