async function fetchLatestCommits(maxCommits: number = 5) {
  try {
    const response = await fetch(
      "https://api.github.com/repos/cqb13/Learning-Latin/commits?per_page=5",
    );

    if (!response.ok) {
      console.error(`GitHub API error: ${response.status}`);
      return [];
    }

    const data = await response.json();
    return data.slice(0, maxCommits);
  } catch (error) {
    console.error("Failed to fetch commits:", error);
    return [];
  }
}

export default fetchLatestCommits;
