// env.ts
export interface ENVType {
  DATABASE_URL: string;
  JWT_SECRET: string;
  ENTRY_KEY: string;
  FOOD_KEY: string;
}

function getEnv(name: string): string {
  const val = process.env[name];
  if (!val) {
    throw new Error(`${name} not declared in .env`);
  }
  return val;
}

const env = {
  DATABASE_URL: getEnv("DATABASE_URL"),
  JWT_SECRET: getEnv("JWT_SECRET"),
  ENTRY_KEY: getEnv("ENTRY_KEY"),
  FOOD_KEY: getEnv("FOOD_KEY"),
}

export default env;
