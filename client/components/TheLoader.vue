<template>
	<div v-if="!isMounted" class="position-relative d-flex flex-column align-center px-12 py-6">
		<v-progress-circular color="primary" indeterminate />
	</div>
</template>
