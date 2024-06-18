import express from "express";
import { createResponseObject, handleErrors } from "../../common/common";
import { queryGetAllPlantsOfUser } from "../../database/plants/queryGetAllPlantsOfUser";
import { Plant } from "../../types/plant/plant";
import { ConflictError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { doesUserExist } from "../../common/users/common";
import { User } from "../../types/user/user";
import { queryGetUserByUserId } from "../../database/users/queryGetUserByUserId";
import { PlantLocation } from "../../types/plantLocation/plantLocation";
import { queryGetPlantLocationByLocationName } from "../../database/plantLocations/queryGetPlantLocationByLocationName";
import { doesPlantLocationExist } from "../../common/plants/common";

const router = express.Router();

router.get("/user/:userId/plants", async (req, res) => {
  const userId = req.params.userId;
  const plantLocationName: string | undefined = req.query.location as
    | string
    | undefined;
  try {
    await validateUser(userId);

    let allPlantsOfUser: Plant[] = (await queryGetAllPlantsOfUser(
      userId
    )) as Plant[];

    checkIfUserHasPlants(allPlantsOfUser);
    if (plantLocationName !== undefined && plantLocationName !== "") {
      const plantLocation: PlantLocation = await validatePlantLocation(
        plantLocationName
      );
      allPlantsOfUser = allPlantsOfUser.filter(
        (plant: Plant) => plant.locationId === plantLocation.locationId
      );
      checkIfUserHasPlantsOfLocation(allPlantsOfUser);
    }

    return createResponseObject(200, allPlantsOfUser, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

const validateUser = async (userId: string) => {
  const user: User = (await queryGetUserByUserId(userId)) as User;
  doesUserExist(user);
};

const validatePlantLocation = async (
  locationName: string
): Promise<PlantLocation> => {
  const plantLocation: PlantLocation =
    (await queryGetPlantLocationByLocationName(locationName)) as PlantLocation;
  doesPlantLocationExist(plantLocation);
  return plantLocation;
};

const checkIfUserHasPlants = (allPlantsOfUser: Plant[]) => {
  if (allPlantsOfUser.length === 0) {
    throw new ConflictError(errorMessages.userHasNoPlants);
  }
};

const checkIfUserHasPlantsOfLocation = (allPlantsOfUserOfLocation: Plant[]) => {
  if (allPlantsOfUserOfLocation.length === 0)
    throw new ConflictError(errorMessages.userHasNoPlantsOfLocation);
};

export default router;
