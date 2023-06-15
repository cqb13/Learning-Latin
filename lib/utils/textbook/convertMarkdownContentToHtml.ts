import matter from "gray-matter";
import MarkdownIt from "markdown-it";
import markdownTable from "markdown-it-multimd-table";

const convertMarkdownContentToHtml = (markdown: any) => {
  const { content } = matter(markdown);

  const md = new MarkdownIt();
  md.use(markdownTable);

  const htmlContent = md.render(content);

  const styledOutput = `<div class="prose">${htmlContent}</div>`;

  return styledOutput;
};

export default convertMarkdownContentToHtml;
