import { errorTypes } from '../errors/error';

export const createResponseObject = (statusCode: number, body: any, res: any) => {
	return res.status(statusCode).json(body);
};

export const handleErrors = (error: any, res: any) => {
	let { message, statusCode } = checkErrorType(error);
	return createResponseObject(statusCode!, { message: message }, res);
};

const checkErrorType = (error: any) => {
	let message, statusCode;
	for (const errorType of errorTypes) {
		if (error instanceof errorType) {
			message = error.message;
			statusCode = error.statusCode;
			break;
		}
	}
	return { message, statusCode };
};
