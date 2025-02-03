import { buildConfig } from "payload";
import { slateEditor } from "@payloadcms/richtext-slate";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import path from "path";
import sharp from "sharp";

export default buildConfig({
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL || "",
  secret: process.env.PAYLOAD_SECRET!,
  collections: [],
  admin: {
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
  sharp,
  editor: slateEditor({}),
  db: mongooseAdapter({
    url: process.env.MONGODB_URL!,
  }),
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
});
