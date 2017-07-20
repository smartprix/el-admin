<template>
	<div class="ela-app-layout">
		<nav class="ela-side-menu" @click="rightShown = false">
			<div class="ela-side-menu-content">
				<slot name="sidebar"></slot>
			</div>
		</nav>
		<div class="ela-app-container">
			<header @click="rightShown = false">
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
						v-bind="modal.data"
						@done="modal.shown = false"
					></component>
				</right-modal>
			</div>
		</div>
	</div>
</template>

<script>
import Vue from 'vue';
import MenuItems from './MenuItems.vue';
import RightModal from './RightModal.vue';

Vue.prototype.$openRightModal = function (component, props) {
	this.$bus.$emit('openRightModal', {
		component,
		props,
	});
};

Vue.prototype.$closeAllRightModals = function () {
	this.$bus.$emit('closeRightModals');
};

Vue.prototype.$closeOpenRightModal = function (component, props) {
	this.$bus.$emit('closeOpenRightModal', {
		component,
		props,
	});
};

export default {
	name: 'ela-app-layout',
	components: {
		MenuItems,
		RightModal,
	},
	data() {
		return {
			// right modals is an array of right modal
			// each right modal is represented as an object
			// {shown: boolean, component: string, data: object}
			rightModals: [],
		};
	},
	methods: {
		openRightModal({component, props}) {
			this.rightModals.push({
				shown: true,
				component,
				data: props || {},
			});
		},

		closeAllRightModals() {
			this.rightModals = [];
		},

		removeRightModal(index) {
			if (this.rightModals.length === 1) {
				this.rightModals = [];
				return;
			}

			this.rightModals.splice(index, 1);
		},
	},
	events: {
		openRightModal(opts) {
			this.openRightModal(opts);
		},

		closeAllRightModals() {
			this.closeAllRightModals();
		},

		closeOpenRightModal(opts) {
			if (this.rightModals.length) {
				this.removeRightModal(this.rightModals.length - 1);
			}
		},
	},
};
</script>

<style>
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
	font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
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

	.el-menu--horizontal.el-menu .el-submenu__title:hover,
	.el-menu--horizontal.el-menu > .el-menu-item {
		background-color: transparent;
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
}
</style>
