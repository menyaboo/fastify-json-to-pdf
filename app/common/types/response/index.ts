import {CustomErrorTypeEnum, HttpStatusCode} from "../../enums";

type CustomResponseTypeError = Array<{ property?: string; type?: string; message?: string }>;

export type MainResponseType = {
    statusCode: HttpStatusCode;
    data?: object | object[];
    validationError?: CustomResponseTypeError;
    errorTypeCode?: CustomErrorTypeEnum;
};

