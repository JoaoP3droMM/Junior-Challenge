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
        throw new Error(`🚫 O limite de anéis para ${forjadoPor} foi atingido`)
    }

    const anel = AnelRepository.create(data)
    await AnelRepository.save(anel)

    return { status: 'success', message: '✅ Anel criado com sucesso!', anel }
  }

  static async listarAneis() {
    return await AnelRepository.find()
  }

  static async atualizarAnel(id: number, data: Partial<Anel>) {
    const anel = await AnelRepository.findOne({ where: { id } })
    
    if (!anel) {
      throw new Error(`⚠️ Nenhum anel encontrado com seu ID ${id}`)
    }

    await AnelRepository.update(id, data)
    const anelAtualizado = await AnelRepository.findOne({ where: { id } })
    
    return { status: 'success', message: "🛠️ Anel atualizado com sucesso!", anel: anelAtualizado }
  }

  static async deletarAnel(id: number) {
    const anel = await AnelRepository.findOne({ where: { id } })

    if (!anel) {
      throw new Error(`⚠️ Nenhum anel encontrado com seu ID ${id}`)
    }

    await AnelRepository.delete(id)

    return { status: 'success', message: `🗑️ Anel ID ${id} deletado com sucesso!` }
  }
}