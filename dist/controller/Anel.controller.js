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
exports.AnelController = void 0;
const Anel_service_1 = require("../service/Anel.service");
class AnelController {
    static criar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const anel = yield Anel_service_1.AnelService.criarAnel(req.body);
                return res.status(201).json(anel);
            }
            catch (error) {
                // Garantindo que error só seja acessada se a mensagem for realmente um Error
                if (error instanceof Error) {
                    return res.status(400).json({ error: error.message });
                }
                return res.status(401).json({ error: 'Ocorreu um erro desconhecido' });
            }
        });
    }
    static listar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const aneis = yield Anel_service_1.AnelService.listarAneis();
            return res.json(aneis);
        });
    }
    static atualizar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const anel = yield Anel_service_1.AnelService.atualizarAnel(Number(id), req.body);
            return res.json(anel);
        });
    }
    static deletar(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resultado = yield Anel_service_1.AnelService.deletarAnel(Number(id));
            return res.status(200).json(resultado);
        });
    }
}
exports.AnelController = AnelController;
