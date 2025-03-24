"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnelRepository = void 0;
const ormconfig_1 = require("../ormconfig");
const Anel_1 = require("../entities/Anel");
exports.AnelRepository = ormconfig_1.AppDataSource.getRepository(Anel_1.Anel);
