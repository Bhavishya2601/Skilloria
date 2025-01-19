declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        FRONTEND_URL?: string;
        MONGODB_URI: string;
        SESSION_SECRET: string;
        NODE_ENV?: "development" | "production";
        EMAIL: string;
        EMAIL_PASSWORD: string;
        SALT_ROUNDS: string;
        JWT_SECRET: string;
        GOOGLE_CLIENT_ID: string;
        GOOGLE_CLIENT_SECRET: string;
        GOOGLE_REDIRECT_URL: string;
    }
}