import { provaiders } from './data.js';

const refs = {
    storageInput: document.querySelector('#storage'),
    transferInput: document.querySelector('#transfer'),
    handlInputStorage: document.querySelector('#inputStorage'),
    handlInputTranfer: document.querySelector('#inputTransfer'),
    provaidersNames: document.querySelector('.provaiders_names'),
    provaidersSchedule: document.querySelector('.schedule'),

};

let storageValue = 1;
let transferValue = 1;
let switcher = [];

function renderSignatures() {
    const namesMarkup = provaiders.map(({ name, values, icon }, index) => {
        const { storage } = values;
        
        if ((typeof storage) === "object") {
            switcher.push({id: index, type: Object.keys(storage)[0]})
            return `<div class="signature">
                <div class="signature_name name_switcher">
                    <p class="signature_name">${name}</p>
                    <label class="">
                        ${Object.keys(storage)[0]} <input type="radio" id="${index}" name="storageType${index}" value=${Object.keys(storage)[0]} checked  class="inputBtn"/>
                    </label>
                    <label class="">
                        ${Object.keys(storage)[1]} <input type="radio" id="${index}" name="storageType${index}" value=${Object.keys(storage)[1]}  class="inputBtn"/>
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
    refs.provaidersNames.innerHTML = namesMarkup;
}

function renderColumns() {
    const markup = provaiders.map(({ values }, index) => {
        const { minPrice, maxPrice, storage, transfer, freeStorage, freeTransfer } = values;

        let result = 0;

        if ((typeof storage) !== "object") {
            const columnSize = (storageValue > freeStorage ? (storageValue - freeStorage) : 0) * storage + (transferValue > freeTransfer ? (transferValue - freeTransfer) : 0) * transfer;

            result = columnSize < maxPrice ? (columnSize < minPrice ? minPrice : columnSize) : maxPrice;
        } else {
            const switcherType = switcher.find(item => item?.id === index).type;
            const columnSize = (storageValue > freeStorage ? (storageValue - freeStorage) : 0) * storage[switcherType] + (transferValue > freeTransfer ? (transferValue - freeTransfer) : 0) * transfer;
            
            result = columnSize < maxPrice ? (columnSize < minPrice ? minPrice : columnSize) : maxPrice;
        }
        return `<div class="schedule_item">
                    <div class="column" style="width: ${result * 10}px; height: 30px"></div>
                    <span class="value" >${result}</span>
                </div>`
    }).join("");

    refs.provaidersSchedule.innerHTML = markup;
}

renderSignatures();
renderColumns();

const allInputs = document.querySelectorAll(".inputBtn");

allInputs.forEach((item)=>{item.addEventListener("change", handlChangeSwitcher)})

refs.storageInput.addEventListener("input", changeStorageValue);

refs.transferInput.addEventListener("input", changeTransferValue);

refs.handlInputStorage.addEventListener("input", handlChangeStorage);

refs.handlInputTranfer.addEventListener("input", handlChangeTransfer);

console.log(switcher)

function changeStorageValue(e) {
    const currentValue = e.currentTarget.value;
    refs.handlInputStorage.value = currentValue;
    storageValue = currentValue;
    renderColumns()
};

function changeTransferValue(e) {
    const currentValue = e.currentTarget.value;
    refs.handlInputTranfer.value = currentValue;
    transferValue = currentValue;
    renderColumns()
};

function handlChangeStorage(e) {
    refs.storageInput.value = e.currentTarget.value;
    changeStorageValue(e)
};

function handlChangeTransfer(e) {
    refs.transferInput.value = e.currentTarget.value;
    changeStorageValue(e)
}

function handlChangeSwitcher(e) {
    switcher.forEach(item => {
        if (item.id.toString() === e.currentTarget.id) {
            item.type = e.currentTarget.value;
        }
    });
    renderColumns()
}