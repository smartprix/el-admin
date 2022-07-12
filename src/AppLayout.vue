<template>
	<div class="ela-app-layout">
		<nav class="ela-side-menu">
			<div class="ela-side-menu-content">
				<slot name="sidebar"></slot>
			</div>
		</nav>
		<div class="ela-app-container">
			<header>
				<slot name="header"></slot>
			</header>
			<div class="ela-app-container">
				<slot></slot>
				<right-modal
					v-for="(modal, index) in rightModals"
					:key="index"
					:index="index"
					v-model="modal.shown"
					@change="(!modal.shown) && removeRightModal(index)">
					<component
						:is="modal.component"
						v-bind="modal.props"
						@done="modal.shown = false"
					></component>
				</right-modal>
			</div>
		</div>
	</div>
</template>

<script>
import MenuItems from './MenuItems.vue';
import RightModal from './RightModal.vue';
import {
	pascalCase,
	addRouteModal,
	removeRouteModal,
	removeRouteModals,
	getRouteModals,
} from './utils';


export default {
	name: 'ElaAppLayout',

	components: {
		MenuItems,
		RightModal,
	},

	props: {
		componentMap: Object,
	},

	data() {
		return {
			// right modals is an array of right modal
			// each right modal is represented as an object
			// {shown: boolean, component: string, data: object}
			rightModals: [],
		};
	},

	computed: {
		pascalCaseMap() {
			const pascalCaseMap = {};
			Object.keys(this.componentMap).forEach((key) => {
				const pascalCaseKey = pascalCase(key);
				pascalCaseMap[pascalCaseKey] = this.componentMap[key];
			});
			return pascalCaseMap;
		},
	},

	watch: {
		$route(to) {
			if (!to.query.modals) {
				if (this.rightModals.length) {
					this.closeRightModal();
				}
			}
		},
	},

	created() {
		this.$router.onReady(() => {
			this.setModalsFromRoutes();
		});
	},

	methods: {
		/**
		 * @param {string | Vue} component If this is string it will try
		 * to get component from componentMap
		 * @returns {Vue}
		 */
		resolveComponent(component) {
			if (typeof component === 'string') {
				return this.pascalCaseMap[pascalCase(component)];
			}

			return component;
		},

		/**
		 * @param {{component: string | Vue, props?: any}} param0
		 */
		openRightModal({component, props}) {
			component = this.resolveComponent(component);
			if (!component) return;
			addRouteModal(this.$router, component, props);
			this.rightModals.push({
				shown: true,
				component,
				props: props || {},
			});
		},

		closeRightModal() {
			removeRouteModals(this.$router);
			this.rightModals = [];
		},

		removeRightModal(index) {
			if (this.rightModals.length === 1) {
				this.closeRightModal();
				return;
			}
			removeRouteModal(this.$router, index);
			this.rightModals.splice(index, 1);
		},

		setModalsFromRoutes() {
			this.closeRightModal();
			const modals = getRouteModals(this.$router);
			modals.forEach((modal) => {
				this.openRightModal({
					component: modal.component,
					props: modal.props,
				});
			});
		},
	},

	events: {
		openRightModal({component, props}) {
			component = this.resolveComponent(component);
			this.openRightModal({component, props});
		},

		closeRightModal() {
			this.closeRightModal();
		},

		closeOpenRightModal({component, props}) {
			component = this.resolveComponent(component);
			if (this.rightModals.length) {
				this.closeRightModal();
				this.$nextTick(() => {
					this.openRightModal({component, props});
				});
			}
			else {
				this.openRightModal({component, props});
			}
		},
	},
};
</script>

<style lang="postcss">
html {
	background-color: white;
	font-size: 14px;
	-moz-osx-font-smoothing: grayscale;
	-webkit-font-smoothing: antialiased;
	min-width: 300px;
	overflow-x: hidden;
	overflow-y: scroll;
	text-rendering: optimizeLegibility;
	height: 100%;
	overflow: hidden;
}

body, button, input, select, textarea {
	font-family: -apple-system, BlinkMacSystemFont,
		"Segoe UI", "Roboto", "Oxygen",
		"Ubuntu", "Cantarell", "Fira Sans",
		"Droid Sans", "Helvetica Neue",
		"Helvetica", "Arial", sans-serif;
}

body {
	font-weight: 400;
	font-size: 1rem;
	line-height: 1.5;
	height: 100%;
	overflow: auto;
	margin: 0;
	padding: 0;
}

code, pre {
	-moz-osx-font-smoothing: auto;
	-webkit-font-smoothing: auto;
	font-family: "Inconsolata", "Consolas", "Monaco", monospace;
}

#app {
	height: 100%;
}

.modal-ref {
	border-bottom: 1px dashed;
	cursor: pointer;
}

.ela-app-layout {
	height: 100%;
	display: flex;
}

.ela-app-container > header {
	flex: 0 0 60px;
	display: flex;
	background: #1f2f3d;

	.el-input__inner {
		border: 0;
	}

	.el-menu {
		background-color: transparent;
	}

	.el-menu--horizontal.el-menu .el-submenu__title,
	.el-menu--horizontal.el-menu .el-submenu__title:hover,
	.el-menu--horizontal.el-menu > .el-menu-item {
		background-color: transparent;
		color: lightgrey;
	}

	> *:only-child {
		display: flex;
		flex: 1;
	}

	.header-left {
		flex: 1;
	}

	.header-right {
		display: flex;
		flex: 0;
		align-items: center;
		margin-left: auto;
	}
}

.ela-app-container {
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;
	overflow: hidden;
	position: relative;
	width: 100%;
	height: 100%;
	z-index: 2;
}

.ela-side-menu {
	display: flex;
	flex-direction: column;
	flex: 0 0 240px;
	background: #324057;
	position: relative;

	.logo {
		height: 60px;
		text-align: center;
		background: #1f2f3d;

		> img {
			max-height: 60px;
		}
	}
}

.ela-side-menu-content {
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	overflow-y: auto;
	overflow-x: hidden;

	.el-menu {
		background-color: #324057;
	}

	.el-menu-item, .el-submenu__title {
		color: lightgrey;
	}

	.el-menu-item:hover, .el-menu-item:focus, .el-submenu__title:hover {
		color: black;
	}
}

@media (max-device-width: 900px) {
	.ela-side-menu {
		flex: 0 0 80px;
	}
}
</style>
