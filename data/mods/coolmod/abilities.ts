export const Abilities: import('../../../sim/dex-abilities').ModdedAbilityDataTable = {
	arcflash: {
		onModifyMove(move) {
			if (!move.ignoreImmunity) move.ignoreImmunity = {};
			if (move.ignoreImmunity !== true) {
				move.ignoreImmunity['Ground'] = true;
			}
		},
		flags: {},
		name: "Arc Flash",
		rating: 3,
		num: 1008,
	},
	baddreams: {
		onResidualOrder: 28,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			if (!pokemon.hp) return;
			for (const target of pokemon.foes()) {
				if (target.status === 'slp' || target.hasAbility('comatose') || this.field.isTerrain('mistyterrain')) {
					this.damage(target.baseMaxhp / 8, target, pokemon);
				}
			}
		},
		flags: {},
		name: "Bad Dreams",
		rating: 1.5,
		num: 123,
	},
	dizzybelly: {
		onHit(target) {
			const r = this.random(100);
			if (r < 25) {
				target.addVolatile('confusion');
			}
		},
		name: "Dizzy Belly",
		rating: 3.5,
		num: 209,
	},
	forearms: {
		onBasePowerPriority: 24,
		onBasePower(basePower, attacker, defender, move) {
			if (move.flags['punch']) {
				this.debug('Forearms power penalty');
				return this.chainModify(0.5);
			}
		},
		onModifyMove(move) {
			if (move.flags['punch']) {
				move.multihit = [2, 5];
			}
		},
		flags: {},
		name: "Forearms",
		rating: 3.5,
		num: 1001,
	},
	shadowtag: {
		onFoeTrapPokemon(pokemon) {
			if (!pokemon.hasAbility('shadowtag') && pokemon.isAdjacent(this.effectState.target)) {
				pokemon.tryTrap(true);
			}
		},
		onFoeMaybeTrapPokemon(pokemon, source) {
			if (!source) source = this.effectState.target;
			if (!source || !pokemon.isAdjacent(source)) return;
			if (source.isShadowTagged && !pokemon.hasAbility('shadowtag')) {
				pokemon.maybeTrapped = true;
			}
		},
		condition: {
			duration: 6,
			onResidualOrder: 24,
			onResidualSubOrder: 2,
			onStart(target) {
				this.isShadowTagged = true;
			},
			onResidual(pokemon) {
				if (!pokemon.activeTurns) {
					this.effectState.duration! += 1;
				}
			},
			onEnd(target) {
				this.isShadowTagged = false;
			},
		},
		flags: {},
		name: "Shadow Tag",
		rating: 5,
		num: 23,
	},
	verysleepy: {
		onResidualOrder: 20,
		onResidualSubOrder: 2,
		onResidual(pokemon) {
			for (const target of pokemon.foes()) {
				const r = this.random(100);
				if (r < 25) {
					source.setStatus('slp', target);
					target.statusState.time = 2;
					target.statusState.startTime = 2;
				}
			}
		},
		flags: {},
		name: "Very Sleepy",
		rating: 2,
		num: 1006,
	},
}
