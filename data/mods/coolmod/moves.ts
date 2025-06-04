export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	dreameater: {
		inherit: true,
		onTryImmunity(target) {
			return target.status === 'slp' || target.hasAbility('comatose') || this.field.isTerrain('mistyterrain');
		}
	},
	hex: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose') || this.field.isTerrain('mistyterrain')) {
				this.debug('BP doubled from status condition');
				return move.basePower * 2;
			}
			return move.basePower;
		},
	},
	infernalparade: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			if (target.status || target.hasAbility('comatose') || this.field.isTerrain('mistyterrain')) return move.basePower * 2;
			return move.basePower;
		},
	},
	lightning: {
		num: 1003,
		accuracy: 100,
		basePower: 80,
		category: "Special",
		name: "Lightning",
		pp: 10,
		priority: 0,
		flags: { contact: 1, protect: 1, mirror: 1 },
		overrideOffensiveStat: 'spe',
		secondary: null,
		target: "normal",
		type: "Electric",
	},
	nightmare: {
		inherit: true,
		condition: {
			onStart(pokemon) {
				if(pokemon.status == 'slp' || pokemon.hasAbility('comatose') || this.field.isTerrain('mistyterrain')) {
					this.add('-start', pokemon, 'Nightmare');
				} else {
					return false;
				}
			},
		},
	},
	poisonpass: {
		num: 1002,
		accuracy: 90,
		basePower: 60,
		category: "Physical",
		name: "Poison Pass",
		pp: 10,
		priority: -6,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1, noassist: 1, failcopycat: 1 },
		forceSwitch: true,
		secondary: {
			chance: 25,
			status: 'psn',
		},
		target: "normal",
		type: "Poison",
		contestType: "Tough",
	},
	rollout: {
		inherit: true,
		basePowerCallback(pokemon, target, move) {
			let bp = move.basePower;
			const rolloutData = pokemon.volatiles['rollout'];
			if (rolloutData?.hitCount) {
				bp *= 2 ** rolloutData.contactHitCount;
			}
			if (rolloutData && pokemon.status !== 'slp') {
				rolloutData.hitCount++;
				rolloutData.contactHitCount++;
			}
			if (pokemon.volatiles['defensecurl']) {
				bp *= 2;
			}
			this.debug(`BP: ${bp}`);
			return bp;
		},
		condition: {
			duration: 6,
		},
	},
	sleeptalk: {
		inherit: true,
		onTry(source) {
			return source.status === 'slp' || source.hasAbility('comatose') || this.field.isTerrain('mistyterrain');
		},
	},
	snore: {
		inherit: true,
		onTry(source) {
			return source.status === 'slp' || source.hasAbility('comatose') || this.field.isTerrain('mistyterrain');
		},
	},
	stealthrock: {
		inherit: true,
		condition: {
			// this is a side condition
			onSideStart(side) {
				this.add('-sidestart', side, 'move: Stealth Rock');
			},
			onSwitchIn(pokemon) {
				if (pokemon.hasType('Rock')) {
					this.add('-sideend', pokemon.side, 'move: Stealth Rock', `[of] ${pokemon}`);
					pokemon.side.removeSideCondition('stealthrock');
				} else if (pokemon.hasItem('heavydutyboots')) return;
				const typeMod = this.clampIntRange(pokemon.runEffectiveness(this.dex.getActiveMove('stealthrock')), -6, 6);
				this.damage(pokemon.maxhp * (2 ** typeMod) / 8);
			},
		},
	},
	wakeout: {
		num: 1001,
		accuracy: 100,
		basePower: 40,
		category: "Physical",
		name: "Wake Out",
		pp: 10,
		priority: 3,
		flags: { contact: 1, protect: 1, mirror: 1, metronome: 1 },
		onTryHit(target) {
			if (target.status === 'slp' || source.hasAbility('comatose')) return false;

			// insomnia and vital spirit checks are separate so that the message is accurate in multi-ability mods
			if (target.hasAbility('insomnia')) {
				this.add('-fail', source, '[from] ability: Insomnia', `[of] ${source}`);
				return null;
			}
			if (target.hasAbility('vitalspirit')) {
				this.add('-fail', source, '[from] ability: Vital Spirit', `[of] ${source}`);
				return null;
			}
		},
		onHit(target, source, move) {
			const result = target.setStatus('slp', source, move);
			if (!result) return result;
			target.statusState.time = 2;
			target.statusState.startTime = 2;
		},
		target: "normal",
		type: "Normal",
		contestType: "Cool",
	},
}


