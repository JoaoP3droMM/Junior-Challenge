import { AnelRepository } from "../model/Anel.model";
import { Anel } from "../entities/Anel";

const limites = { Elfos: 3, Anões: 7, Homens: 9, Sauron: 1 }

export class AnelService {
  static async criarAnel(data: Anel) {
    const { forjadoPor } = data;
    const totalCriados = await AnelRepository.count({ where: { forjadoPor } });

    if (limites[forjadoPor] !== undefined && totalCriados >= limites[forjadoPor]) {
      throw new Error(`O limite de anéis para ${forjadoPor} foi atingido.`);
    }

    const anel = AnelRepository.create(data);
    return await AnelRepository.save(anel);
  }

  static async listarAneis() {
    return await AnelRepository.find();
  }

  static async atualizarAnel(id: number, data: Partial<Anel>) {
    await AnelRepository.update(id, data);
    return await AnelRepository.findOneBy({ id });
  }

  static async deletarAnel(id: number) {
    await AnelRepository.delete(id);
  }
}