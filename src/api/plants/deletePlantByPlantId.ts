import express from "express";
import { createResponseObject, handleErrors, isNullOrUndefined } from "../../common/common";
import { queryDeletePlantByPlantIdAndUserId } from "../../database/plants/queryDeletePlantByPlantId";
import { validateUser } from "../../common/users/common";
import { NotFoundError } from "../../errors/error";
import { Plant } from "../../types/plant/plant";
import { errorMessages } from "../../errors/errorMessages";
import { queryGetPlantByPlantIdAndUserId } from "../../database/plants/queryGetPlantByPlantIdAndUserId";

const router = express.Router();

router.delete("/user/:userId/plants/:plantId", async (req, res) => {
  const plantId = req.params.plantId;
  const userId = req.params.userId;

  try {
    await validateUser(userId);

    await checkIfUserHasPlant(plantId, userId);

    await queryDeletePlantByPlantIdAndUserId(plantId, userId);

    return createResponseObject(200, { message: "Plant successfully deleted" }, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

const checkIfUserHasPlant = async (plantId: string, userId: string) => {
  const plant: Plant = (await queryGetPlantByPlantIdAndUserId(plantId, userId)) as Plant;

  if (isNullOrUndefined(plant)) {
    throw new NotFoundError(errorMessages.plantNotFound);
  }
};
export default router;
