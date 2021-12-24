const { Router } = require("express");
const {
  addStudent,
  getAllStudent,
  filteredData,
  getLatestData,
  getSingleDocument,
  deleteSingleDoc,
  updateDoc,
} = require("../controller/studentController");

const router = Router();

router.post("/addStudent", addStudent);
router.get("/getAllStudents", getAllStudent);
router.get("/getFilteredData", filteredData);
router.get("/getLatestData", getLatestData);
router.get("/singleDocument", getSingleDocument);
router.put("/updateDoc", updateDoc);
router.delete("/deleteDoc", deleteSingleDoc);

module.exports = router;
