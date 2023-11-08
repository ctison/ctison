export interface FavoriteTool {
  name: string;
  category: ToolCategory;
  description: string;
  link: string;
}

export type ToolCategory = 'frontend' | 'backend' | 'infra' | 'language';

export const favoriteTools: FavoriteTool[] = [
  {
    name: 'Mantine',
    category: 'frontend',
    description: 'A wonderful React UI library',
    link: 'https://mantine.dev',
  },
  {
    name: 'Typescript',
    category: 'language',
    description: 'A language that makes Javascript better',
    link: 'https://www.typescriptlang.org/',
  },
  {
    name: 'Rust',
    category: 'language',
    description: 'The best language in the world',
    link: 'https://www.rust-lang.org',
  },
  {
    name: 'Pulumi',
    category: 'infra',
    description:
      'The best framework to manage your infrastructure as code in Typescript',
    link: 'https://www.pulumi.com',
  },
  {
    name: 'Kubernetes',
    category: 'infra',
    description:
      'The best orchestrator for containers to be the most cloud agnostic as possible',
    link: 'https://kubernetes.io',
  },
  {
    name: 'Dagger',
    category: 'infra',
    description: 'Declare your pipelines as containers in Typescript',
    link: 'https://dagger.io',
  },
  {
    name: 'Next.js',
    category: 'frontend',
    description: 'A framework to make modern frontend apps',
    link: 'https://nextjs.org',
  },
  {
    name: 'Solidity',
    category: 'language',
    description:
      'The language to write smart contracts on Ethereum virtual machines',
    link: 'https://soliditylang.org',
  },
  {
    name: 'Bun',
    category: 'backend',
    description:
      'A JS runtime with wonderful performance and developer experience',
    link: 'https://bun.sh',
  },
];
