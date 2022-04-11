import { client } from "../../lib/sanity"

const createUser = async (req, res) => {
    const { walletAddress } = req.body
    try {
        const userDoc = {
            _type: 'users',
            _id: walletAddress,
            name: "Unnamed",
            walletAddress: walletAddress,
        }
        const sanityResponse = await client.createIfNotExists(userDoc)
        res.status(200).send({ message: 'success', data: sanityResponse })
    } catch (error) {
        res.status(500).send({ message: 'error', data: error.message })
    }
}

export default createUser