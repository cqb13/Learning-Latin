# The Textbook

## Structure of Textbook

The textbooks general structure must be as follows:

```
textbook
├── Topic 1
│   ├── Sub Topic 1
│   │   ├── Introduction.md
│   │   ├── CHAPTER_1.md
│   │   ├── CHAPTER_2.md
│   │   ├── CHAPTER_3.md
│   │   ├── CHAPTER_4.md
│   |   └── Conclusion.md
|   └── Sub Topic 2
|       ├── Introduction.md
│       ├── CHAPTER_1.md
│       ├── CHAPTER_2.md
│       ├── CHAPTER_3.md
│       └── CHAPTER_4.md
└── Topic 2
    ├── Introduction.md
    ├── CHAPTER_1.md
    ├── CHAPTER_2.md
    ├── CHAPTER_3.md
    └── CHAPTER_4.md
```

## Adding a New Topic

A topic is a folder that is within the **textbook** folder. A subtopic must contain a **Introduction.md** that at least contains a h1. This is not required, if there are no **chapters** within the topic, or if the topic contains a **subtopic**.

## Adding a New Sub Topic

A sub topic is a folder that is within a **topic** folder. A subtopic must contain a **Introduction.md** that at least contains a h1. This is not required, if there are no **chapters** within the subtopic.

**Note:** A subtopic **CAN NOT** contain another subtopic.

## The Introduction

The introduction is what will be shown when the topic or subtopic is first opened. The introduction must contain a **h1**, that is the title that will be shown in the side nav bar. The introduction can contain any other markdown elements, but should keep to the style of the rest of the textbook.

## Adding a New Chapter

A chapter is a file that is within a **topic** or **subtopic** folder. A chapter must be called **CHAPTER\_#.md** where **#** is order of the chapter within the topic or subtopic. A chapter must contain a **h1**, that is the title that will be shown in the side nav bar.

**Note:** A chapters title should not be the same as another chapters title within the same topic or subtopic.

**Note:** If a chapters title contains an article (a, an, the), it will not be removed from the title in the side nav bar.

## Chapters Content

A chapter can contain any markdown elements, but should keep to the style of the rest of the textbook.

Important words should be bolded.

When a term is used for the first time within a chapter, that may not be known, it should be bolded and italicized, then explained in brackets. For example:

```
The **NOM Case** [NOM => Nominative] is the first case of the six cases.
```
