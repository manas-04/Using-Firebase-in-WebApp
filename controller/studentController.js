const { check, validationResult } = require("express-validator");
const {
  collection,
  addDoc,
  getDocs,
  query,
  limit,
  where,
  onSnapshot,
  doc,
  getDoc,
  deleteDoc,
  updateDoc,
} = require("firebase/firestore");

const { db } = require("../db");
const Student = require("../model/student");

module.exports.addStudent = async (req, res) => {
  try {
    const data = req.body;
    const docRef = await addDoc(collection(db, "students"), data);
    if (docRef) {
      res.status(200).json({ data: docRef });
    } else {
      res.status(400).json({ msg: "Something went wrong" });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.getAllStudent = async (req, res) => {
  try {
    const data = await getDocs(collection(db, "students"));
    var arr = [];
    if (data) {
      data.forEach((doc) => {
        arr.push(doc.data());
      });
      res.status(200).json({ data: arr });
    } else {
      res.status(200).json({ data: "No Data Found." });
    }
  } catch (err) {
    res.status(400).json(err.message);
  }
};

module.exports.filteredData = [
  check("limit").not().isEmpty().withMessage("Limit query param is required"),
  check("semester")
    .not()
    .isEmpty()
    .withMessage("Semester Query param is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const reqLimit = parseInt(req.query.limit ? req.query.limit : 0);
      const sem = parseInt(req.query.semester ? req.query.semester : 0);

      const Query = query(
        collection(db, "students"),
        where("semester", "==", `${sem}`),
        limit(reqLimit)
      );

      const querySnapshot = await getDocs(Query);
      const allDocs = await querySnapshot.docs.map((doc) => {
        console.log(doc.id);
        return { ...doc.data(), id: doc.id };
      });

      if (allDocs.length !== 0) {
        res.status(200).json({ data: allDocs });
      } else {
        res.status(200).json({ data: "No Record Found" });
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
];

module.exports.getLatestData = [
  check("limit").not().isEmpty().withMessage("Limit query param is required"),
  check("semester")
    .not()
    .isEmpty()
    .withMessage("Semester Query param is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const reqLimit = parseInt(req.query.limit ? req.query.limit : 0);
    const sem = parseInt(req.query.semester ? req.query.semester : 0);
    try {
      const Query = query(
        collection(db, "students"),
        where("semester", "==", `${sem}`),
        limit(reqLimit)
      );

      onSnapshot(Query, (querySnapshot) => {
        const allDocs = querySnapshot.docs.map((doc) => {
          return { ...doc.data(), id: doc.id };
        });
        if (allDocs.length !== 0) {
          res.status(200).json({ data: allDocs });
        } else {
          res.status(200).json({ data: "No Record Found" });
        }
      });
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
];

module.exports.getSingleDocument = [
  check("id").not().isEmpty().withMessage("Id param is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const reqID = req.query.id ? req.query.id : null;
      const searchQuery = doc(db, `students/${reqID}`);
      const student = await getDoc(searchQuery);
      if (student.exists()) {
        res.status(200).json({ data: student.data() });
      } else {
        res.status(400).json({ message: "Something went wrong" });
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
];

module.exports.deleteSingleDoc = [
  check("id").not().isEmpty().withMessage("Id param is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const reqID = req.query.id ? req.query.id : null;
      const searchQuery = doc(db, `students/${reqID}`);
      const foundDoc = await getDoc(searchQuery);
      if (foundDoc.exists()) {
        await deleteDoc(searchQuery);
        res.status(200).json({ data: "Document Deleted" });
      } else {
        res.status(400).json({ message: "Doc not Found" });
      }
    } catch (err) {
      res.status(400).json(err.message);
    }
  },
];

module.exports.updateDoc = [
  check("id").not().isEmpty().withMessage("Id param is required"),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const reqID = req.query.id ? req.query.id : null;
      const content = req.body;
      const searchQuery = doc(db, `students/${reqID}`);

      const foundDoc = await getDoc(searchQuery);

      if (foundDoc.exists()) {
        try {
          await updateDoc(searchQuery, {
            ...content,
          });
          res.status(200).json({ data: "Document Updated" });
        } catch (err) {
          res.status(400).json({ message: err.message });
        }
      }
    } catch (err) {
      res.status(400).json({ message: "Something went wrong" });
    }
  },
];

//
