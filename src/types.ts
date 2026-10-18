/**
 * Type definitions for @opencodesilver/opencode-claude
 * Author: Ahmed (GEMTM)
 */

export interface ClaudeCodePluginOptions {
  /** Custom path to the Claude CLI binary (optional) */
  binaryPath?: string;
  /** Working directory for CLI execution */
  cwd?: string;
  /** Environment variables to pass to the CLI */
  env?: Record<string, string>;
  /** Timeout in milliseconds for CLI commands */
  timeout?: number;
  /** Whether extended thinking mode is enabled for supported models */
  extendedThinking?: boolean;
}

export interface ClaudeCliStatus {
  isInstalled: boolean;
  version?: string;
  binaryPath?: string;
  isAuthenticated: boolean;
  userEmail?: string;
  error?: string;
}

export interface ClaudeModelDefinition {
  id: string;
  name: string;
  contextWindow: number;
  maxOutputTokens: number;
  supportsThinking?: boolean;
}

export interface ClaudeMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ClaudeExecutionOptions {
  model?: string;
  temperature?: number;
  systemPrompt?: string;
  thinkingBudget?: number;
  extendedThinking?: boolean;
  abortSignal?: AbortSignal;
}
