import { q, TypeFromSelection } from "groqd";

const homePage = {
  _id: q.string().optional(),
  title: q.string().optional(),
  description: q.string().optional(),
  lastUpdated: q.date().optional(),
};

export const homePageQuery = q(
  `*[_type == "game" && !(_id in path("drafts.**"))] | order(lastUpdated desc)`,
)
  .filter()
  .grab$(homePage)
  .nullable();

export type Homepage = TypeFromSelection<typeof homePage>;
