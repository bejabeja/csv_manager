import { Request, Response, Router } from "express";
import multer from "multer";
import { getCsvData, uploadFile } from "../controllers/fileController";

const router = Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post("/api/files", upload.single("file"), uploadFile);
router.get("/api/csvdata", getCsvData);
router.get("/api/hello", (req: Request, res: Response) => {
  res.json({ message: "¡Hola desde CSV Manager!" });
});

export default router;
