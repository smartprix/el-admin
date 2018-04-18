<template>
	<router-link :to="{query: link}">
		<slot></slot>
	</router-link>
</template>

<script>
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
			let query;
			if (this.append) {
				const modals = JSON.parse(this.$route.query.modals || '[]');
				const modalData = JSON.parse(this.$route.query.modalData || '[]');
				query = {
					modals: JSON.stringify(modals.concat(this.to)),
					modalData: JSON.stringify(modalData.concat(this.data)),
				};
			} else {
				query = {
					modals: JSON.stringify([this.to]),
					modalData: JSON.stringify([this.data]),
				};
			}
			return Object.assign({}, this.$route.query, query);
		},
	},
};
</script>
