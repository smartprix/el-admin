<script>
export default {
	name: 'ela-menu-items',
	props: {
		items: Array,
		mode: {
			type: String,
			default: 'vertical',
		},
	},
	render(h) {
		let index = 1;
		const getSubMenu = (menu) => {
			if (menu.items) {
				return (
					<el-submenu index={String(index++)}>
						<template slot="title">
							{menu.icon && <i class={'el-icon-' + menu.icon}></i>}{menu.text}
						</template>
						{menu.items.map(getSubMenu)}
					</el-submenu>
				);
			}
			return (
				<el-menu-item index={menu.link || String(index++)}>
					{menu.icon && <i class={'el-icon-' + menu.icon}></i>}{menu.text}
				</el-menu-item>
			);
		};

		return (
			<el-menu mode={this.mode} router>
				{this.items.map(getSubMenu)}
			</el-menu>
		);
	},
};
</script>
