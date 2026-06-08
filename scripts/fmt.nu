# Format all tracked & untracked files with prettier (and tombi for TOML).
def main [] {
  git ls-files --cached --others --exclude-standard
  | lines
  | where { $in | path exists }
  | ls ...$in
  | where type == file
  | $in.name
  | tee { where $in == package.json | bun --bun sort-package-json ...$in }
  | tee { bun --bun prettier --write --ignore-unknown ...$in }
  | tee { where $in ends-with .toml | bun --bun tombi format ...$in }
  | tee { bun --bun biome lint --write --reporter=summary ...$in }
}
