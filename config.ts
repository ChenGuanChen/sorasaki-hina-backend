import dotenv from 'dotenv';

dotenv.config();

export const config = {
 	token: process.env.BOT_TOKEN!,
 	clientId: process.env.BOT_ID!,
 	guildId: process.env.GUILD_ID!,
	AllowedID: [process.env.MY_ID!, process.env.ME_ID!],
	lock_channel: (process.env.CHANNEL_LOCK == 'true') ?? false,
	maintaining: (process.env.MAINTAINING == 'true') ?? false,
 	nickname: `hina`,
 	logger: {
 		logFile: `test.log`,
 	},
	minio: {
		bucket: 'hina-files',//'hina-bot-files',
		client: {
		  endPoint: process.env.MINIO_ENDPOINT ?? 'minio.konchin.com',
		  useSSL: (process.env.MINIO_USESSL == 'true') ?? false,
		  port: (process.env.MINIO_PORT as unknown as number) ?? 9000,
		  accessKey: process.env.MINIO_ACCESSKEY ?? '',
		  secretKey: process.env.MINIO_SECRETKEY ?? '',
		},
		handlePath: ""
	},
	mongodb: {
		host: process.env.MONGODB_HOST ?? '127.0.0.1',
    	port: process.env.MONGODB_PORT ?? 27017,
    	dbname: process.env.MONGODB_DB ?? 'hina',
    	user: process.env.MONGODB_USER ?? 'hina',
    	pass: process.env.MONGODB_PASS!,		
	},
	http: {
		port: 7020
	}
}