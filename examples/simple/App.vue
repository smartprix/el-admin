<template>
	<ela-app-layout :componentMap="componentMap">
		<div slot="header">
			<div class="header-left">
				<ela-menu-items :items="headerMenuItems" mode="horizontal"></ela-menu-items>
			</div>
			<div class="header-right">
				<el-input icon="search" placeholder="Search" style="width: 300px;"></el-input>
				<ela-menu-items :items="userMenuItems" mode="horizontal"></ela-menu-items>
			</div>
		</div>

		<div slot="sidebar">
			<div class="logo">
				<img src="./logo.png" height="60" class="logo"/>
			</div>
			<ela-menu-items :items="sideMenuItems"></ela-menu-items>
		</div>

		<router-view></router-view>
	</ela-app-layout>
</template>

<script>
import {componentMap} from './modalViews';

export default {
	name: 'app',
	data() {
		return {
			componentMap,
			sideMenuItems: [
				{
					text: 'Employees',
					link: '/employees',
					icon: 'message',
				},
				{
					text: 'Payroll',
					link: '/payroll',
					icon: 'setting',
				},
				{
					text: 'Test',
					icon: 'setting',
					items: [
						{
							text: 'Test',
							link: '/payroll',
							icon: 'setting',
						},
						{
							text: 'Test',
							link: '/payroll',
							items: [
								{
									text: 'Test',
									link: '/payroll',
									icon: 'setting',
								},
								{
									text: 'Test',
									link: '/payroll',
									icon: 'setting',
								},
							],
						},
					],
				},
			],
			headerMenuItems: [
				{
					text: 'Employees',
					link: '/employees',
					icon: 'message',
				},
				{
					text: 'Payroll',
					link: '/payroll',
					icon: 'setting',
				},
				{
					text: 'Test',
					icon: 'setting',
					items: [
						{
							text: 'Test',
							link: '/payroll',
							icon: 'setting',
						},
						{
							text: 'Test',
							link: '/payroll',
							icon: 'setting',
						},
					],
				},
			],
			userMenuItems: [
				{
					text: 'Hitesh',
					icon: 'setting',
					items: [
						{
							text: 'Settings',
						},
						{
							text: 'Logout',
						},
					],
				},
			],
		};
	},
};
</script>

<style>
</style>
