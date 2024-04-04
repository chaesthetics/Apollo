<template>
	<v-container>
		<h5>Apollo / Rocket</h5>
		<h3 class="my-5">
			{{ rocketInfo.length }} Rockets Information
			<v-chip color="blue">Carousel</v-chip>
		</h3>
		<div v-if="!isMounted">
			<TheLoaderVue />
		</div>
		<v-carousel
			v-else
			:continuous="false"
			:show-arrows="false"
			delimiter-icon="mdi-square"
			height="300"
			hide-delimiter-background
		>
			<v-carousel-item v-for="(slide, i) in rocketInfo" :key="i">
				<v-sheet :color="colors[i]" height="100%" tile>
					<div class="position-relative d-flex flex-column align-center px-12 py-6">
						<v-checkbox label="Add to Favorites" @change="added(slide.name)" class="favorite" />
						<div class="text-h2">
							{{ slide.name }}
						</div>
						<div class="text-h6">
							{{ slide.first_flight }}
						</div>
						<div class="text-h24 mt-4">
							{{ slide.description }}
						</div>
						<div class="text-h6 mt-2">
							Height: {{ slide.height.meters }}m Diameter: {{ slide.diameter.meters }}m
						</div>
						<div class="text-h6">Mass: {{ slide.mass.kg }}kg Stages: {{ slide.stages }}</div>
					</div>
				</v-sheet>
			</v-carousel-item>
		</v-carousel>

		<v-container class="w-100">
			<div class="w-25 px-4 py-2 rounded bg-red-darken-3 elevation-6" elevation="24">
				<div class="text-h5">
					<b>List of Favorites:</b>
				</div>
				<div v-for="(favorite, index) in store.favorites" class="text-h24">
					{{ index + 1 }}. {{ favorite }}
				</div>
			</div>
		</v-container>
	</v-container>
</template>

<script lang="ts" setup>
import TheLoaderVue from '~/components/TheLoader.vue'

const query = gql`
	query Rockets {
		rockets {
			description
			first_flight
			height {
				meters
			}
			diameter {
				meters
			}
			mass {
				kg
			}
			stages
			name
		}
	}
`
const { data } = useAsyncQuery<{
	rockets: {
		description: String
		first_flight: String
		height: {
			meters: Number
		}
		diameter: {
			meters: Number
		}
		mass: {
			kg: Number
		}
		stages: Number
		name: String
	}[]
}>(query)

const rocketInfo = computed(() => data.value?.rockets ?? [])
const isMounted: any = ref(false)

onMounted((): void => {
	setInterval(() => {
		isMounted.value = true
	}, 3000)
})
const colors = ['green darken-3', 'secondary darken-2', 'yellow darken-4', 'orange']

const store = addFavorite()

const added = (rocketName: any) => {
	let isChecked = event?.target.checked
	if (isChecked) {
		store.add(rocketName)
	} else {
		store.remove(rocketName)
	}
}
</script>

<style>
.favorite {
	position: absolute;
	right: 0;
	margin-right: 5%;
	font-size: 20px;
}
</style>
