// "X vs Y" comparisons — practical, opinionated, honest. Targets real search intent.

export interface Comparison {
  slug: string;
  a: string;
  b: string;
  title: string;
  description: string;
  updated: string; // ISO date
  intro: string;
  rows: { dim: string; a: string; b: string }[];
  useA: string;
  useB: string;
  verdict: string;
}

export const comparisons: Comparison[] = [
  {
    slug: 'rest-vs-graphql',
    a: 'REST',
    b: 'GraphQL',
    title: 'REST vs GraphQL',
    description: 'REST vs GraphQL for real APIs — over-fetching, caching, tooling and when each one actually wins. A practical, opinionated comparison.',
    updated: '2026-09-18',
    intro: 'Both let a client talk to a server over HTTP. REST models resources as URLs with standard verbs; GraphQL exposes one endpoint and a query language where the client asks for exactly the fields it wants. The real choice is about who controls the shape of the response.',
    rows: [
      { dim: 'Shape of response', a: 'Server decides per endpoint', b: 'Client asks for exact fields' },
      { dim: 'Over/under-fetching', a: 'Common (fixed payloads)', b: 'Avoided by design' },
      { dim: 'Number of endpoints', a: 'Many (one per resource)', b: 'One (/graphql)' },
      { dim: 'HTTP caching', a: 'Native & easy (GET + URLs)', b: 'Harder (POST, needs extra work)' },
      { dim: 'Learning curve', a: 'Low — everyone knows it', b: 'Higher — schema, resolvers, N+1' },
      { dim: 'Tooling / discovery', a: 'OpenAPI, mature ecosystem', b: 'Introspection, typed clients' },
    ],
    useA: 'Public APIs, simple CRUD, when HTTP caching and cache-friendly CDNs matter, or when you want the lowest team ramp-up. REST is the boring, reliable default.',
    useB: 'Rich clients pulling nested data from many sources, mobile apps that must minimise round-trips, or many front-ends with different data needs served by one schema.',
    verdict: 'Default to REST — it is simpler, cache-friendly and universally understood. Reach for GraphQL when the pain of over-fetching and multiple round-trips is real and recurring, and you can afford the extra server complexity (schema design, resolver performance, N+1 handling).',
  },
  {
    slug: 'sql-vs-nosql',
    a: 'SQL',
    b: 'NoSQL',
    title: 'SQL vs NoSQL',
    description: 'SQL vs NoSQL databases — schema, transactions, scaling and joins. When a relational database wins and when a document store fits better.',
    updated: '2026-09-10',
    intro: 'SQL (relational) databases store rows in tables with a fixed schema and strong guarantees. NoSQL is an umbrella for document, key-value, wide-column and graph stores that trade some of those guarantees for flexibility or scale. The question is what your data and consistency needs actually are.',
    rows: [
      { dim: 'Schema', a: 'Fixed, enforced', b: 'Flexible / schema-on-read' },
      { dim: 'Relationships / joins', a: 'First-class (JOINs)', b: 'Manual or denormalised' },
      { dim: 'Transactions', a: 'Strong (ACID)', b: 'Varies; often eventual' },
      { dim: 'Query power', a: 'Rich (SQL)', b: 'Simpler / engine-specific' },
      { dim: 'Horizontal scale', a: 'Possible, more work', b: 'Often the design goal' },
      { dim: 'Examples', a: 'PostgreSQL, MySQL, SQLite', b: 'MongoDB, DynamoDB, Redis' },
    ],
    useA: 'Anything where correctness, relationships and reporting matter — payments, inventory, systems of record. PostgreSQL with row-level security is my default for real business data.',
    useB: 'High-volume, simple-access patterns (caches, sessions, event logs), flexible/rapidly-changing documents, or extreme write scale where one shape dominates.',
    verdict: 'Start with a relational database (PostgreSQL). Its transactions, joins and constraints prevent whole classes of bugs, and it scales further than people think. Add a NoSQL store for the specific job it is great at — caching (Redis), edge key-value (KV), or a document workload — rather than as your primary source of truth.',
  },
  {
    slug: 'cloudflare-workers-vs-aws-lambda',
    a: 'Cloudflare Workers',
    b: 'AWS Lambda',
    title: 'Cloudflare Workers vs AWS Lambda',
    description: 'Cloudflare Workers vs AWS Lambda — cold starts, runtime, pricing and ecosystem. Which serverless platform fits which job, from someone who ships on the edge.',
    updated: '2026-08-30',
    intro: 'Both run your code without a server to manage. Workers run at the edge on a V8-isolate model with near-zero cold starts; Lambda runs functions in AWS regions with a container model and the full AWS ecosystem behind it. The trade is edge-simplicity versus ecosystem-depth.',
    rows: [
      { dim: 'Where it runs', a: 'Edge (hundreds of locations)', b: 'Chosen AWS region(s)' },
      { dim: 'Cold starts', a: 'Effectively none (isolates)', b: 'Noticeable (containers)' },
      { dim: 'Runtime model', a: 'Web-standard APIs, limits', b: 'Full Node/other, more headroom' },
      { dim: 'Storage', a: 'D1, KV, R2, Durable Objects', b: 'RDS, DynamoDB, S3, everything' },
      { dim: 'Ecosystem', a: 'Focused, fast to start', b: 'Vast, deep, more complex' },
      { dim: 'Idle cost', a: 'Rounds to zero at low traffic', b: 'Low, but region + services add up' },
    ],
    useA: 'Latency-sensitive apps, sites and APIs, anything global by default, and small teams who want near-zero ops and idle cost. It is what I run Makmur Motor, Venmail and this site on.',
    useB: 'Workloads already deep in AWS, long-running or heavy compute, or when you need a specific AWS service (SQS, Step Functions, big RDS) as the backbone.',
    verdict: 'For edge-native apps, sites and lean APIs, Cloudflare Workers wins on cold starts, latency and idle cost with far less operational surface. For heavy, long-running compute or an app already living inside AWS, Lambda plus the AWS ecosystem is the pragmatic choice. Pick the platform your data gravity already sits in.',
  },
];
