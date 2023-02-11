export default class FormValidatorHelper {

	/** Handles the validation of Form fields */

	form!: HTMLFormElement;
	fields = new Map<string, Field>();
	private currentlyDisabledFields?: Field[];

	get valid() {
		return ! Array.from(this.fields).some(([name, field]) => field.valid !== null && ! field.valid);
	}

	constructor() {}

	init(form: HTMLFormElement) {
		this.form = form;
		this.getFields();
	}


	checkValidityOfFields() {
		for (const [name, field] of this.fields) field.checkValidity();
	}


	listenToFields() {
		for (const [name, field] of this.fields) field.listenToInputs();
	}

	
	disableFields() {
		this.currentlyDisabledFields = [];

		for (const [name, field] of this.fields) {
			if (field.elmt.disabled) continue;
			this.currentlyDisabledFields.push(field);
			field.elmt.disabled = true;
		}
	}

	reenableFields() {
		if (this.currentlyDisabledFields === undefined) throw new Error("Fields have not been disabled beforehand!");

		for (const field of this.currentlyDisabledFields) field.elmt.disabled = false;

		this.currentlyDisabledFields = undefined;
	}


	private getFields() {
		const elmts = this.form.querySelectorAll<HTMLInputElement>("[data-required]");
		for (const elmt of elmts) this.fields.set(elmt.name, new Field(elmt));

		this.setConfirmationFields();
	}


	private setConfirmationFields() {
		for (const [name, field] of this.fields) {
			const originalFieldName = field.elmt.getAttribute("data-confirmation");
			if (originalFieldName === null) continue;
			field.elmt.removeAttribute("data-confirmation");

			const originalField = this.fields.get(originalFieldName);
			if (originalField === undefined) throw new Error("There was an error when trying to retrieve the original field from a confirmation field!");

			//set this field as one of the confirmation fields on the original field
			if (originalField.confirmationFields === undefined) originalField.confirmationFields = [];
			originalField.confirmationFields.push(field);

			//set the original field our confirmation field
			field.originalField = originalField;
		}
	}

}


const observeAttribute = (target: Node, attribute: string, callback: Function) => {
	const observer = new MutationObserver(mutations => {
		if (! mutations.some(mutation => mutation.type === "attributes" && mutation.attributeName === attribute)) return;
		callback();
	});
	observer.observe(target, { attributes: true });
};


class Field {
	displayName: string;
	valid: boolean | null = null;
	listening = false;
	allowEmpty: boolean;
	regex?: RegExp;
	errors?: string[];
	originalField?: Field;
	confirmationFields?: Field[];

	constructor(
		public elmt: HTMLInputElement
	) {
		this.displayName = elmt.getAttribute("data-display-name") ?? elmt.name.charAt(0).toUpperCase() + elmt.name.slice(1).replace("-", " ");
		this.allowEmpty = elmt.hasAttribute("data-allow-empty");
		this.regex = elmt.hasAttribute("data-regex") ? new RegExp(elmt.getAttribute("data-regex")!) : undefined;

		this.elmt.removeAttribute("data-required");
		this.elmt.removeAttribute("data-display-name");
		this.elmt.removeAttribute("data-allow-empty")
		this.elmt.removeAttribute("data-regex");
	}

	listenToInputs() {
		if (this.listening) return;

		this.elmt.addEventListener("input", () => this.checkValidity());
		observeAttribute(this.elmt, "disabled", () => this.checkValidity());

		this.listening = true;
	}

	checkValidity() {
		this.validate();
		if (this.elmt.disabled) return;

		//if this field has confirmation fields, then call this method using those confirmation fields
		if (this.confirmationFields !== undefined) for (const confirmationField of this.confirmationFields) confirmationField.checkValidity();

		//if this field is empty
		if (! this.allowEmpty) {
			if (this.elmt.type === "checkbox") {
				if (! this.elmt.checked) {
					this.invalidate(`This must be accepted`);
				}
			} else if (this.elmt.value.length === 0) {
				this.invalidate(`This must not be empty`);
			}
		}

		//if this field is a confirmation field
		if (this.originalField !== undefined && this.elmt.value !== this.originalField.elmt.value) this.invalidate(`This does not match ${this.originalField.displayName}`);

		//if this field has regex that it needs to match
		if (this.regex !== undefined && ! this.regex.test(this.elmt.value)) this.invalidate(`This is not valid`);
	}


	private validate() {
		this.valid = true;
		this.errors = undefined;
		this.elmt.classList.remove("invalid");
	}


	private invalidate(...errors: string[]) {
		this.valid = false;
		if (this.errors === undefined) this.errors = [];
		for (const error of errors) this.errors.push(error);
		this.elmt.classList.add("invalid");
	};

}