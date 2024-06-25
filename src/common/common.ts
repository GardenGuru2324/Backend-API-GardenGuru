import { errorTypes } from '../errors/error';

export const createResponseObject = (
	statusCode: number,
	body: any, // eslint-disable-line @typescript-eslint/no-explicit-any
	res: any, // eslint-disable-line @typescript-eslint/no-explicit-any
) => {
	return res.status(statusCode).json(body);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handleErrors = (error: any, res: any) => {
	const { message, statusCode } = checkErrorType(error);
	return createResponseObject(statusCode!, { message: message }, res);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNullOrUndefined = (obj: any) => {
	return obj === null || obj === undefined;
};
