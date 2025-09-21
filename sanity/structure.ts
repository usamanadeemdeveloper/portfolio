import type { StructureResolver } from "sanity/structure";

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Portfolio Content")
    .items([
      // Profile group
      S.listItem()
        .title("Profile")
        .icon(() => "👤")
        .child(
          S.list()
            .title("Profile")
            .items([
              S.documentTypeListItem("pageInfo")
                .title("About / Page Info")
                .icon(() => "📝"),
              S.documentTypeListItem("social")
                .title("Social Links")
                .icon(() => "🌐"),
            ])
        ),

      // Resume group
      S.listItem()
        .title("Resume")
        .icon(() => "💼")
        .child(
          S.list()
            .title("Resume")
            .items([
              S.documentTypeListItem("experience")
                .title("Work Experience")
                .icon(() => "🏢"),
              S.documentTypeListItem("skill")
                .title("Skills")
                .icon(() => "🛠️"),
            ])
        ),

      // Projects / Portfolio group
      S.listItem()
        .title("Projects")
        .icon(() => "📁")
        .child(
          S.list()
            .title("Projects")
            .items([
              S.documentTypeListItem("projects")
                .title("All Projects")
                .icon(() => "📂"),
            ])
        ),

      // Divider for clarity
      S.divider(),

      // Any other document types not explicitly listed
      ...S.documentTypeListItems().filter(
        (item) =>
          item.getId() &&
          !["pageInfo", "experience", "skill", "social", "projects"].includes(
            item.getId()!
          )
      ),
    ]);
