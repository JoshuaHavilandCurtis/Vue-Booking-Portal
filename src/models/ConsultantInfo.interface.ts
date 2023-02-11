import { Moment } from "moment";
import { Consultant } from "@/models/api/ConsultantsResponse.interface";

export default interface ConsultantInfo extends Consultant {
	slots: Moment[]
}