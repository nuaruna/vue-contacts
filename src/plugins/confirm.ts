import Vue from "vue";
import ConfirmDialog from "@/components/confirm-dialog.vue";

export default {
	install(Vue: any, args: any[]) {
		const component = Vue.component("confirm-dialog", ConfirmDialog);
		Vue.prototype.$confirm = (message: string) => {
			const tempDiv = document.createElement("div");
			tempDiv.setAttribute("id", "confirm");
			document.body.insertBefore(tempDiv, document.getElementById("app"));
			const myComponent = new component({
				data: () => {
					return { message };
				},
				el: "#confirm",
			});
			return myComponent;
		};
	},
};
declare module "vue/types/vue" {
	interface Vue {
		$confirm: (message: string) => any;
	}
}
