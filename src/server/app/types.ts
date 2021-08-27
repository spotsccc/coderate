export type AppConfig = Readonly<{
	port: string
	db_host: string
	db_port: string
	db_user_name: string
	db_password: string
	cookie_secret: string
	jwt_secret: string
}>
