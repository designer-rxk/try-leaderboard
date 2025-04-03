import { q, TypeFromSelection } from "groqd";

const matchPage = {
  date: q.date().optional(),
  game: q("game").deref().grab$({
    title: q.string().optional(),
    description: q.string().optional(),
  }),
  player1: q("player1").deref().grab$({
    name: q.string().optional(),
  }),
  player2: q("player2").deref().grab$({
    name: q.string().optional(),
  }),
  winner: q("winner").deref().grab$({
    name: q.string().optional(),
  }),
};

export const matchPageQuery = q(
  `*[_type == "match" && !(_id in path("drafts.**"))]`,
)
  .filter()
  .grab$(matchPage)
  .nullable();

export type MatchPage = TypeFromSelection<typeof matchPage>;
