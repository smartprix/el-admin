import JSURL from 'jsurl2';
import camelCase from 'lodash/camelCase';

function stringify(str) {
	return JSURL.stringify(str, {rich: true, short: true});
}

function parse(str) {
	if (!str) return undefined;
	return JSURL.parse(str, {deURI: true});
}

function getModals(router) {
	return router.currentRoute.query.modals;
}

export function pascalCase(str) {
	const camel = camelCase(str);
	return camel[0].toUpperCase() + camel.slice(1);
}

export function getRouteModals(router) {
	const modals = parse(getModals(router)) || [];
	return modals.map((obj) => {
		const props = obj[1] || {};
		if (props._id) {
			props.data = props.data || {};
			props.data.id = props._id;
			props.fetch = true;
			delete props._id;
		}
		return {
			component: obj[0],
			props,
		};
	});
}

function _getModalsRouteParam(component, props) {
	const componentName = typeof component === 'string' ? component : component.name;
	const routeProps = {...props};
	if (routeProps.data) {
		if (routeProps.data.id) {
			routeProps._id = routeProps.data.id;
		}
		delete routeProps.data;
		delete routeProps.fetch;
	}
	return [pascalCase(componentName), routeProps];
}

export function getModalsRouteParam(modals, {router, append} = {}) {
	let routeModals = [];
	if (append && router) {
		routeModals = parse(getModals(router)) || [];
	}
	if (!modals) {
		if (!routeModals.length) return '';
		return stringify(routeModals);
	}
	modals = Array.isArray(modals) ? modals : [modals];
	const newModals = modals.map(
		modal => _getModalsRouteParam(modal.component, modal.props)
	);
	routeModals = routeModals.concat(newModals);
	return stringify(routeModals);
}

export function addRouteModal(router, component, props) {
	const routeModals = parse(getModals(router)) || [];
	routeModals.push(_getModalsRouteParam(component, props));
	router.push({
		query: stringify(routeModals),
	});
}

export function removeRouteModal(router, index) {
	const routeModals = parse(getModals(router)) || [];
	routeModals.splice(index, 1);
	router.push({
		query: stringify(routeModals),
	});
}

export function removeRouteModals(router) {
	if (getModals(router) != null) {
		const query = Object.assign({}, router.currentRoute.query);
		delete query.modals;
		router.push({query});
	}
}
