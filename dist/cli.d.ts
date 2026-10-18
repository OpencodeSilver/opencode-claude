/**
 * CLI wrapper and detection utilities for Claude Code
 * Author: Ahmed (GEMTM)
 */
import type { ClaudeCliStatus, ClaudeExecutionOptions } from './types.js';
/**
 * Supported Claude models via Claude Code CLI
 */
export declare const CLAUDE_MODELS: readonly [{
    readonly id: "claude-3-7-sonnet";
    readonly name: "Claude 3.7 Sonnet (Hybrid Reasoning)";
    readonly contextWindow: 200000;
    readonly maxOutputTokens: 64000;
    readonly supportsThinking: true;
}, {
    readonly id: "claude-3-5-sonnet";
    readonly name: "Claude 3.5 Sonnet";
    readonly contextWindow: 200000;
    readonly maxOutputTokens: 8192;
    readonly supportsThinking: false;
}, {
    readonly id: "claude-3-5-haiku";
    readonly name: "Claude 3.5 Haiku";
    readonly contextWindow: 200000;
    readonly maxOutputTokens: 8192;
    readonly supportsThinking: false;
}, {
    readonly id: "claude-3-opus";
    readonly name: "Claude 3 Opus";
    readonly contextWindow: 200000;
    readonly maxOutputTokens: 4096;
    readonly supportsThinking: false;
}];
/**
 * Detect the installation and authentication status of Claude Code CLI
 */
export declare function getClaudeCliStatus(customBinary?: string): ClaudeCliStatus;
/**
 * Locate the claude CLI binary across platforms
 */
export declare function findClaudeBinary(): string | null;
/**
 * Spawns a prompt session with Claude Code CLI
 */
export declare function streamClaudeExecution(prompt: string, options: ClaudeExecutionOptions | undefined, onChunk: (chunk: string) => void, customBinary?: string): Promise<string>;
//# sourceMappingURL=cli.d.ts.map