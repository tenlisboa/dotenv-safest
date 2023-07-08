import type { DotenvConfigOutput, DotenvOptions } from 'dotenv';

type DotenvSafeOptions = DotenvOptions & {
    allowEmptyValues?: boolean;
    example?: string;
    path?: string;
    sample?: string;
};

/**
 * Loads environment variables from a .env file into process.env.
 * @param options
 * @returns {DotenvConfigOutput}
 */
export function config(options?: DotenvSafeOptions): DotenvConfigOutput;
