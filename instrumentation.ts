import { initializePrisma } from "./database/prismaClient";

export async function register() {
    if (process.env['NEXT_RUNTIME'] === 'nodejs')
        initializePrisma();
}