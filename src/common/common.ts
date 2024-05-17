export const createResponseObject = (statusCode: number, body: any, res: any) => {
	return res.status(statusCode).json(body);
};
