import { Double, ObjectId } from 'mongodb';

export interface Plant {
	_id: ObjectId;
	plantId: string;
	plantName: string;
	locationId: string;
	plantImage: string;
	plantedDate: number;
	isVegetable: boolean;
	plantGrowthHabit: string;
	plantAvgHeight: Double;
	plantMaxHeight: Double;
	plantGrowthRate: string;
	plantDaysToHarvest: number;
	plantRowSpacing: Double;
	plantMinTemp: number;
	plantMaxTemp: number;
	userId: string;
}
