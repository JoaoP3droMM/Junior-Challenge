import { Request, Response } from "express"
import { AnelService } from "../service/Anel.service"

export class AnelController {
  static async criar(req: Request, res: Response) {
    try {
      const anel = await AnelService.criarAnel(req.body)
      return res.status(201).json(anel)
    } catch (error) {
      return res.status(400).json({ error: error.message })
    }
  }

  static async listar(req: Request, res: Response) {
    const aneis = await AnelService.listarAneis()
    return res.json(aneis)
  }

  static async atualizar(req: Request, res: Response) {
    const { id } = req.params
    const anel = await AnelService.atualizarAnel(Number(id), req.body)
    return res.json(anel)
  }

  static async deletar(req: Request, res: Response) {
    const { id } = req.params
    await AnelService.deletarAnel(Number(id))
    return res.status(204).send()
  }
}
