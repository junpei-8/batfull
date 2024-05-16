import { column, defineDb, defineTable, NOW } from 'astro:db';

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),

    name: column.text(),

    picture: column.text({ optional: true }),

    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ optional: true }),
    deletedAt: column.date({ optional: true }),
  },
});

const UserBad = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),

    badderId: column.text({ references: () => User.columns.id }),

    thumbnail: column.text({ optional: true }),

    caption: column.text(),

    spot: column.text(),

    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ optional: true }),
    deletedAt: column.date({ optional: true }),
  },
  indexes: [{ on: 'createdAt' }],
});

const UserBeautifully = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),

    badId: column.text({ references: () => UserBad.columns.id }),

    beautifullerId: column.text({ references: () => User.columns.id }),

    thumbnail: column.text({ optional: true }),

    caption: column.text(),

    hasApproved: column.boolean({ default: false }),

    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ optional: true }),
    deletedAt: column.date({ optional: true }),
  },
  indexes: [{ on: 'createdAt' }],
});

/** User Gacha */
const UserGacha = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),

    // gachaId: column.text({ references: () => Gacha.columns.id }),
    gachaSubId: column.text(),

    userId: column.text({ references: () => User.columns.id }),

    createdAt: column.date({ default: NOW }),
    updatedAt: column.date({ optional: true }),
    deletedAt: column.date({ optional: true }),
  },
});

// /** Gacha Master Table */
// const Gacha = defineTable({
//   columns: {
//     id: column.text({ primaryKey: true }),

//     name: column.text(),

//     rarity: column.number(),

//     createdAt: column.date(),
//     updatedAt: column.date({ optional: true }),
//     deletedAt: column.date({ optional: true }),
//   },
// });

/** @see {@link https://astro.build/db/config} */
export default defineDb({
  tables: {
    User,
    UserBad,
    UserBeautifully,
    UserGacha,
  },
});
