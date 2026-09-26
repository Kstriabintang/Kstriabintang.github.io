// Quick-reference cheatsheets — real commands/codes I actually reach for.

export interface CheatRow { code: string; desc: string }
export interface CheatSection { heading: string; rows: CheatRow[] }
export interface Cheatsheet {
  slug: string;
  title: string;
  description: string;
  updated: string;
  intro: string;
  sections: CheatSection[];
}

export const cheatsheets: Cheatsheet[] = [
  {
    slug: 'git-essentials',
    title: 'Git essentials',
    description: 'The Git commands you actually use every day — branching, committing, undoing mistakes and working with remotes.',
    updated: '2026-09-16',
    intro: 'The 90% of Git you use daily — plus the "undo" commands worth memorising before you need them.',
    sections: [
      { heading: 'Branch & switch', rows: [
        { code: 'git switch -c feature', desc: 'Create a new branch and switch to it (modern; = checkout -b).' },
        { code: 'git switch main', desc: 'Switch to an existing branch.' },
        { code: 'git branch -d feature', desc: 'Delete a merged branch.' },
      ]},
      { heading: 'Commit', rows: [
        { code: 'git add -p', desc: 'Stage changes interactively, hunk by hunk.' },
        { code: 'git commit -m "msg"', desc: 'Commit staged changes with a message.' },
        { code: 'git commit --amend', desc: 'Fix the last commit (message or contents) — before pushing.' },
      ]},
      { heading: 'Undo safely', rows: [
        { code: 'git restore file', desc: 'Discard unstaged changes to a file.' },
        { code: 'git reset --soft HEAD~1', desc: 'Undo the last commit, keep changes staged.' },
        { code: 'git revert <sha>', desc: 'Create a new commit that undoes an old one (safe on shared branches).' },
      ]},
      { heading: 'Remotes', rows: [
        { code: 'git pull --rebase', desc: 'Update your branch, replaying your commits on top (cleaner history).' },
        { code: 'git push -u origin feature', desc: 'Push and set the upstream for a new branch.' },
        { code: 'git log --oneline --graph', desc: 'A compact, visual history.' },
      ]},
    ],
  },
  {
    slug: 'http-status-codes',
    title: 'HTTP status codes',
    description: 'The HTTP status codes that matter in practice — what each really means and when to return it.',
    updated: '2026-09-08',
    intro: 'Not every code, just the ones you send and debug in real APIs — grouped by class.',
    sections: [
      { heading: '2xx — Success', rows: [
        { code: '200 OK', desc: 'Standard success with a body.' },
        { code: '201 Created', desc: 'A resource was created (return its URL in Location).' },
        { code: '204 No Content', desc: 'Success with nothing to return (e.g. a DELETE).' },
      ]},
      { heading: '3xx — Redirect', rows: [
        { code: '301 Moved Permanently', desc: 'The resource has a new permanent URL (SEO passes here).' },
        { code: '302 / 307 Found / Temporary', desc: 'Temporary redirect; 307 preserves the method.' },
        { code: '304 Not Modified', desc: 'Cached copy is still fresh — used with conditional requests.' },
      ]},
      { heading: '4xx — Client error', rows: [
        { code: '400 Bad Request', desc: 'Malformed input the client should fix.' },
        { code: '401 / 403', desc: '401 = not authenticated; 403 = authenticated but not allowed.' },
        { code: '404 Not Found', desc: 'No such resource.' },
        { code: '422 Unprocessable', desc: 'Well-formed but semantically invalid (validation failed).' },
        { code: '429 Too Many Requests', desc: 'Rate limit hit — include a Retry-After header.' },
      ]},
      { heading: '5xx — Server error', rows: [
        { code: '500 Internal Server Error', desc: 'Something broke on your side — never leak the stack trace.' },
        { code: '502 / 503 / 504', desc: 'Bad gateway / service unavailable / gateway timeout — upstream problems.' },
      ]},
    ],
  },
  {
    slug: 'docker-quickref',
    title: 'Docker quick reference',
    description: 'Everyday Docker commands — images, containers, logs, cleanup and Compose — for local stacks and deploys.',
    updated: '2026-08-24',
    intro: 'The Docker commands for building, running and cleaning up — the set that covers most local and deploy work.',
    sections: [
      { heading: 'Images', rows: [
        { code: 'docker build -t app:latest .', desc: 'Build an image from the Dockerfile in the current directory.' },
        { code: 'docker images', desc: 'List local images.' },
        { code: 'docker pull node:20-alpine', desc: 'Download an image from a registry.' },
      ]},
      { heading: 'Containers', rows: [
        { code: 'docker run -p 3000:3000 app', desc: 'Run a container and map a port.' },
        { code: 'docker ps -a', desc: 'List all containers (running and stopped).' },
        { code: 'docker exec -it <id> sh', desc: 'Open a shell inside a running container.' },
        { code: 'docker logs -f <id>', desc: 'Follow a container’s logs.' },
      ]},
      { heading: 'Compose', rows: [
        { code: 'docker compose up -d', desc: 'Start the whole stack in the background.' },
        { code: 'docker compose logs -f web', desc: 'Follow logs for one service.' },
        { code: 'docker compose down', desc: 'Stop and remove the stack.' },
      ]},
      { heading: 'Cleanup', rows: [
        { code: 'docker system prune -f', desc: 'Remove stopped containers, unused networks and dangling images.' },
        { code: 'docker volume prune', desc: 'Reclaim space from unused volumes (careful — data).' },
      ]},
    ],
  },
];
