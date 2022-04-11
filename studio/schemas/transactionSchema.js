export default {
    name: 'transactions',
    title: 'Transactions',
    type: 'document',
    fields: [
        {
            name: 'txHash',
            title: 'Transaction Hash',
            type: 'string'
        },
        {
            name: 'from',
            title: 'From (Wallet Address)',
            type: 'string'
        },
        {
            name: 'to',
            title: 'To (Wallet Address)',
            type: 'string'
        },
        {
            name: "timestamp",
            title: "Timestamp",
            type: "datetime"
        }
    ]
}