export interface IPost{
    id?:                       number;
    postByUser?:               number;
    title:                    string;
    body:                     string;
    creationDate:             Date;
    estimatedPublicationDate: Date;
    status:                   Status;
    approvalPercentage:       number;
    corrections:              Corrections;
    platform:                 Platform;
    postUrl:                  string;
    multimediaUrl:            string;
    deletedAt:                null;
}

export enum Corrections {
    Ninguna = "Ninguna",
    PalabraProhibida = "palabra prohibida",
}

export enum Platform {
    X = "X",
}

export enum Status {
    Pending = "pending",
}