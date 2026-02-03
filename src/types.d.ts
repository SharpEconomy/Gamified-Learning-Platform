/// <reference types="@prisma/client" />

// Type assertions to help VSCode recognize Prisma types
declare module "@/lib/db" {
  export const db: import("@prisma/client").PrismaClient;
}

declare module "bcryptjs" {
  export function compare(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
  export function hash(
    data: string | Buffer,
    saltOrRounds: string | number,
  ): Promise<string>;
}

declare module "nodemailer" {
  export interface TransportOptions {
    host: string;
    port: number;
    secure: boolean;
    auth: {
      user: string;
      pass: string;
    };
  }

  export interface SendMailOptions {
    from: string;
    to: string;
    subject: string;
    html: string;
    text?: string;
  }

  export interface SentMessageInfo {
    accepted: string[];
    envelope: {
      from: string;
      to: string[];
    };
    messageId: string;
    response: string;
  }

  export function createTransport(options: TransportOptions): any;
}
