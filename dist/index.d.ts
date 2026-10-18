/**
 * @opencodesilver/opencode-claude
 * OpencodeSilver integration plugin for Claude Code CLI (Claude Pro/Max without API keys)
 *
 * Author: Ahmed (GEMTM)
 * Repository: https://github.com/OpencodeSilver/opencode-claude
 */
import type { ClaudeCodePluginOptions, ClaudeExecutionOptions } from './types.js';
export * from './cli.js';
export * from './types.js';
export declare const PLUGIN_ID = "opencode-claude";
export declare const PACKAGE_NAME = "@opencodesilver/opencode-claude";
export declare const PROVIDER_ID = "claude-code";
export declare const VERSION = "3.0.0";
/**
 * Creates the Provider configuration for OpencodeSilver / OpenCode
 */
export declare function createClaudeCodeProvider(options?: ClaudeCodePluginOptions): {
    id: string;
    name: string;
    description: string;
    version: string;
    author: string;
    homepage: string;
    models: {
        id: "claude-3-7-sonnet" | "claude-3-5-sonnet" | "claude-3-5-haiku" | "claude-3-opus";
        name: "Claude 3.7 Sonnet (Hybrid Reasoning)" | "Claude 3.5 Sonnet" | "Claude 3.5 Haiku" | "Claude 3 Opus";
        contextLength: 200000;
        maxOutputTokens: 64000 | 8192 | 4096;
        supportsThinking: boolean;
    }[];
    checkStatus: () => import("./types.js").ClaudeCliStatus;
    execute(prompt: string, execOptions?: ClaudeExecutionOptions): Promise<string>;
    stream(prompt: string, execOptions?: ClaudeExecutionOptions): AsyncGenerator<string, void, unknown>;
};
/**
 * Opencode Plugin Default Export
 */
export default function opencodeClaudePlugin(options?: ClaudeCodePluginOptions): {
    name: string;
    version: string;
    provider: {
        id: string;
        name: string;
        description: string;
        version: string;
        author: string;
        homepage: string;
        models: {
            id: "claude-3-7-sonnet" | "claude-3-5-sonnet" | "claude-3-5-haiku" | "claude-3-opus";
            name: "Claude 3.7 Sonnet (Hybrid Reasoning)" | "Claude 3.5 Sonnet" | "Claude 3.5 Haiku" | "Claude 3 Opus";
            contextLength: 200000;
            maxOutputTokens: 64000 | 8192 | 4096;
            supportsThinking: boolean;
        }[];
        checkStatus: () => import("./types.js").ClaudeCliStatus;
        execute(prompt: string, execOptions?: ClaudeExecutionOptions): Promise<string>;
        stream(prompt: string, execOptions?: ClaudeExecutionOptions): AsyncGenerator<string, void, unknown>;
    };
    init(context?: unknown): {
        providerId: string;
        status: import("./types.js").ClaudeCliStatus;
        ready: boolean;
    };
};
//# sourceMappingURL=index.d.ts.map