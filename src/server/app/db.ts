import { AppConfig } from './types'

export const createConnectionString = (cfg: AppConfig) =>
	`postgresql://${cfg.db_user_name}:${cfg.db_password}@${cfg.db_host}:${cfg.db_port}`
