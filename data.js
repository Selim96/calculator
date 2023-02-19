export const provaiders = [
    {
        name: "backblaze",
        icon: null,
        color: "rgba(243, 53, 53, 0.527)",
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
        color: "rgba(248, 146, 50, 0.527)",
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
        color: "rgba(248, 55, 206, 0.527)",
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
        color: "rgba(55, 155, 248, 0.527)",
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