import sanityClient from "@sanity/client"
import imageBuilder from "@sanity/image-url"

const options = {
    projectId: process.env.SANITY_PROJECT_ID,
    dataset: process.env.SANITY_DATASET || "production",
    token: process.env.SANITY_TOKEN,
    useCdn: false,
    apiVersion: 'v1'
}

export const client = sanityClient(options)

const builder = imageBuilder(client)

export const urlFor = (src) => builder.image(src)