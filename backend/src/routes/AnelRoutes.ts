import { Router } from "express";
import { AnelController } from "../controller/Anel.controller";

const router = Router()

router.post('/aneis', AnelController.criar)
router.get('/aneis', AnelController.listar)
router.put('/aneis', AnelController.atualizar)
router.delete('/aneis/:id', AnelController.deletar)

export default router