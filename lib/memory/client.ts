import 'server-only';
import { ZepClient } from '@getzep/zep-cloud';

const apiKey = process.env.ZEP_API_KEY;
if (!apiKey) {
  throw new Error('ZEP_API_KEY environment variable is not set.');
}

const memoryClient = new ZepClient({
  apiKey,
});

export { memoryClient };
