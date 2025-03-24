# Gerenciador de Anéis do Poder

Uma aplicação full stack para criar, editar, deletar e visualizar os lendários anéis do poder. Essa aplicação foi construída utilizando **Node.js**, **Express**, **TypeORM** e **PostgreSQL** no backend, e possui um frontend com três telas principais:  
- **Boas-vindas**: Tela inicial que, ao ser clicada, redireciona para a visualização. Caso nenhum anel esteja cadastrado, direciona para a tela de criação.  
- **Visualização**: Exibe os anéis cadastrados e seus respectivos dados.  
- **Criação**: Permite criar novos anéis, bem como alterar e deletar anéis já cadastrados.

---

## Sumário

- [Requisitos](#requisitos)
- [Instalação e Configuração do Banco de Dados](#instalação-e-configuração-do-banco-de-dados)
- [Configuração do Backend](#configuração-do-backend)
- [Configuração do Frontend](#configuração-do-frontend)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Endpoints da API](#endpoints-da-api)
- [Como Executar a Aplicação](#como-executar-a-aplicação)
- [Notas Finais](#notas-finais)

---

## Requisitos

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/download/)
- Gerenciador de pacotes (npm ou yarn)

---

## Instalação e Configuração do Banco de Dados

1. **Instale o PostgreSQL:**  
   Acesse [https://www.postgresql.org/download/](https://www.postgresql.org/download/) e siga as instruções para o seu sistema operacional.  
   Durante a instalação, defina uma senha para o usuário `postgres`.

2. **Verifique se o serviço está rodando:**  
   No Windows, abra os Serviços (pesquise por "Serviços" no menu iniciar) e certifique-se de que o serviço **PostgreSQL-x64-17 - PostgreSQL Server 17** está em execução.

3. **Crie o banco de dados:**  
   Abra o terminal como administrador e execute:
   ```bash
   psql -U postgres
   ```
   Informe a senha definida na instalação.  
   Ao entrar na linha de comando SQL, execute:
   ```sql
   CREATE DATABASE rings;
   ```
   Isso criará o banco de dados necessário para a aplicação.

---

## Configuração do Backend

O backend foi desenvolvido utilizando Node.js, Express e TypeORM para gerenciar a comunicação com o banco de dados PostgreSQL. A seguir, uma breve explicação dos principais arquivos:

### server.ts
Responsável por:
- Importar e configurar dependências (Express, CORS, TypeORM, etc.).
- Criar o diretório para armazenar as imagens dos anéis, se não existir.
- Configurar os logs de requisições.
- Definir as rotas da API e o caminho para servir as imagens.
- Inicializar a conexão com o banco de dados e iniciar o servidor na porta **3000**.

```typescript
import 'reflect-metadata'
import express from 'express'
import cors from 'cors'
import { AppDataSource } from './ormconfig'
import anelRoutes from './routes/AnelRoutes'
import path from 'path'
import fs from 'fs'

const app = express()
const ringImagesPath = path.join(__dirname, '../../ringImages')

// Cria o diretório se não existir
if (!fs.existsSync(ringImagesPath)) {
    fs.mkdirSync(ringImagesPath, { recursive: true })
}

app.use(cors({
    origin: 'http://localhost:5173', // URL do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}))

// Log de requisições
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next();
})

app.use(express.json())
app.use('/api', anelRoutes)
app.use('/ring-images', express.static(ringImagesPath));

AppDataSource.initialize()
    .then(() => {
        console.log('🔌 Banco de dados conectado!')
        app.listen(3000, () => console.log('🎢 Servidor rodando na porta 3000'))
    })
    .catch((error) => console.log(error))
```

### service.ts
Responsável por:
- Gerenciar a lógica de negócio para criação, listagem, atualização e deleção de anéis.
- Configurar o **multer** para upload de imagens, definindo storage, filtros e limites.
- Verificar limites de criação de anéis conforme o forjador (Elfos, Anões, Homens, Sauron).

```typescript
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

type Forjador = keyof typeof limites

export class AnelService {
  static async criarAnel(data: Anel) {
    const { forjadoPor } = data

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
    const anel = await AnelRepository.findOne({ where: { nome } });
    
    if (!anel) {
      throw new Error(`⚠️ Nenhum anel encontrado com o nome ${nome}`);
    }

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
```

### controller.ts
Responsável por:
- Definir os métodos que lidam com as requisições HTTP: criar, listar, atualizar e deletar anéis.
- Processar o upload da imagem antes de criar o anel e tratar os erros de forma apropriada.

```typescript
import { Request, Response } from "express"
import { AnelService } from "../service/Anel.service"
import { upload } from '../service/Anel.service';

export class AnelController {
  static async criar(req: Request, res: Response) {
    try { 
      upload.single('imagem')(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: err.message });
        }

        const imagePath = req.file ? `/ring-images/${req.file.filename}` : '';
        const anelData = { ...req.body, imagem: imagePath };

        const anel = await AnelService.criarAnel(anelData)
        return res.status(201).json(anel)
      })
    } catch (error) {
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
    const { nome } = req.params;
    try {
      const anel = await AnelService.atualizarAnel(nome, req.body);
      return res.json(anel);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno' });
    }
  }

  static async deletar(req: Request, res: Response) {
    const { nome } = req.params;
    try {
      const resultado = await AnelService.deletarAnel(nome);
      return res.status(200).json(resultado);
    } catch (error) {
      if (error instanceof Error) {
        return res.status(400).json({ error: error.message });
      }
      return res.status(500).json({ error: 'Erro interno' });
    }
  }
}
```

### model.ts
Define o repositório para a entidade **Anel** utilizando o TypeORM.
```typescript
import { AppDataSource } from "../ormconfig";
import { Anel } from "../entities/Anel";

export const AnelRepository = AppDataSource.getRepository(Anel)
```

---

## Configuração do Frontend

O frontend conta com três telas:

1. **Boas-vindas:**  
   - Tela inicial com uma mensagem de boas-vindas.
   - Ao clicar, redireciona para a tela de visualização.
   - Se não houver nenhum anel cadastrado, redireciona automaticamente para a tela de criação.

2. **Visualização:**  
   - Exibe uma lista de anéis com os respectivos dados (nome, imagem, forjador, etc.).

3. **Criação:**  
   - Permite o cadastro de novos anéis.
   - Também possibilita a alteração e deleção dos anéis já criados.

> **Dica:** Certifique-se de que a URL base do backend (por exemplo, `http://localhost:3000/api`) esteja configurada corretamente nas chamadas de API do frontend.

---

## Estrutura do Projeto

Uma estrutura de pastas sugerida para este projeto poderia ser:

```
/project-root
│
├── /backend
│   ├── /src
│   │   ├── /controllers
│   │   │     └── AnelController.ts
│   │   ├── /entities
│   │   │     └── Anel.ts
│   │   ├── /model
│   │   │     └── Anel.model.ts
│   │   ├── /routes
│   │   │     └── AnelRoutes.ts
│   │   ├── /service
│   │   │     └── Anel.service.ts
│   │   ├── ormconfig.ts
│   │   └── server.ts
│   └── package.json
│
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   │     └── TelaBoasVindas.tsx
│   │   │     └── TelaVisualizacao.tsx
│   │   │     └── TelaCriacao.tsx
│   │   └── App.tsx
│   └── package.json
│
└── /ringImages  // Pasta para armazenar as imagens dos anéis (criada automaticamente)
```

---

## Endpoints da API

- **POST** `/api/`  
  Cria um novo anel. (Utiliza upload de imagem via campo `imagem`)

- **GET** `/api/`  
  Lista todos os anéis cadastrados.

- **PUT** `/api/:nome`  
  Atualiza os dados de um anel específico (identificado pelo nome).

- **DELETE** `/api/:nome`  
  Deleta um anel específico (identificado pelo nome).

---

## Como Executar a Aplicação

### Backend

1. **Instalar dependências:**  
   No diretório `backend`, execute:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

2. **Configurar o TypeORM:**  
   Verifique o arquivo `ormconfig.ts` para configurar a conexão com o PostgreSQL (host, usuário, senha, banco de dados `rings`, etc.).

3. **Iniciar o servidor:**  
   Execute:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```
   O servidor iniciará na porta **3000** e conectará ao banco de dados.

### Frontend

1. **Instalar dependências:**  
   No diretório `frontend`, execute:
   ```bash
   npm install
   ```
   ou
   ```bash
   yarn install
   ```

2. **Iniciar a aplicação:**  
   Execute:
   ```bash
   npm run dev
   ```
   ou
   ```bash
   yarn dev
   ```
   A aplicação será iniciada (ex.: na porta **5173**) e deverá se comunicar com o backend configurado.

---

## Notas Finais

- **Uploads de Imagens:** As imagens dos anéis são armazenadas na pasta `/ringImages`. Caso essa pasta não exista, ela será criada automaticamente ao iniciar o servidor.
- **Logs:** O servidor registra cada requisição no console, facilitando a identificação de problemas durante o desenvolvimento.
- **Validações:** O backend realiza validações para garantir que os anéis sejam criados apenas dentro dos limites permitidos para cada tipo de forjador (Elfos, Anões, Homens, Sauron).

Com essas instruções, você terá um ambiente configurado para iniciar o desenvolvimento e testes da aplicação. Caso tenha dúvidas ou necessite de melhorias, sinta-se à vontade para ajustar conforme necessário.