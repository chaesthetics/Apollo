interface Launch {
	launch_date_local: string
}

type SortOrder = 'ascending' | 'descending'

export function useSort() {
	const sortLaunches = (launches: Launch[], order: SortOrder): Launch[] => {
		return launches.slice().sort((a: Launch, b: Launch) => {
			const dateA = new Date(a.launch_date_local)
			const dateB = new Date(b.launch_date_local)
			return order === 'ascending'
				? dateA.getTime() - dateB.getTime()
				: dateB.getTime() - dateA.getTime()
		})
	}

	return { sortLaunches }
}
