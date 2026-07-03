import type { UserConfig } from '@commitlint/types';

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'chore',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'build',
        'ci',
        'revert',
        'hotfix',
        'asap',
      ],
    ],
    'header-max-length': [2, 'always', 200],
  },
  ignores: [(message) => message.startsWith('chore: bump') || message.startsWith('Updating')], // Ignore dependabot commits
};

export default Configuration;
