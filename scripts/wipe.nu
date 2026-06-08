# Interactively delete untracked files & directories.
def main [] {
  git ls-files --others --directory
  | lines
  | input list --multi --fuzzy 'Choose entries to delete'
  | if ($in | is-not-empty) {
    rm -rfv ...$in
  }
}
