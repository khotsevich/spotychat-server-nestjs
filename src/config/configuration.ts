export default () => ({
  server: {
    port: process.env.PORT || 3000,
  },
  spotify: {
    clientId: 'f60fd30aa7ec4bc79aef6db51eafbbb3',
    clientSecret: 'cc506bc4cdf84722aef749c119f01e71',
    redirectUri: 'exp://127.0.0.1:19000',
  },
  typeorm: {
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOSTNAME || 'localhost',
    port: +process.env.DB_PORT || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
    database: process.env.DB_NAME || 'spotychat',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    synchronize: !!process.env.TYPEORM_SYNC || true,
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'secret',
    signOptions: { expiresIn: 3600 },
  },
});
