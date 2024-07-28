import {
    PrismaClient
} from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient();
}

declare global {
    var prisma: ReturnType<typeof prismaClientSingleton>
}

export const initializePrisma = () => {
  globalThis.prisma = globalThis.prisma ?? prismaClientSingleton();
}