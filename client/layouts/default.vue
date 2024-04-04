<template>
	<v-app>
		<TheNavbarVue />
		<v-main>
			<slot />
		</v-main>
		<TheFooterVue />
	</v-app>
</template>
<script setup>
import TheFooterVue from '~/components/TheFooter.vue'
import TheNavbarVue from '~/components/TheNavbar.vue'
</script>
