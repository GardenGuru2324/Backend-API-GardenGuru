import { NotFoundError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { Plant } from "../../types/plant/plant";

export const doesPlantExist = (plant: Plant) => {
  if (plant === null) throw new NotFoundError(errorMessages.plantNotFound);
};
