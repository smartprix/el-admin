<template>
	<router-link :to="{query: link}" class="modal-link">
		<span @click="handleClick"><slot></slot></span>
	</router-link>
</template>

<script>
import Vue from 'vue';
import {getModalsRouteParam} from './utils';

export default {
	name: 'ModalLink',

	props: {
		to: String,
		data: Object,
		props: Object,
		append: {
			type: Boolean,
			default: true,
		},
	},

	data() {
		return {
			link: this.getLink(),
		};
	},

	methods: {
		getLink() {
			const routeProps = {...this.props};
			if (this.data) {
				routeProps.data = this.data;
			}
			return {
				modals: getModalsRouteParam({
					component: this.to,
					props: routeProps,
				}, {
					router: this.$router,
					append: this.append,
				}),
			};
		},

		handleClick(e) {
			if (e.ctrlKey) return;
			const routeProps = {...this.props};
			if (this.data) {
				routeProps.data = this.data;
			}
			Vue.bus.$emit('openRightModal', {
				component: this.to,
				props: routeProps,
			});
		},
	},
};
</script>

<style>
.modal-link {
	color: inherit;
	text-decoration: none;
}
</style>
