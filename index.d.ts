import Vue, { Component, PluginObject } from "vue";

// Augment Vue types
declare module "vue/types/vue" {
	interface openRightModalOptions {
		data?: object
		fetch?: boolean;
		onMutate?: (obj: object) => any;
		onSelect?: (row: object, index: number) => any;
		openTab?: string;
		path?: string;
	}

	interface Vue {
		/**
		 * @param component If providing string, make sure a component is set
		 * in the componentMap prop for that key
		 */
		$openRightModal: (component: Component | string, props?: openRightModalOptions) => void;
		/**
		 * @param component If providing string, make sure a component is set
		 * in the componentMap prop for that key
		 */
		$closeOpenRightModal: (component: Component | string, props?: openRightModalOptions) => void;

		$closeRightModal: () => void;
	}
}

export const AppLayout: Vue;
export const ContentLayout: Vue;
export const DefaultInput: Vue;
export const MenuItems: Vue;
export const RightModal: Vue;

/**
 * **Installs the components:**
 * - ElaAppLayout
 * - ElaContentLayout
 * - ElaDefaultInput
 * - ElaMenuItems
 * - ElaRightModal
 * - ElaFilterItem
 * - ElaFieldset
 * - ElaSchemaForm
 * - ModalLink
 *
 * **And adds theses functions to the Vue.prototype:**
 * - $openRightModal
 * - $closeRightModal
 * - $closeOpenRightModal
 */
declare const elAdmin: PluginObject<Vue>;

export default elAdmin;