export default {
    name: 'users',
    title: 'Users',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'

        },
        {
            name: 'walletAddress',
            title: 'Wallet Address',
            type: 'string'
        },
        {
            name: 'transactions',
            title: 'Transactions',
            type: 'array',
            of: [{ type: 'reference', to: [{ type: 'transactions' }] }]
        }
    ]
}