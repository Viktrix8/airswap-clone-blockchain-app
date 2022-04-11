export default {
    name: 'tokens',
    title: 'Tokens',
    type: 'document',
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string'
        },
        {
            name: 'symbol',
            title: 'Symbol',
            type: 'string'

        }, {
            name: 'decimals',
            title: 'Decimals',
            type: 'number'
        },
        {
            name: 'address',
            title: 'Address',
            type: 'string'
        },
        {
            name: 'image',
            title: 'Image',
            type: 'image',
            options: {
                hotspot: true
            }
        }
    ]
}