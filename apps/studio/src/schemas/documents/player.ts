import { defineField, defineType } from "sanity";

export const player = defineType({
  name: "player",
  title: "Player",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
