import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { Plant } from "../../types/plant/plant";
import { isNullOrUndefined } from "../common";

export const doesPlantExist = (plant: Plant) => {
  if (isNullOrUndefined(plant))
    throw new NotFoundError(errorMessages.plantNotFound);
};
