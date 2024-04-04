<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'
import { useSort } from '~/composables/useSort'
import { useFilter } from '~/composables/useFilter'

const { sortLaunches } = useSort()
const { filterLaunchesByYear } = useFilter()

const query = gql`
	query Launches {
		launches {
			mission_name
			launch_date_local
			launch_site {
				site_name
			}
			rocket {
				rocket_name
			}
			details
		}
	}
`

const { data } = useAsyncQuery({
	query,
})

const launches = computed(() => data.value?.launches ?? [])
const dateForm = reactive({ year: '' })
const items = ['ascending', 'descending']
const selectedOrder = ref('ascending')

const displayedLaunches = computed(() => {
	let launchesToDisplay = launches.value

	if (dateForm.year) {
		launchesToDisplay = filterLaunchesByYear(dateForm.year, launchesToDisplay)
	}

	return sortLaunches(launchesToDisplay, selectedOrder.value)
})

const handleChangeOrder = (newOrder: string) => {
	selectedOrder.value = newOrder
}

const headers = [
	{
		title: 'Mission Name',
		align: 'start',
		value: 'mission_name',
		class: 'truncate',
		width: '20%',
		sortable: true,
	},
	{ title: 'Launch Date', value: 'launch_date_local', class: 'truncate', width: '20%', sortable: true },
	{ title: 'Launch Site', value: 'launch_site.site_name', class: 'truncate', width: '10%', sortable: true },
	{ title: 'Rocket Name', value: 'rocket.rocket_name', class: 'truncate', width: '20%', sortable: true },
	{ title: 'Details', value: 'details', class: 'truncate', width: '30%', sortable: true },
]
</script>

<template>
	<v-container>
		<h5>Apollo / Home</h5>
		<h3 class="my-5">
			There are {{ displayedLaunches.length }} launches.
			<v-chip color="blue">SimpleTable</v-chip>
			<v-chip color="orange">Data from SpaceX GraphQL</v-chip>
		</h3>
		<div class="d-flex w-25">
			<v-select v-model="selectedOrder" :items="items" label="Order" @change="handleChangeOrder" />
			<v-text-field
				v-model="dateForm.year"
				label="Search Year"
				class="ml-3"
				append-inner-icon="mdi-magnify"
			/>
		</div>
		<v-data-table :headers="headers" :items="displayedLaunches" :items-per-page="5" class="elevation-1" />
	</v-container>
</template>

<style>
.truncate {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
