<template>
	<router-link :to="{query: link}" class="modal-link">
		<span @click="handleClick"><slot></slot></span>
	</router-link>
</template>

<script>
import Vue from 'vue';

export default {
	name: 'modal-link',

	props: {
		to: String,
		data: Object,
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
			const {to, data, append} = this;

			if (!append) {
				return {
					modals: to,
					modalIds: (data && data.data && data.data.id) || '',
				};
			}

			const modals = (this.$route.query.modals || '').split(',');
			const modalIds = (this.$route.query.modalIds || '').split(',');
			return {
				modals: modals.concat(to).join(','),
				modalIds: modalIds.concat((data && data.data && data.data.id) || '').join(','),
			};
		},

		handleClick(e) {
			if (e.ctrlKey) return;
			Vue.bus.$emit('openRightModal', {
				component: this.to,
				props: this.data,
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
