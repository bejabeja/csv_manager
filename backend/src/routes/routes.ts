import { Router } from "express";
import multer from "multer";
import { getCsvData, uploadFile } from "../controllers/fileController";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/api/files", upload.single("file"), uploadFile);
router.get("/api/csvdata", getCsvData);

export default router;
