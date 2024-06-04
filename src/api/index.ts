import express from "express";
import plants from "./plants/getAllPlantsOfUser";
import plant from "./plants/getPlantByPlantId";
import user from "./users/getUserByUserId";

const router = express.Router();

// Achter deze API endpoint zitten al de endpoints. {baseUrl}/api/v1/{api-endpoint}
router.get("/", (req, res) => {
  res.json({
    message: "API V1",
  });
});

// Hier worden de endpoints gedefinieerd.
router.use("/plants", plants);
router.use("/plants", plant);
router.use(user);

export default router;
