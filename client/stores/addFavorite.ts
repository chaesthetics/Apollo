export const addFavorite = defineStore('favourite', {
	state: () => ({ favorites: [] }),
	actions: {
		add(rocketName: string) {
			let duplicate = 0
			this.favorites.forEach((element) => {
				if (rocketName === element) {
					duplicate++
				}
			})
			if (duplicate === 0) {
				this.favorites.push(rocketName)
			}
		},
		remove(rocketName: string) {
			this.favorites.splice(this.favorites.indexOf(rocketName), 1)
		},
	},
})
