import { reactive } from "vue";

export class ErrorDialogService {

	/** Service for the error dialog */

	visible = false;
	message?:string;

	constructor() {}


	open(error?: string) {
		this.visible = true;
		this.message = error ?? undefined;
	}
	

	close() {
		this.visible = false;
		this.message = undefined;
	}
	
}

const $errorDialog = new ErrorDialogService();
export default reactive($errorDialog);