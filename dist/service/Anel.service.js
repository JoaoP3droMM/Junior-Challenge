"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnelService = void 0;
const Anel_model_1 = require("../model/Anel.model");
const limites = { Elfos: 3, Anões: 7, Homens: 9, Sauron: 1 };
class AnelService {
    static criarAnel(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { forjadoPor } = data;
            // Verifica se forjado por é um dos valores aceitos
            if (!(forjadoPor in limites)) {
                throw new Error(`⚠️ Forjador inválido: ${forjadoPor}`);
            }
            const totalCriados = yield Anel_model_1.AnelRepository.count({ where: { forjadoPor } });
            if (totalCriados >= limites[forjadoPor]) {
                throw new Error(`🚫 O limite de anéis para ${forjadoPor} foi atingido`);
            }
            const anel = Anel_model_1.AnelRepository.create(data);
            yield Anel_model_1.AnelRepository.save(anel);
            return { status: 'success', message: '✅ Anel criado com sucesso!', anel };
        });
    }
    static listarAneis() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield Anel_model_1.AnelRepository.find();
        });
    }
    static atualizarAnel(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const anel = yield Anel_model_1.AnelRepository.findOne({ where: { id } });
            if (!anel) {
                throw new Error(`⚠️ Nenhum anel encontrado com seu ID ${id}`);
            }
            yield Anel_model_1.AnelRepository.update(id, data);
            const anelAtualizado = yield Anel_model_1.AnelRepository.findOne({ where: { id } });
            return { status: 'success', message: "🛠️ Anel atualizado com sucesso!", anel: anelAtualizado };
        });
    }
    static deletarAnel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const anel = yield Anel_model_1.AnelRepository.findOne({ where: { id } });
            if (!anel) {
                throw new Error(`⚠️ Nenhum anel encontrado com seu ID ${id}`);
            }
            yield Anel_model_1.AnelRepository.delete(id);
            return { status: 'success', message: `🗑️ Anel ID ${id} deletado com sucesso!` };
        });
    }
}
exports.AnelService = AnelService;
