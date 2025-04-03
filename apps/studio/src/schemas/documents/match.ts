import { defineField, defineType } from "sanity";

export const match = defineType({
  name: "match",
  title: "Match",
  type: "document",
  fields: [
    defineField({
      name: "game",
      title: "Game",
      type: "reference",
      to: [{ type: "game" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "player1",
      title: "Player 1",
      type: "reference",
      to: [{ type: "player" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "player2",
      title: "Player 2",
      type: "reference",
      to: [{ type: "player" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "winner",
      title: "Winner",
      type: "reference",
      to: [{ type: "player" }],
      validation: (Rule) => Rule.required(),
      options: {
        filter: ({ document }) => {
          if (!document?.player1 || !document?.player2) {
            return { filter: "_id in []" };
          }
          return {
            filter: "_id in [$player1, $player2]",
            params: {
              player1: (document.player1 as { _ref: string })._ref,
              player2: (document.player2 as { _ref: string })._ref,
            },
          };
        },
      },
    }),
    defineField({
      name: "date",
      title: "Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      gameTitle: "game.title",
      player1Name: "player1.name",
      player2Name: "player2.name",
    },
    prepare({ gameTitle, player1Name, player2Name }) {
      return {
        title: `${gameTitle ? gameTitle : "Game"} - ${player1Name ? player1Name : "Player 1"} vs ${player2Name ? player2Name : "Player 2"}`,
      };
    },
  },
});
