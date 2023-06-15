import markdownTable from "markdown-it-multimd-table";
import MarkdownIt from "markdown-it";
import matter from "gray-matter";

const convertMarkdownContentToHtml = (markdown: string) => {
  const { content } = matter(markdown);

  const md = new MarkdownIt();
  md.use(markdownTable);

  const htmlContent = md.render(content);

  const styledOutput = `<div class="prose">${htmlContent}</div>`;

  return styledOutput;
};

export default convertMarkdownContentToHtml;
