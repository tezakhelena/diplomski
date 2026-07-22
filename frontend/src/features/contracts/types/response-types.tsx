import { Moment } from "moment";

export interface AdoptionContractResponse {
  contractId: number;
  fileName: string;
  newFileName: string;
  uploadedAt: Moment;
  signedStatus: number;
  username: string;
  profilePicture: string;
}