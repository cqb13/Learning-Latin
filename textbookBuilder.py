import os


def get_textbook_map():
    textbook_path = os.path.join(os.getcwd(), "textbook")

    def traverse_folder(folder_path, parent_path=""):
        folder_content = os.listdir(folder_path)
        pages = []

        for item in folder_content:
            item_path = os.path.join(folder_path, item)
            relative_path = os.path.join(parent_path, item)

            if os.path.isdir(item_path):
                sub_pages = traverse_folder(item_path, relative_path)
                pages.extend(sub_pages)
            elif os.path.splitext(item_path)[1] == ".md":
                with open(item_path, "r", encoding="utf8") as file:
                    file_content = file.read()
                    first_line = file_content.split("\n")[0]
                    title = first_line.replace("# ", "")

                    pages.append(
                        {
                            "path": os.path.splitext(relative_path)[0],
                            "title": title,
                            "content": file_content,
                        }
                    )

        return pages

    return traverse_folder(textbook_path)


def group_data_by_path(data, order):
    grouped_data = {}

    for item in data:
        path_parts = item["path"].split("\\")
        current_group = grouped_data

        for index, part in enumerate(path_parts):
            if part not in current_group:
                if index == len(path_parts) - 1:
                    current_group[part] = []
                else:
                    current_group[part] = {}

            if isinstance(current_group[part], list):
                current_group[part].append(item)
                if part == "INTRODUCTION" and index != 0:
                    introduction_item = current_group[part].pop()
                    current_group[part].insert(0, introduction_item)
            else:
                current_group = current_group[part]

    reorganized_data = reorganize_data(grouped_data, order)
    final_data = add_parent_name(reorganized_data, "Textbook")

    return final_data


def reorganize_data(data, order):
    if isinstance(data, list):
        if len(data) == 1:
            return reorganize_data(data[0], order)
        return [reorganize_data(item, order) for item in data]

    if isinstance(data, dict):
        reorganized_data = {}

        if "INTRODUCTION" in data:
            reorganized_data["INTRODUCTION"] = data["INTRODUCTION"][0]
            del data["INTRODUCTION"]

        for key in order:
            if key in data:
                reorganized_data[key] = reorganize_data(data[key], order)
                del data[key]

        for key in data:
            reorganized_data[key] = reorganize_data(data[key], order)

        return reorganized_data

    return data


def add_parent_name(data, parent_name):
    if isinstance(data, list):
        return [add_parent_name(item, parent_name) for item in data]

    if isinstance(data, dict):
        new_data = {}

        for key, value in data.items():
            is_chapter = "CHAPTER" in key

            if key != "INTRODUCTION" and not is_chapter:
                new_data[key] = add_parent_name(value, key)
            else:
                new_data[key] = value

        new_data["name"] = parent_name
        return new_data

    return data


textbook_map = get_textbook_map()
grouped_data = group_data_by_path(textbook_map, ["nouns", "adjectives"])

with open("./lib/data/textbook/textbookMap.ts", "w", encoding="utf8") as file:
    file.write("const textbook = ")
    file.write(str(grouped_data))
    file.write("\n\nexport default textbook")
