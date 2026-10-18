/**
 * @opencodesilver/opencode-claude
 * OpencodeSilver integration plugin for Claude Code CLI (Claude Pro/Max without API keys)
 *
 * Author: Ahmed (GEMTM)
 * Repository: https://github.com/OpencodeSilver/opencode-claude
 */

import {
  CLAUDE_MODELS,
  findClaudeBinary,
  getClaudeCliStatus,
  streamClaudeExecution,
} from './cli.js';
import type { ClaudeCodePluginOptions, ClaudeExecutionOptions } from './types.js';

export * from './cli.js';
export * from './types.js';

export const PLUGIN_ID = 'opencode-claude';
export const PACKAGE_NAME = '@opencodesilver/opencode-claude';
export const PROVIDER_ID = 'claude-code';
export const VERSION = '3.0.0';

/**
 * Creates the Provider configuration for OpencodeSilver / OpenCode
 */
export function createClaudeCodeProvider(options: ClaudeCodePluginOptions = {}) {
  return {
    id: PROVIDER_ID,
    name: 'Claude Code',
    description: 'Use your Claude Pro/Max plan through the Claude Code CLI — no API keys required.',
    version: VERSION,
    author: 'Ahmed (GEMTM)',
    homepage: 'https://github.com/OpencodeSilver/opencode-claude',
    models: CLAUDE_MODELS.map((m) => ({
      id: m.id,
      name: m.name,
      contextLength: m.contextWindow,
      maxOutputTokens: m.maxOutputTokens,
      supportsThinking: m.supportsThinking,
    })),
    checkStatus: () => getClaudeCliStatus(options.binaryPath),
    async execute(prompt: string, execOptions: ClaudeExecutionOptions = {}) {
      return streamClaudeExecution(
        prompt,
        {
          ...execOptions,
          extendedThinking: execOptions.thinkingBudget ? true : options.extendedThinking,
        },
        () => {},
        options.binaryPath
      );
    },
    async *stream(prompt: string, execOptions: ClaudeExecutionOptions = {}) {
      const queue: string[] = [];
      let finished = false;
      let error: Error | null = null;
      let notify: (() => void) | null = null;

      streamClaudeExecution(
        prompt,
        execOptions,
        (chunk) => {
          queue.push(chunk);
          if (notify) {
            notify();
            notify = null;
          }
        },
        options.binaryPath
      )
        .catch((err) => {
          error = err;
        })
        .finally(() => {
          finished = true;
          if (notify) {
            notify();
            notify = null;
          }
        });

      while (!finished || queue.length > 0) {
        if (queue.length > 0) {
          yield queue.shift()!;
        } else if (!finished) {
          await new Promise<void>((resolve) => {
            notify = resolve;
          });
        }
      }

      if (error) {
        throw error;
      }
    },
  };
}

/**
 * Opencode Plugin Default Export
 */
export default function opencodeClaudePlugin(options: ClaudeCodePluginOptions = {}) {
  return {
    name: PACKAGE_NAME,
    version: VERSION,
    provider: createClaudeCodeProvider(options),
    init(context?: unknown) {
      const status = getClaudeCliStatus(options.binaryPath);
      return {
        providerId: PROVIDER_ID,
        status,
        ready: status.isInstalled && status.isAuthenticated,
      };
    },
  };
}
