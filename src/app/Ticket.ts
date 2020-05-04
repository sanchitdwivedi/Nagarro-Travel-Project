import { User } from './user';

export class Ticket {
    ticketNo: number;
    requestType: string;
    priority: string;
    travelCity: string;
    fromLocation: string;
    startDate: Date;
    endDate: Date;
    passportNo: number;
    projectName: string;
    expenseBornBy: string;
    travelApproverName: string;
    expectedDuration: string;
    maxAllowedAmount: number;
    additionalDetails: string;
    submitDate: Date;
    status: string;
    commentByAdmin: string;
    user: User;
    // documentUploaded: string;
}