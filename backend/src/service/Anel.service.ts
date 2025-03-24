import { AnelRepository } from "../model/Anel.model"
import { Anel } from "../entities/Anel"
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid'
import path from 'path'
import fs from 'fs'

const ringImagesPath = path.join(__dirname, '../../../ringImages')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ringImagesPath);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
})

const fileFilter = (req: any, file: any, cb: any) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('⚠️ Apenas imagens são permitidas (jpeg, jpg, png, webp)'));
  }
}

export const upload = multer({ 
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB
})

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

  static async atualizarAnel(nome: string, data: Partial<Anel>) {
    const anel = await AnelRepository.findOne({ where: { nome } }); // Busca por nome
    
    if (!anel) {
      throw new Error(`⚠️ Nenhum anel encontrado com o nome ${nome}`);
    }

    // Verifica se está tentando alterar o forjador
    if (data.forjadoPor && data.forjadoPor !== anel.forjadoPor) {
      throw new Error('Não é permitido alterar o forjador do anel');
    }

    await AnelRepository.update({ nome }, data);
    const anelAtualizado = await AnelRepository.findOne({ where: { nome: data.nome || nome } });
    
    return { 
      status: 'success', 
      message: "🛠️ Anel atualizado com sucesso!", 
      anel: anelAtualizado 
    }
  }

  static async deletarAnel(nome: string) {
    const anel = await AnelRepository.findOne({ where: { nome } });

    if (!anel) {
      throw new Error(`⚠️ Nenhum anel encontrado com o nome ${nome}`);
    }

    // Deletar imagem associada
    if (anel.imagem) {
      const imagePath = path.join(ringImagesPath, path.basename(anel.imagem));
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }    

    await AnelRepository.delete({ nome });

    return { 
      status: 'success', 
      message: `🗑️ Anel "${nome}" deletado com sucesso!` 
    };
  }
}