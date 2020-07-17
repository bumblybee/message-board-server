exports.getThread = (req, res, next) => {
  res.json([
    {
      author: {
        id: 1,
        name: "Jay",
        avatarUrl: "https://picsum.photos/40",
      },
      msgId: 1,
      createdAt: new Date("1/10/2020"),
      body:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio earum eum doloribus quos quasi dolorum.",
    },
    {
      author: {
        id: 2,
        name: "Molly",
        avatarUrl: "https://picsum.photos/30",
      },
      msgId: 2,
      createdAt: new Date("1/11/2020"),
      body:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae sint ullam.",
    },
    {
      author: {
        id: 1,
        name: "Jay",
        avatarUrl: "https://picsum.photos/40",
      },
      msgId: 1,
      createdAt: new Date("1/10/2020"),
      body:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio earum eum doloribus quos quasi dolorum.",
    },
    {
      author: {
        id: 2,
        name: "Molly",
        avatarUrl: "https://picsum.photos/30",
      },
      msgId: 2,
      createdAt: new Date("1/11/2020"),
      body:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae sint ullam.",
    },
    {
      author: {
        id: 1,
        name: "Jay",
        avatarUrl: "https://picsum.photos/40",
      },
      msgId: 1,
      createdAt: new Date("1/10/2020"),
      body:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio earum eum doloribus quos quasi dolorum.",
    },
    {
      author: {
        id: 2,
        name: "Molly",
        avatarUrl: "https://picsum.photos/30",
      },
      msgId: 2,
      createdAt: new Date("1/11/2020"),
      body:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Pariatur quae sint ullam.",
    },
  ]);
};
