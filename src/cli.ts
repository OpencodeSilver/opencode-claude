/**
 * CLI wrapper and detection utilities for Claude Code
 * Author: Ahmed (GEMTM)
 */

import { execSync, spawn, type ChildProcessWithoutNullStreams } from 'node:child_process';
import * as fs from 'node:fs';
import * as os from 'node:os';
import * as path from 'node:path';
import type { ClaudeCliStatus, ClaudeExecutionOptions } from './types.js';

/**
 * Supported Claude models via Claude Code CLI
 */
export const CLAUDE_MODELS = [
  {
    id: 'claude-3-7-sonnet',
    name: 'Claude 3.7 Sonnet (Hybrid Reasoning)',
    contextWindow: 200000,
    maxOutputTokens: 64000,
    supportsThinking: true,
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    contextWindow: 200000,
    maxOutputTokens: 8192,
    supportsThinking: false,
  },
  {
    id: 'claude-3-5-haiku',
    name: 'Claude 3.5 Haiku',
    contextWindow: 200000,
    maxOutputTokens: 8192,
    supportsThinking: false,
  },
  {
    id: 'claude-3-opus',
    name: 'Claude 3 Opus',
    contextWindow: 200000,
    maxOutputTokens: 4096,
    supportsThinking: false,
  },
] as const;

/**
 * Detect the installation and authentication status of Claude Code CLI
 */
export function getClaudeCliStatus(customBinary?: string): ClaudeCliStatus {
  const binary = customBinary || findClaudeBinary();

  if (!binary) {
    return {
      isInstalled: false,
      isAuthenticated: false,
      error: 'Claude CLI (@anthropic-ai/claude-code) is not found in PATH.',
    };
  }

  let version: string | undefined;
  try {
    const versionOutput = execSync(`"${binary}" --version`, {
      encoding: 'utf-8',
      timeout: 5000,
      stdio: ['pipe', 'pipe', 'pipe'],
    });
    version = versionOutput.trim();
  } catch {
    version = 'installed';
  }

  const authInfo = checkClaudeConfigAuth();

  return {
    isInstalled: true,
    binaryPath: binary,
    version,
    isAuthenticated: authInfo.isAuthenticated,
    userEmail: authInfo.userEmail,
  };
}

/**
 * Locate the claude CLI binary across platforms
 */
export function findClaudeBinary(): string | null {
  const isWindows = process.platform === 'win32';
  const binaryName = isWindows ? 'claude.cmd' : 'claude';
  const fallbackName = isWindows ? 'claude.exe' : 'claude';

  // Check PATH using platform-specific lookup
  try {
    const lookupCmd = isWindows ? `where ${binaryName}` : `which ${binaryName}`;
    const output = execSync(lookupCmd, { encoding: 'utf-8', timeout: 3000, stdio: ['pipe', 'pipe', 'pipe'] });
    const firstLine = output.split(/\r?\n/).map((s: string) => s.trim()).filter(Boolean)[0];
    if (firstLine && fs.existsSync(firstLine)) {
      return firstLine;
    }
  } catch {
    if (isWindows) {
      try {
        const output = execSync(`where ${fallbackName}`, { encoding: 'utf-8', timeout: 3000, stdio: ['pipe', 'pipe', 'pipe'] });
        const firstLine = output.split(/\r?\n/).map((s: string) => s.trim()).filter(Boolean)[0];
        if (firstLine && fs.existsSync(firstLine)) {
          return firstLine;
        }
      } catch {
        // Continue to explicit directory checks
      }
    }
  }

  // Check common npm global locations
  const home = os.homedir();
  const candidates: string[] = [];

  if (isWindows) {
    const appData = process.env.APPDATA || path.join(home, 'AppData', 'Roaming');
    const localAppData = process.env.LOCALAPPDATA || path.join(home, 'AppData', 'Local');
    candidates.push(
      path.join(appData, 'npm', 'claude.cmd'),
      path.join(localAppData, 'npm', 'claude.cmd'),
      path.join(home, '.bun', 'bin', 'claude.cmd'),
      path.join(home, 'AppData', 'Local', 'pnpm', 'claude.cmd')
    );
  } else {
    candidates.push(
      '/usr/local/bin/claude',
      '/opt/homebrew/bin/claude',
      path.join(home, '.npm-global', 'bin', 'claude'),
      path.join(home, '.bun', 'bin', 'claude'),
      path.join(home, '.nvm', 'current', 'bin', 'claude')
    );
  }

  for (const candidate of candidates) {
    if (fs.existsSync(candidate)) {
      return candidate;
    }
  }

  return null;
}

/**
 * Check if the user is authenticated in Claude Code CLI via ~/.claude.json or config
 */
function checkClaudeConfigAuth(): { isAuthenticated: boolean; userEmail?: string } {
  const home = os.homedir();
  const configLocations = [
    path.join(home, '.claude.json'),
    path.join(home, '.claude', 'config.json'),
    path.join(home, '.config', 'claude', 'config.json'),
  ];

  for (const configPath of configLocations) {
    if (fs.existsSync(configPath)) {
      try {
        const raw = fs.readFileSync(configPath, 'utf-8');
        const parsed = JSON.parse(raw);
        if (parsed.oauthAccount || parsed.sessionToken || parsed.primaryApiKey || parsed.hasCompletedOnboarding) {
          return {
            isAuthenticated: true,
            userEmail: parsed.oauthAccount?.email || parsed.email || undefined,
          };
        }
      } catch {
        // Ignore parse error and check next
      }
    }
  }

  return { isAuthenticated: false };
}

/**
 * Spawns a prompt session with Claude Code CLI
 */
export function streamClaudeExecution(
  prompt: string,
  options: ClaudeExecutionOptions = {},
  onChunk: (chunk: string) => void,
  customBinary?: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    const binary = customBinary || findClaudeBinary();
    if (!binary) {
      reject(new Error('Claude Code CLI binary not found. Please install via: npm install -g @anthropic-ai/claude-code'));
      return;
    }

    const args: string[] = ['--print', prompt];

    if (options.systemPrompt) {
      args.unshift('--system-prompt', options.systemPrompt);
    }

    const child: ChildProcessWithoutNullStreams = spawn(binary, args, {
      shell: true,
      stdio: ['pipe', 'pipe', 'pipe'],
    });

    let fullOutput = '';
    let errorOutput = '';

    child.stdout.on('data', (data: Buffer | string) => {
      const text = data.toString('utf-8');
      fullOutput += text;
      onChunk(text);
    });

    child.stderr.on('data', (data: Buffer | string) => {
      errorOutput += data.toString('utf-8');
    });

    child.on('close', (code: number | null) => {
      if (code === 0) {
        resolve(fullOutput);
      } else {
        reject(new Error(`Claude CLI exited with code ${code}: ${errorOutput}`));
      }
    });

    child.on('error', (err: Error) => {
      reject(err);
    });

    if (options.abortSignal) {
      options.abortSignal.addEventListener('abort', () => {
        child.kill();
        reject(new Error('Claude execution aborted'));
      });
    }
  });
}
