import { Router } from "express";
import {getStudents, getStudent, createStudent, updateStudent, deleteStudent} from "../controllers/students.controller.js"
const router = Router();

router.get('/students', getStudents );
router.get('/students/:id', getStudent );
router.post('/students', createStudent );
router.put('/students/:id', updateStudent );
router.delete('/students/:id', deleteStudent );

export default router;