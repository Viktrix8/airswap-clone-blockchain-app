import { client } from "../../lib/sanity"

const saveTx = async (req, res) => {
    const { hash, from, to, walletAddress } = req.body
    try {
        const txDoc = {
            _type: 'transactions',
            _id: hash,
            txHash: hash,
            from,
            to,
            timestamp: new Date(Date.now()).toISOString()
        }
        const sanityResponse = await client.createIfNotExists(txDoc)
        await client.patch(walletAddress.toLowerCase()).setIfMissing({ transactions: [] }).insert('after', 'transactions[-1]', [{
            _key: hash,
            _ref: hash,
            _type: 'reference'
        }]).commit()
        res.status(200).send({ message: 'success', data: sanityResponse })
    } catch (error) {
        res.status(500).send({ message: 'error', data: error.message })
    }
}

export default saveTx