import 'server-only';
import { memoryClient } from './client';

export interface MemoryMessage {
  role: 'user' | 'assistant';
  content: string;
  metadata?: {
    messageId: string;
    timestamp: string;
  };
}

/**
 * Create a user in the memory system
 */
export async function createUser(userId: string, email: string): Promise<void> {
  try {
    await memoryClient.user.add({
      userId,
      email,
    });
  } catch (error) {
    console.error('Error creating user in memory system:', error);
    throw error;
  }
}

/**
 * Create a thread in the memory system
 */
export async function createThread(
  threadId: string,
  userId: string,
): Promise<void> {
  try {
    await memoryClient.thread.create({
      threadId,
      userId,
    });
  } catch (error) {
    console.error('Error creating thread in memory system:', error);
    throw error;
  }
}

/**
 * Add messages to a thread in the memory system
 */
export async function addMessages(
  threadId: string,
  messages: MemoryMessage[],
): Promise<void> {
  if (messages.length === 0) return;

  try {
    await memoryClient.thread.addMessages(threadId, {
      messages,
    });
  } catch (error) {
    console.error('Error adding messages to memory system:', error);
    throw error;
  }
}

/**
 * Get user context from a thread
 */
export async function getUserContext(
  threadId: string,
  mode: 'basic' | 'summary' = 'basic',
): Promise<string | undefined> {
  try {
    const response = await memoryClient.thread.getUserContext(threadId, {
      mode,
    });
    return response.context;
  } catch (error) {
    console.error('Error getting user context from memory system:', error);
    return undefined;
  }
}
