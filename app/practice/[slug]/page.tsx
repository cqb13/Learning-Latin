import personalPronouns from "@/lib/data/practice/personal-pronouns";
import relativePronouns from "@/lib/data/practice/relative-pronouns";
import personalEndings from "@/lib/data/practice/personal-endings";
import perfectTense from "@/lib/data/practice/perfect-tense";
import ChartLayout from "@/components/practice/chartLayout";
import futureTense from "@/lib/data/practice/future-tense";
import declensions from "@/lib/data/practice/declensions";
import chartProps from "@/lib/types/chartProps";

export async function getStaticPaths() {
  const paths = [
    { params: { id: "declension-endings" } },
    { params: { id: "future-tense" } },
    { params: { id: "perfect-tense" } },
    { params: { id: "personal-endings" } },
    { params: { id: "personal-pronouns" } },
    { params: { id: "relative-pronouns" } },
  ];

  return { paths, fallback: false };
}

export async function getStaticParams({ params }: { params: { id: string } }) {
  const { id } = params;

  let data;
  if (id === "declension-endings") {
    data = declensions;
  } else if (id === "future-tense") {
    data = futureTense;
  } else if (id === "perfect-tense") {
    data = perfectTense;
  } else if (id === "personal-pronouns") {
    data = personalPronouns;
  } else if (id === "relative-pronouns") {
    data = relativePronouns;
  } else if (id === "personal-endings") {
    data = personalEndings;
  } else {
    data = {};
  }

  return {
    props: { data },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ data: chartProps }>;
}) {
  const data = (await params).data;

  return <ChartLayout data={data} />;
}
