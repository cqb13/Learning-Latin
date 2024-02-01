async function fetchLatestCommits(maxCommits: number = 5) {
  const response = await fetch(
    "https://api.github.com/repos/cqb13/Learning-Latin/commits?per_page=5"
  );
  const data = await response.json();

  const commits = data.slice(0, maxCommits);
  return commits;
}

export default fetchLatestCommits;
