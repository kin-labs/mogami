import * as Joi from 'joi'

export const validationSchema = Joi.object({
  API_URL: Joi.string().required().error(new Error(`API_URL is required.`)),
  AUTH_PASSWORD_ENABLED: Joi.boolean().default('false'),
  AUTH_USERS: Joi.string().default(''),
  COOKIE_NAME: Joi.string().default('__session'),
  DATABASE_URL: Joi.string().required(),
  GITHUB_ENABLED: Joi.boolean().default('false'),
  GOOGLE_ENABLED: Joi.boolean().default('false'),
  HOST: Joi.string().default('0.0.0.0'),
  JWT_SECRET: Joi.string().required(),
  LOG_COLOR: Joi.boolean().default('true'),
  LOG_JSON: Joi.boolean().default('false'),
  LOG_LEVEL: Joi.string()
    .equal('ALL', 'SILLY', 'FINE', 'VERBOSE', 'DEBUG', 'INFO', 'LOG', 'WARN', 'ERROR', 'FATAL', 'OFF')
    .default('INFO'),
  METRICS_ENABLED: Joi.boolean().default(false),
  METRICS_ENDPOINT_ENABLED: Joi.boolean().default(false),
  METRICS_PORT: Joi.number().default(0),
  NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
  PORT: Joi.number().default(3000),
  REDIS_HOST: Joi.string().default('localhost'),
  REDIS_PORT: Joi.number().default(6379),
  SOLANA_DEVNET_ENABLED: Joi.boolean().default(true),
  SOLANA_DEVNET_MINT_KIN: Joi.string().default(`*KinDesK3dYWo3R2wDk6Ucaf31tvQCCSYyL8Fuqp33GX,5,Kin`),
  SOLANA_DEVNET_RPC_ENDPOINT: Joi.string().default('devnet'),
  SOLANA_LOCAL_ENABLED: Joi.boolean().default(false),
  SOLANA_LOCAL_MINT_KIN: Joi.string().default(`*MoGaMuJnB3k8zXjBYBnHxHG47vWcW3nyb7bFYvdVzek,5,Kin`),
  SOLANA_LOCAL_RPC_ENDPOINT: Joi.string().default('http://localhost:8899'),
  SOLANA_MAINNET_ENABLED: Joi.boolean().default(false),
  SOLANA_MAINNET_MINT_KIN: Joi.string().default('*kinXdEcpDQeHPEuQnqmUgtYykqKGVFq6CeVX5iAHJq6,5,Kin'),
  SOLANA_MAINNET_RPC_ENDPOINT: Joi.string().default('mainnet-beta'),
})
