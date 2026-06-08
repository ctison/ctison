# Run the repo-wide format & lint sweep.
def main [] {
  main fmt
  main tombi .
  main biome
  main cspell .
}

# Check formatting of all tracked & untracked files with prettier.
def 'main fmt' [...rest] {
  git ls-files --cached --others --exclude-standard
  | lines
  | where {$in | path exists}
  | ls ...$in
  | where type == file
  | $in.name
  | bun --bun prettier --check --ignore-unknown ...$in
}

# Check TOML formatting with tombi.
def --wrapped 'main tombi' [...rest] {
  bun --bun tombi format --check ...$rest
}

# Lint with biome in CI mode.
def --wrapped 'main biome' [...rest] {
  bun --bun biome ci --reporter=summary ...$rest
}

# Spell-check with cspell.
def --wrapped 'main cspell' [...rest] {
  bun --bun cspell ...$rest
}
