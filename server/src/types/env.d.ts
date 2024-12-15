declare namespace NodeJS {
    interface ProcessEnv {
        PORT: number;
        FRONTEND_URL?: string;
        MONGODB_URI: string;
        SESSION_SECRET: string;
        NODE_ENV?: "development" | "production";
    }
}