<script setup></script>

<template>
	<v-toolbar class="fixed-bar dense fixed d-flex mb-6 bg-surface-variant bg-brown-darken-4">
		<div class="ma-2 px-10 me-auto">
			<h2>
				<v-icon icon="mdi-vuetify" />
				APOLLO
			</h2>
		</div>
		<NuxtLink to="/" class="nuxt-link-active ma-2 pa-2 align-self-center">Home</NuxtLink>
		<NuxtLink to="/rocket" class="nuxt-link-active ma-2 pa-2 align-self-center mr-12">Rockets</NuxtLink>
	</v-toolbar>
</template>

<style scoped>
.fixed-bar {
	position: sticky;
	position: -webkit-sticky; /* for Safari */
	top: 0em;
	z-index: 2;
}

.nuxt-link-active {
	color: white;
	background-color: rgb(136, 66, 1);
	border-radius: 10%;
	text-decoration: none;
}
</style>
