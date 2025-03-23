import { AnelRepository } from "../model/Anel.model"
import { Anel } from "../entities/Anel"

const limites = { Elfos: 3, Anões: 7, Homens: 9, Sauron: 1 } as const

// Definindo tipo para garantir que o forjador seja um dos valores aceitos
type Forjador = keyof typeof limites

export class AnelService {
  static async criarAnel(data: Anel) {
    const { forjadoPor } = data

    // Verifica se forjado por é um dos valores aceitos
    if (!(forjadoPor in limites)) {
        throw new Error(`⚠️ Forjador inválido: ${forjadoPor}`)
    }

    const totalCriados = await AnelRepository.count({ where: { forjadoPor } })

    if (totalCriados >= limites[forjadoPor as Forjador]) {
        throw new Error(`O limite de anéis para ${forjadoPor} foi atingido`)
    }

    const anel = AnelRepository.create(data)
    return await AnelRepository.find()
  }

  static async listarAneis() {
    return await AnelRepository.find()
  }

  static async atualizarAnel(id: number, data: Partial<Anel>) {
    await AnelRepository.update(id, data)
    return await AnelRepository.findOneBy({ id })
  }

  static async deletarAnel(id: number) {
    await AnelRepository.delete(id)
  }
}