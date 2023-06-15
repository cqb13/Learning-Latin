import addParentName from "@utils/textbook/addParentDirectoryNamesToTextbookMap";
import reorganizeData from "@utils/textbook/reorganizeTextbookMap";

interface DataItem {
  path: string;
  title: string;
  content: string;
}

interface GroupedData {
  [key: string]: GroupedData | DataItem[];
}

const groupDataByPath = (data: DataItem[], order: string[]) => {
  const groupedData: GroupedData = {};

  data.forEach((item) => {
    const pathParts = item.path.split("\\");
    let currentGroup = groupedData;

    pathParts.forEach((part, index) => {
      if (!currentGroup[part]) {
        if (index === pathParts.length - 1) {
          currentGroup[part] = [];
        } else {
          currentGroup[part] = {};
        }
      }

      if (Array.isArray(currentGroup[part])) {
        (currentGroup[part] as DataItem[]).push(item);
        if (part === "INTRODUCTION" && index !== 0) {
          const introductionItem = (currentGroup[part] as DataItem[]).pop();
          (currentGroup[part] as DataItem[]).unshift(introductionItem!);
        }
      } else {
        currentGroup = currentGroup[part] as GroupedData;
      }
    });
  });

  const reorganizedData = reorganizeData(groupedData, order);
  const finalData = addParentName(reorganizedData, "Textbook");

  return finalData;
};

export default groupDataByPath;
