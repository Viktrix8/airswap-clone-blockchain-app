import { client } from "../../lib/sanity"

const getTokens = async (req, res) => {
    const query = `*[_type == "tokens"] {
        name,
        symbol,
        address,
        decimals,
        "image": image.asset -> url
    }`
    try {
        const sanityResponse = await client.fetch(query)
        res.status(200).send({ data: sanityResponse, status: "success" })
    } catch (err) {
        res.status(500).send({ data: err.message, message: 'error' })
    }
}

export default getTokens