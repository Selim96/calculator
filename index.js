import { provaiders } from './data.js';

console.log(provaiders[0])

const refs = {
    storageInput: document.querySelector('#storage'),
    transferInput: document.querySelector('#transfer'),
    storageLable: document.querySelector('.storage_span'),
    transferLable: document.querySelector('.transfer_span'),
    provaidersNames: document.querySelector('.provaiders_names'),
    provaidersSchedule: document.querySelector('.schedule'),
};

let storageValue = 1000;
let transferValue = 1000;
let switcher = [];

function handlChangeSwitcher(e, index) {
    switcher = e.currentTarget.value;
}

const namesMarkup = provaiders.map(({ name, values, icon }, index) => {
    const { storage } = values;
    
    
    if ((typeof storage) === "object") {
        switcher.push({id: index, type: Object.keys(storage)[0]})
        return `<div class="signature">
            <div class="signature_name name_switcher">
                <p class="signature_name">${name}</p>
                <label class="">
                    ${Object.keys(storage)[0]} <input type="radio" name="storageType${index}" value=${Object.keys(storage)[0]} checked onchange/>
                </label>
                <label class="">
                    ${Object.keys(storage)[1]} <input type="radio" name="storageType${index}" value=${Object.keys(storage)[1]}/>
                </label>
            </div>
            <img src=${icon} alt="provaider icon" width=30 height=30 class="signature_icon"/>
        </div>`
    }
    return `<div class="signature">
        <span class="signature_name">${name}</span>
        <img src=${icon} alt="provaider icon" width=30 height=30 class="signature_icon"/>
    </div>`
}).join("");


const markup = provaiders.map(({ values }, index) => {
    const { minPrice, maxPrice, storage, transfer, freeStorage, freeTransfer } = values;

    let result = 0;

    if ((typeof storage) !== "object") {
        const columnSize = (storageValue > freeStorage ? (storageValue - freeStorage) : 0) * storage + (transferValue > freeTransfer ? (transferValue - freeTransfer) : 0) * transfer;

        result = columnSize < maxPrice ? (columnSize < minPrice ? minPrice : columnSize) : maxPrice;
    } else {
        const type = switcher.find(item => item?.id === index).type;
        const columnSize = (storageValue > freeStorage ? (storageValue - freeStorage) : 0) * storage[type] + (transferValue > freeTransfer ? (transferValue - freeTransfer) : 0) * transfer;
        
        result = columnSize < maxPrice ? (columnSize < minPrice ? minPrice : columnSize) : maxPrice;
    }
    return `<div class="schedule_item">
                <div class="column" style="width: ${result * 10}px; height: 30px"></div>
                <span class="value" >dfgdgd</span>
            </div>`
    }).join("");


refs.provaidersNames.innerHTML = namesMarkup;
refs.provaidersSchedule.innerHTML = markup;

refs.storageInput.addEventListener("input", changeStorageValue);


refs.transferInput.addEventListener("input", changeTransferValue);

console.log(switcher)

function changeStorageValue(e) {
    const currentValue = e.currentTarget.value;
    refs.storageLable.textContent = currentValue;
    storageValue = currentValue;
    console.log(storageValue)
};

function changeTransferValue(e) {
    const currentValue = e.currentTarget.value;
    refs.transferLable.textContent = currentValue;
    transferValue = currentValue;
    console.log(transferValue)
}