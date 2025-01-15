import dotenv from 'dotenv';

dotenv.config({ path: '/app/env/.env.local' });
export const backendUrl = `${process.env.NEXT_PUBLIC_HOST}:${process.env.NEXT_PUBLIC_PORT}/api`;