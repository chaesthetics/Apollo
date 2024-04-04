interface Launch {
	launch_date_local: string
}

export function useFilter() {
	const filterLaunchesByYear = (year: string, launches: Launch[]): Launch[] => {
		if (!year) return launches
		return launches.filter((launch) => {
			const launchYear = new Date(launch.launch_date_local).getFullYear().toString()
			return launchYear === year
		})
	}
	return { filterLaunchesByYear }
}
