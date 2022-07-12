import JSURL from 'jsurl2';
import camelCase from 'lodash/camelCase';

function stringify(str) {
	return JSURL.stringify(str, {rich: true, short: true});
}

function parse(str) {
	if (!str) return undefined;
	return JSURL.parse(str, {deURI: true});
}

function getQueryModals(router) {
	return router.currentRoute.query.modals;
}

function setQueryModals(router, modals) {
	const query = router.currentRoute.query;
	const newQuery = {...query, modals};
	if (!modals) {
		delete newQuery.modals;
	}
	router.push({
		query: newQuery,
	});
}

export function pascalCase(str) {
	const camel = camelCase(str);
	return camel[0].toUpperCase() + camel.slice(1);
}

export function getRouteModals(router) {
	const modals = parse(getQueryModals(router)) || [];
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
		routeModals = parse(getQueryModals(router)) || [];
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
	const routeModals = parse(getQueryModals(router)) || [];
	routeModals.push(_getModalsRouteParam(component, props));
	setQueryModals(router, stringify(routeModals));
}

export function removeRouteModal(router, index) {
	const routeModals = parse(getQueryModals(router)) || [];
	routeModals.splice(index, 1);
	setQueryModals(router, stringify(routeModals));
}

export function removeRouteModals(router) {
	if (getQueryModals(router) != null) {
		setQueryModals(router, null);
	}
}
