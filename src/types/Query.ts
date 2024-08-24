export interface Query {
	userId: string;
	plantName?: { $regex: string; $options: string };
	locationId?: string;
}
