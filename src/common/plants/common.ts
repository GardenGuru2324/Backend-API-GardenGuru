import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { Plant } from "../../types/plant/plant";
import { PlantLocation } from "../../types/plantLocation/plantLocation";
import { isNullOrUndefined } from "../common";

export const doesPlantExist = (plant: Plant) => {
  if (isNullOrUndefined(plant))
    throw new NotFoundError(errorMessages.plantNotFound);
};

export const doesPlantLocationExist = (plantLocation: PlantLocation) => {
  if (isNullOrUndefined(plantLocation))
    throw new NotFoundError(errorMessages.plantLocationNotFound);
};
