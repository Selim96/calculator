export const provaiders = [
    {
        name: "backblaze",
        values: {
            minPrice: 7,
            maxPrice: +Infinity,
            storage: 0.005,
            transfer: 0.01,
            freeStorage: null,
            freeTransfer: null
        }
    },
    {
        name: "bunny",
        values: {
            minPrice: 0,
            maxPrice: 10,
            storage: {
                hdd: 0.01,
                ssd: 0.02
            },
            transfer: 0.01,
            freeStorage: null,
            freeTransfer: null
        }
    },
    {
        name: "scaleway",
        values: {
            minPrice: 0,
            maxPrice: 10,
            storage: {
                multi: 0.06,
                single: 0.03
            },
            transfer: 0.02,
            freeStorage: 75,
            freeTransfer: 75
        }
    },
    {
        name: "vultr",
        values: {
            minPrice: 5,
            maxPrice: +Infinity,
            storage: 0.01,
            transfer: 0.01,
            freeStorage: null,
            freeTransfer: null
        }
    }
];