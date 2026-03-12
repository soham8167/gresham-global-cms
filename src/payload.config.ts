import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import MediaNews from "./collections/MediaNews";
import NewsBlogs from "./collections/NewsBlogs";
import Publications from "./collections/Publications";
import Events from "./collections/Events";

console.log("DATABASE_URL:", process.env.DATABASE_URL);
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  // cors: [
  //   "http://localhost:3000"
  // ],

  // serverURL: "http://localhost:3001",
  cors: [
    "https://gresham-global.vercel.app"
  ],

  serverURL: "https://gresham-global-cms.onrender.com",

  collections: [
    Users,
    Media,
    MediaNews,
    NewsBlogs,
    Publications,
    Events
  ],

  editor: lexicalEditor(),

  secret: process.env.PAYLOAD_SECRET || "payload-secret",

  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },

  db: mongooseAdapter({
    url: process.env.DATABASE_URL || "",
  }),

  sharp,

  plugins: [],
});







// import { mongooseAdapter } from "@payloadcms/db-mongodb";
// import { lexicalEditor } from "@payloadcms/richtext-lexical";
// import path from "path";
// import { buildConfig } from "payload";
// import { fileURLToPath } from "url";
// import sharp from "sharp";

// import { Users } from "./collections/Users";
// import { Media } from "./collections/Media";
// import MediaNews from "./collections/MediaNews";
// import NewsBlogs from "./collections/NewsBlogs";
// import Publications from "./collections/Publications";

// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);

// // 🔍 log database URL
// console.log("DATABASE_URL:", process.env.DATABASE_URL);

// export default buildConfig({

//   admin: {
//     user: Users.slug,
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
//   },

//   cors: ["http://localhost:3000"],

//   serverURL: "http://localhost:3001",

//   collections: [
//     Users,
//     Media,
//     MediaNews,
//     NewsBlogs,
//     Publications
//   ],

//   editor: lexicalEditor(),

//   secret: process.env.PAYLOAD_SECRET || "payload-secret",

//   typescript: {
//     outputFile: path.resolve(dirname, "payload-types.ts"),
//   },

//   db: mongooseAdapter({
//     url: process.env.DATABASE_URL || "",
//   }),

//   sharp,

//   plugins: [],

//   // ✅ Startup log
//   onInit: async () => {
//     console.log("✅ Payload CMS started successfully");
//     console.log("✅ MongoDB connection established");
//   }
// });
