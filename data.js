export const provaiders = [
    {
        name: "backblaze",
        icon: null,
        values: {
            minPrice: 7,
            maxPrice: +Infinity,
            storage: 0.005,
            transfer: 0.01,
            freeStorage: 0,
            freeTransfer: 0
        }
    },
    {
        name: "bunny",
        icon: null,
        values: {
            minPrice: 0,
            maxPrice: 10,
            storage: {
                hdd: 0.01,
                ssd: 0.02
            },
            transfer: 0.01,
            freeStorage: 0,
            freeTransfer: 0
        }
    },
    {
        name: "scaleway",
        icon: null,
        values: {
            minPrice: 0,
            maxPrice: +Infinity,
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
        icon: null,
        values: {
            minPrice: 5,
            maxPrice: +Infinity,
            storage: 0.01,
            transfer: 0.01,
            freeStorage: 0,
            freeTransfer: 0
        }
    }
];