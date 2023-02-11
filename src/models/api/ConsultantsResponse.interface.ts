type ConsultantsResponse = Consultant[];
export default ConsultantsResponse;

export interface Consultant {
	id: number,
	title: string,
	firstname: string,
	lastname: string,
	image: string,
	specialty: string,
	subspecialties: string[]
}