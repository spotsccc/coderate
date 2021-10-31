export const createConnectionString = (cfg) => `postgresql://${cfg.db_user_name}:${cfg.db_password}@${cfg.db_host}:${cfg.db_port}/postgres`;
//# sourceMappingURL=db.js.map