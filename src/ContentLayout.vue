<template>
	<div class="ela-content-layout" :class="{'with-tabs': $slots.tabs}">
		<div class="ela-content-layout-head" v-if="$slots.head">
			<slot name="head"></slot>
		</div>
		<div class="ela-content-layout-tabs" v-if="$slots.tabs">
			<slot name="tabs"></slot>
		</div>
		<div class="ela-content-layout-content" :style="{padding: padding}" v-if="$slots.default">
			<div class="ela-content-layout-filters" v-if="$slots.filters">
				<slot name="filters"></slot>
			</div>
			<slot></slot>
		</div>
		<div class="ela-content-layout-foot" v-if="$slots.foot">
			<slot name="foot"></slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ela-content-layout',
	props: {
		padding: {},
	},
	mounted() {
	},
};
</script>

<style lang="postcss">
.ela-content-layout {
	display: flex;
	flex-direction: column;
	height: 100%;
}

.ela-content-layout-content {
	padding: 20px;
	overflow: auto;
	flex: 1;
}

.ela-content-layout-filters {
	margin-bottom: -18px;
	padding: 14px 12px;
	overflow: hidden;
	background: aliceblue;
}

.ela-content-layout-content, .ela-content-layout-tabs {
	.el-table {
		position: relative;
		overflow: visible;
		width: max-content !important;
		max-width: unset;
		min-width: 100%;
	}

	.el-table--border::after {
		content: none;
	}

	.el-table__header-wrapper {
		overflow: visible;
		position: sticky;
		top: -1px;
		z-index: 9;
	}

	.el-table__body-wrapper {
		overflow: visible;
	}

	> * {
		position: sticky;
		left: 0;
	}
}

.ela-content-layout-tabs {
	display: flex;
	flex-direction: column;
	flex: 1 1 auto;

	.el-tabs__header {
		padding: 0 20px;
		margin-top: -41px;
		margin-bottom: 0;
	}

	.el-tabs {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
	}

	.el-tabs__content {
		padding: 20px;
		overflow: auto;
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
	}

	.el-tab-pane {
		display: flex;
		flex-direction: column;
		flex: 1 1 auto;
	}
}

.ela-content-layout-foot {
	border-top: 1px solid #bfcbd9;
	flex: 0 0 44px;
	padding: 6px 8px;
}

.ela-content-layout-head {
	border-bottom: 1px solid #bfcbd9;
	flex: 0 0 64px;
	padding: 14px 20px;
}

.ela-content-layout-head, .ela-content-layout-foot {
	background: #fff;
	position: relative;
	/*z-index: 2;*/
	box-sizing: border-box;
	font-size: 14px;
	line-height: 18px;
	display: flex;

	.with-tabs & {
		flex-basis: 104px;
		padding-bottom: 54px;
		border-bottom: 0;
	}

	> div {
		display: flex;
		width: 100%;
	}

	h3, .heading {
		font-weight: bold;
		font-size: 22px;
		line-height: 36px;
		color: #2f4f4f;
		margin: 0 30px 0 0;
		padding: 0;
		display: flex;
		align-items: center;;

		small {
			font-size: 14px;
			font-weight: normal;
			margin-left: 10px;
			padding: 0 10px;
			background: #dcdcdc;
			color: color(#2f4f4f a(0.8));
		}
	}

	.header-right, .footer-right {
		margin-left: auto;
	}
}

.el-tabs__content {
	.ela-content-layout-content .el-table__header-wrapper,
	.ela-content-layout-tabs .el-table__header-wrapper {
		top: -21px;
	}
}
</style>
