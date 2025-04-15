import { z } from "zod";

const envSchema = z.object({
	APP_NAME: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
