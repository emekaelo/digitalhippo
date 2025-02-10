import { buildConfig } from "payload";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path, { dirname } from "path";
import sharp from "sharp";
import { Users } from "./collections/Users";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { resendAdapter } from "@payloadcms/email-resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  secret: process.env.PAYLOAD_SECRET!,
  collections: [Users],
  admin: {
    user: "users", // The collection that will use or have access to the admin panel
    meta: {
      titleSuffix: "- DigitalHippo",
      openGraph: {
        images: [
          {
            url: "/thumbnail.jpg",
          },
        ],
      },
      icons: [
        {
          rel: "icon",
          type: "image/png",
          url: "/favicon.ico",
        },
      ],
    },
  },
  email: resendAdapter({
    defaultFromAddress: "onboarding@resend.dev",
    defaultFromName: "DigitalHippo",
    apiKey: process.env.RESEND_API_KEY || "",
  }),
  sharp,
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
