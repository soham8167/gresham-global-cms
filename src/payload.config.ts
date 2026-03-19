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
// import Events from "./collections/Events";
// import Jobs from "./collections/Job";

// console.log("DATABASE_URL:", process.env.DATABASE_URL);
// const filename = fileURLToPath(import.meta.url);
// const dirname = path.dirname(filename);

// export default buildConfig({
  
//   admin: {
//     user: Users.slug,
    
//     importMap: {
//       baseDir: path.resolve(dirname),
//     },
  
//   },

  

//   cors: [
//   "http://localhost:3000",
//   "https://gresham-global.vercel.app"
// ],
//   serverURL:
//   process.env.NODE_ENV === "development"
//     ? "http://localhost:3002"
//     : "https://gresham-global-cms.onrender.com",
//   collections: [
//     Users,
//     Media,
//     MediaNews,
//     NewsBlogs,
//     Publications,
//     Events,
//     Jobs,
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
// });











import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";
import { cloudStoragePlugin } from "@payloadcms/plugin-cloud-storage";
import type {
  Adapter,
  GeneratedAdapter,
  HandleUpload,
  HandleDelete,
  GenerateURL,
} from "@payloadcms/plugin-cloud-storage/types";
import { v2 as cloudinary } from "cloudinary";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import MediaNews from "./collections/MediaNews";
import NewsBlogs from "./collections/NewsBlogs";
import Publications from "./collections/Publications";
import Events from "./collections/Events";
import Jobs from "./collections/Job";

console.log("DATABASE_URL:", process.env.DATABASE_URL);
const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

/* ------------------------------------------------------------------ */
/*  CLOUDINARY ADAPTER                                                  */
/* ------------------------------------------------------------------ */

const CLOUDINARY_FOLDER = "gresham-cms";

// configure cloudinary SDK
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || "",
  api_key:    process.env.CLOUDINARY_API_KEY    || "",
  api_secret: process.env.CLOUDINARY_API_SECRET || "",
});

// ✅ Adapter MUST be a function: (args) => GeneratedAdapter
// This is the correct Payload type signature
const cloudinaryAdapter: Adapter = ({ collection, prefix = "" }): GeneratedAdapter => {

  // ✅ UPLOAD — sends file buffer to Cloudinary
  const handleUpload: HandleUpload = async ({ data, file }) => {
    const result = await new Promise<{ secure_url: string; public_id: string }>(
      (resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          {
            folder: CLOUDINARY_FOLDER,
            public_id: file.filename.replace(/\.[^/.]+$/, ""), // strip extension
            resource_type: "auto",
            overwrite: false,
          },
          (error, result) => {
            if (error || !result) return reject(error);
            resolve(result);
          }
        );
        uploadStream.end(file.buffer);
      }
    );

    // save the Cloudinary URL into the document
    data.url = result.secure_url;
    return data;
  };

  // ✅ DELETE — removes file from Cloudinary when deleted in CMS admin
  const handleDelete: HandleDelete = async ({ doc, filename: fname }) => {
    const publicId = `${CLOUDINARY_FOLDER}/${fname.replace(/\.[^/.]+$/, "")}`;
    try {
      await cloudinary.uploader.destroy(publicId, { resource_type: "auto" });
    } catch (err) {
      console.error("Cloudinary delete error:", err);
    }
  };

  // ✅ GENERATE URL — returns the Cloudinary URL for a given filename
  const generateURL: GenerateURL = async ({ filename: fname }) => {
    return cloudinary.url(`${CLOUDINARY_FOLDER}/${fname}`, {
      secure: true,
    });
  };

  return {
    name: "cloudinary",
    handleUpload,
    handleDelete,
    generateURL,
    staticHandler: async (req, { params: { filename: fname } }) => {
      // redirect to Cloudinary URL directly
      const url = cloudinary.url(`${CLOUDINARY_FOLDER}/${fname}`, {
        secure: true,
      });
      return Response.redirect(url, 302);
    },
  };
};

/* ------------------------------------------------------------------ */
/*  PAYLOAD CONFIG                                                      */
/* ------------------------------------------------------------------ */

export default buildConfig({

  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },

  cors: [
    "http://localhost:3000",
    "https://gresham-global.vercel.app",
  ],

  serverURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:3001"
      : "https://gresham-global-cms.onrender.com",

  collections: [
    Users,
    Media,
    MediaNews,
    NewsBlogs,
    Publications,
    Events,
    Jobs,
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

  plugins: [
    cloudStoragePlugin({
      collections: {
        media: {
          adapter: cloudinaryAdapter,  // ✅ function reference, not object
          disableLocalStorage: true,   // ✅ don't save on Render disk
          generateFileURL: async ({ filename: fname }) => {
            return cloudinary.url(`${CLOUDINARY_FOLDER}/${fname}`, {
              secure: true,
            });
          },
        },
      },
    }),
  ],
});
