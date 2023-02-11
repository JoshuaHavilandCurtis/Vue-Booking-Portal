export default interface Request {
	type: RequestType,
	id: number
}

export type RequestType = "consultant" | "test" | "treatment" | "condition" | "centre";