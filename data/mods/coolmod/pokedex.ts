export const Pokedex: import('../../../sim/dex-species').ModdedSpeciesDataTable = {
	pikachu: {
		inherit: true,
		baseStats: { hp: 50, atk: 70, def: 50, spa: 110, spd: 70, spe: 125 },
		abilities: { 0: "Static", 1: "Arc Flash" },
	},
	raichu: {
		inherit: true,
		baseStats: { hp: 80, atk: 80, def: 55, spa: 90, spd: 80, spe: 100 },
		abilities: { 0: "Static", 1: "Lightning Rod", H: "Arc Flash" },
	},
	poliwrath: {
		inherit: true,
		abilities: { 0: "Water Absorb", 1: "Dizzy Belly", H: "Swift Swim" },
	},
	machamp: {
		inherit: true,
		abilities: { 0: "Guts", 1: "Forearms", H: "Steadfast" },
	},
	hypno: {
		inherit: true,
		abilities: { 0: "Insomnia", 1: "Very Sleepy", H: "Inner Focus" },
	},
	pinsir: {
		inherit: true,
		abilities: { 0: "Adaptability", 1: "Mold Breaker", H: "Moxie" },
	},
	sceptile: {
		inherit: true,
		abilities: { 0: "Overgrow", H: "Serene Grace" },
	},
	beautifly: {
		inherit: true,
		types: ["Bug", "Fairy"],
		abilities: { 0: "Swarm", H: "Prankster" },
	},
	dustox: {
		inherit: true,
		types: ["Bug", "Ghost"],
		abilities: { 0: "Shield Dust", H: "Shadow Tag" },
		baseStats: { hp: 35, atk: 100, def: 35, spa: 35, spd: 35, spe: 10 },
	},
	hariyama: {
		inherit: true,
		abilities: { 0: "Thick Fat", 1: "Fluffy", H: "Sheer Force" },
	},
	aggron: {
		inherit: true,
		baseStats: { hp: 80, atk: 120, def: 180, spa: 60, spd: 60, spe: 50 },
		abilities: { 0: "Multiscale", 1: "Rock Head", H: "Heavy Metal" },
	},
	medicham: {
		inherit: true,
		baseStats: { hp: 60, atk: 90, def: 75, spa: 90, spd: 75, spe: 80 },
		abilities: { 0: "Pure Power", H: "Speed Boost" },
	},
	wailord: {
		baseStats: { hp: 190, atk: 40, def: 75, spa: 40, spd: 75, spe: 60 },
		abilities: { 0: "Water Veil", 1: "Torrent", H: "Pressure" },
	},
}
