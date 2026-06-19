/**
 * Network-Specific Prompt Selector
 * This module combines base prompts with network-specific prompts
 * based on the selected blockchain
 */

/**
 * Network-Specific Prompt Selector
 * This module combines base prompts with network-specific prompts
 * based on the selected blockchain
 */

import { basePrompt, editModeRules, targetedEditModeRules, codeCompletionRules } from './base-prompt';
import { solanaPrompt } from './solana-prompt';
import { celoPrompt } from './celo-prompt';
import { ThemeOption } from '@/app/context/ThemeContext';
import { stellarPrompt } from './stellar-prompt';

export type BlockchainNetwork = 'solana' | 'celo' | 'stellar';

export interface PromptOptions {
  conversationContext?: string;
  isEdit?: boolean;
  editContext?: any;
  theme?: ThemeOption;
}

/**
 * Get the complete system prompt for a specific blockchain network
 * @param chain - The blockchain network ('solana' | 'celo' | 'stellar')
 * @param options - Additional prompt configuration options
 * @returns Complete system prompt string
 */
export function getNetworkPrompt(
  chain: BlockchainNetwork,
  options: PromptOptions = {}
): string {
  const { conversationContext = '', isEdit = false, editContext } = options;

  // Select the appropriate network-specific prompt
  const networkPrompt = chain === 'solana' ? solanaPrompt
    : chain === 'stellar' ? stellarPrompt
    : celoPrompt;

  // Build the complete system prompt
  let systemPrompt = basePrompt;

  // Add conversation context if provided
  if (conversationContext) {
    systemPrompt += `\n\n${conversationContext}`;
  }

  // Add network-specific instructions
  systemPrompt += `\n\n${networkPrompt}`;

  // Append selected theme to prompt if provided
  if (options.theme) {
    systemPrompt += `\n\nUser selected theme: ${options.theme}`;
  }
  return systemPrompt;
}

/**
 * Get a list of available blockchain networks
 * @returns Array of supported blockchain network identifiers
 */
export function getAvailableNetworks(): BlockchainNetwork[] {
  return ['solana', 'celo', 'stellar'];
}

/**
 * Validate if a given string is a supported blockchain network
 * @param network - The network string to validate
 * @returns True if the network is supported
 */
export function isValidNetwork(network: string): network is BlockchainNetwork {
  return ['solana', 'celo', 'stellar'].includes(network);
}

/**
 * Get display name for a blockchain network
 * @param chain - The blockchain network
 * @returns Human-readable network name
 */
export function getNetworkDisplayName(chain: BlockchainNetwork): string {
  const displayNames: Record<BlockchainNetwork, string> = {
    solana: 'Solana',
    celo: 'Celo',
    stellar: 'Stellar',
  };
  return displayNames[chain];
}

/**
 * Get description for a blockchain network
 * @param chain - The blockchain network
 * @returns Network description
 */
export function getNetworkDescription(chain: BlockchainNetwork): string {
  const descriptions: Record<BlockchainNetwork, string> = {
    solana: 'Ultra-fast, low-fee blockchain for high-performance dApps',
    celo: 'Mobile-first, carbon-negative blockchain focused on financial inclusion',
    stellar: 'Stellar blockchain with Soroban smart contracts and wallet integrations',
  };
  return descriptions[chain];
}

// Re-export prompt components for direct use if needed
export { basePrompt, editModeRules, targetedEditModeRules, codeCompletionRules } from './base-prompt';
export { solanaPrompt } from './solana-prompt';
export { celoPrompt } from './celo-prompt';
export { stellarPrompt } from './stellar-prompt';

















