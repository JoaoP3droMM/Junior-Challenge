import { Request, Response } from "express"
import { AnelService } from "../service/Anel.service"

export class AnelController {
  static async criar(req: Request, res: Response) {
    try { 
      const anel = await AnelService.criarAnel(req.body)
      return res.status(201).json(anel)
    } catch (error) {
      // Garantindo que error só seja acessada se a mensagem for realmente um Error
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message })
      }
      return res.status(401).json({ error: 'Ocorreu um erro desconhecido' })
    }
  }

  static async listar(req: Request, res: Response) {
    const aneis = await AnelService.listarAneis()
    return res.json(aneis)
  }

  static async atualizar(req: Request, res: Response) {
    const { nome } = req.params; // Alterado para nome
    try {
      const anel = await AnelService.atualizarAnel(nome, req.body); // Passa o nome
      return res.json(anel);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno' });
    }
  }

  static async deletar(req: Request, res: Response) {
    const { nome } = req.params; // Alterado para nome
    try {
      const resultado = await AnelService.deletarAnel(nome); // Passa o nome
      return res.status(200).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}
