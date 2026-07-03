import { afterEach, describe, expect, it } from 'vitest';
import { getBaseUrl } from '@/utils/Helpers';

describe(getBaseUrl, () => {
  afterEach(() => {
    delete process.env.NEXT_PUBLIC_APP_URL;
  });

  it('returns the local dev URL when NEXT_PUBLIC_APP_URL is unset', () => {
    expect(getBaseUrl()).toBe('http://localhost:3000');
  });

  it('returns the configured app URL when NEXT_PUBLIC_APP_URL is set', () => {
    process.env.NEXT_PUBLIC_APP_URL = 'https://example.com';

    expect(getBaseUrl()).toBe('https://example.com');
  });
});
