import { Router } from "express";
import "./db/poppybase";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).send("Hello World! from API Router");
});

export default router;
