import { PROJECT_BY_SLUG_QUERYResult } from "@/sanity.types";

type Props = {
  project: NonNullable<PROJECT_BY_SLUG_QUERYResult>;
  slug: string;
};

export default function StructuredData({ project, slug }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareSourceCode",
          name: project.title,
          description: project.seoDescription || "No description available",
          url: `https://usamanadeem.vercel.app/projects/${slug}`,
          author: {
            "@type": "Person",
            name: "Usama Nadeem",
          },
          keywords: project.technologies
            ?.map((tech) => tech?.title)
            .join(", "),
        }),
      }}
    />
  );
}
