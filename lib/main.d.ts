import type { DotenvConfigOutput, DotenvConfigOptions } from 'dotenv';

export type DotenvSafeOptions = DotenvConfigOptions & {
    /**
     * Default: false
     * If true, the env should be defined in the .env file, but can be empty.
     */
    allowEmptyValues?: boolean;
    /**
     * Default: .env.example
     * The path to the example environment file.
     */
    example?: string;
    /**
     * Default: .env.example
     * The path to the example environment file.
     * @deprecated Use example instead.
     * @alias example
     */
    sample?: string;
};

/**
 * Loads environment variables from a .env file into process.env.
 * @param options
 * @returns {DotenvConfigOutput}
 */
export function config(options?: DotenvSafeOptions): DotenvConfigOutput;
