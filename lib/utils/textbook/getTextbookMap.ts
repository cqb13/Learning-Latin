import path from "path";
import fs from "fs";

const getTextbookMap = async () => {
  const textbookPath = path.join(process.cwd(), "lib", "data", "textbook");

  const traverseFolder = (folderPath: string, parentPath = "") => {
    const folderContent = fs.readdirSync(folderPath);
    const pages: any = [];

    folderContent.forEach((item: any) => {
      const itemPath = path.join(folderPath, item);
      const relativePath = path.join(parentPath, item);

      if (fs.statSync(itemPath).isDirectory()) {
        const subpages = traverseFolder(itemPath, relativePath);
        pages.push(...subpages);
      } else if (path.extname(itemPath) === ".md") {
        const fileContent = fs.readFileSync(itemPath, "utf8");
        const firstLine = fileContent.split("\n")[0];
        const title = firstLine.replace(/^#+\s+/, "").slice(0, -1);

        pages.push({
          path: relativePath.replace(/\.md$/, ""),
          title: title,
          content: fileContent
        });
      }
    });

    return pages;
  };

  return traverseFolder(textbookPath);
};

export default getTextbookMap;
