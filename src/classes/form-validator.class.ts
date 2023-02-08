interface Field {
	displayName: string,
	valid: boolean,
	errors: string[]
}

export default class {
	fields: Map<HTMLInputElement, Field> = new Map();
	invalidFields: Map<HTMLInputElement, Field> = new Map();

	constructor(
		public form: HTMLFormElement
	) {}


	private getDisplayName(elmt: HTMLInputElement) {
		return elmt.getAttribute("data-display-name") ?? this.form.querySelector(`label[for="${elmt.id}"]`)?.textContent?.replace(":","") ?? elmt.name.charAt(0).toUpperCase()+elmt.name.slice(1).replace("-", " ");
	}


	validateAllFields() {	
		for (const [fieldElmt, field] of this.fields) {
			//update the field's status
			this.updateField(fieldElmt, field);
		}
	}


	listenToFieldChanges() {
		for (const [fieldElmt, field] of this.fields) {
			//does the field already have an event listener? --> if not, add it
			if (fieldElmt.hasAttribute("data-listening")) continue;

			fieldElmt.addEventListener("input", () => this.updateField(fieldElmt, field));
			fieldElmt.setAttribute("data-listening", "");
		}
	}


	private updateField(fieldElmt: HTMLInputElement, field: Field) {
		this.checkField(fieldElmt, field);

		this.updateInvalidFields(fieldElmt, field);
	}


	private updateInvalidFields(fieldElmt: HTMLInputElement, field: Field) {
		const existingInvalidField = this.invalidFields.get(fieldElmt);

		if (! field.valid && existingInvalidField === undefined) {
			this.invalidFields.set(fieldElmt, field);
		} else if (field.valid && existingInvalidField !== undefined) {
			this.invalidFields.delete(fieldElmt);
		}
	}


	getAllFields() {
		//get all of the required fields on the form
		const fieldElmts = this.form.querySelectorAll<HTMLInputElement>("[data-required]:not(:disabled)");

		for (const fieldElmt of fieldElmts) {
			this.fields.set(fieldElmt, {
				valid: false,
				displayName: this.getDisplayName(fieldElmt),
				errors: []
			});
		}
	}


	private checkField(fieldElmt: HTMLInputElement, field: Field) {
		field.valid = false;
		field.errors = [];
		
		//if any fields are confirmation fields of our current element --> check to see if those fields are valid
		const confirmationFieldElmts = this.form.querySelectorAll<HTMLInputElement>(`input[data-confirmation="${fieldElmt.name}"]`);
		for (const confirmationFieldElmt of confirmationFieldElmts) {
			const confirmationField = this.fields.get(confirmationFieldElmt);
			if (confirmationField === undefined) continue;

			this.checkField(confirmationFieldElmt, confirmationField);
		}

		//if this field is empty
		if (! fieldElmt.hasAttribute("data-allow-empty")) {
			if (fieldElmt.type === "checkbox") {
				if (! fieldElmt.checked) {
					fieldElmt.classList.add("invalid");
					field.errors.push(`${field.displayName} must be accepted!`);
					return field;
				}
			} else if (fieldElmt.value.length === 0) {
				fieldElmt.classList.add("invalid");
				field.errors.push(`${field.displayName} is empty!`);
				return field;
			}
		}

		//if this field is a confirmation field
		const confirmationAttribute = fieldElmt.getAttribute("data-confirmation");
		if (confirmationAttribute !== null) {
			const originalFieldElmt = this.form.querySelector<HTMLInputElement>(`[name="${confirmationAttribute}"]`);

			if (originalFieldElmt !== null) {
				const originalField = this.fields.get(originalFieldElmt);
				if (originalField === undefined) throw new Error("Unable to find the original field for this confirmation field!");
	
				if (fieldElmt.value !== originalFieldElmt.value) {
					fieldElmt.classList.add("invalid");
					field.errors.push(`${field.displayName} does not match ${originalField.displayName}!`);
					return field;
				}
			}
		}

		//if this field needs to match a regular expression before it is valid
		const regexAttribute = fieldElmt.getAttribute("data-regex");
		if (regexAttribute !== null && fieldElmt.value.match(regexAttribute) === null) {
			fieldElmt.classList.add("invalid");
			field.errors.push(`${field.displayName} is not valid!`);
			return field;
		}

		fieldElmt.classList.remove("invalid");
		field.valid = true;
		return field;
	}

}
