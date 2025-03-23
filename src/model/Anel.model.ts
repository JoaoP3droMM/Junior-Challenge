import { AppDataSource } from "../../ormconfig";
import { Anel } from "../entities/Anel";

export const AnelRepository = AppDataSource.getRepository(Anel)