import { provaiders } from './data.js';

const refs = {
    storageInput: document.querySelector('#storage'),
    transferInput: document.querySelector('#transfer'),
    handlInputStorage: document.querySelector('#inputStorage'),
    handlInputTransfer: document.querySelector('#inputTransfer'),
    provaidersNames: document.querySelector('.provaiders_names'),
    provaidersSchedule: document.querySelector('.schedule'),
};

let storageValue = 500;
let transferValue = 500;
let switcher = [];
let minValues = [];

renderSignatures();
renderColumns();
changeColor();

const allInputs = document.querySelectorAll(".inputBtn");

allInputs.forEach((item)=>{item.addEventListener("change", handlChangeSwitcher)})

refs.storageInput.addEventListener("input", changeStorageValue);

refs.transferInput.addEventListener("input", changeTransferValue);

refs.handlInputStorage.addEventListener("input", handlChangeStorage);

refs.handlInputTransfer.addEventListener("input", handlChangeTransfer);

function renderColumns() {
    const markup = provaiders.map(({ values, color }, index) => {
        const { minPrice, maxPrice, storage, transfer, freeStorage, freeTransfer } = values;

        let result = 0;

        if (storageValue <= 1000 && transferValue <= 1000) {
            
        }
        if ((typeof storage) !== "object") {
            const columnSize = (storageValue > freeStorage ? (storageValue - freeStorage) : 0) * storage + (transferValue > freeTransfer ? (transferValue - freeTransfer) : 0) * transfer;

            result = columnSize < maxPrice ? (columnSize < minPrice ? minPrice : columnSize) : maxPrice;
        } else {
            const switcherType = switcher.find(item => item?.id === index).type;
            const columnSize = (storageValue > freeStorage ? (storageValue - freeStorage) : 0) * storage[switcherType] + (transferValue > freeTransfer ? (transferValue - freeTransfer) : 0) * transfer;
            
            result = columnSize < maxPrice ? (columnSize < minPrice ? minPrice : columnSize) : maxPrice;
        }
        minValues.push(result);
        
        return `<div class="schedule_item">
                    <div class="column" style="width: ${result * 10}px; height: 30px; " data-result=${result} data-color="${color}"></div>
                    <span class="value" >$${result.toFixed(2)}</span>
                </div>`
    }).join("");

    refs.provaidersSchedule.innerHTML = markup;
}

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

function changeStorageValue(e) {
    const currentValue = e.currentTarget.value;
    refs.handlInputStorage.value = currentValue;
    storageValue = currentValue;
    renderColumns();
    changeColor();
};

function changeTransferValue(e) {
    const currentValue = e.currentTarget.value;
    refs.handlInputTransfer.value = currentValue;
    transferValue = currentValue;
    renderColumns();
    changeColor();
};

function handlChangeStorage(e) {
    const currentValue = e.currentTarget.value;
    refs.storageInput.value = currentValue;
    refs.handlInputStorage.value = currentValue;
    storageValue = currentValue <= 1000 ? currentValue : 1000;
    renderColumns();
    changeColor()
};

function handlChangeTransfer(e) {
    const currentValue = e.currentTarget.value;
    refs.transferInput.value = currentValue;
    refs.handlInputTransfer.value = currentValue;
    transferValue = currentValue <= 1000 ? currentValue : 1000;;
    renderColumns();
    changeColor()
}

function handlChangeSwitcher(e) {
    switcher.forEach(item => {
        if (item.id.toString() === e.currentTarget.id) {
            item.type = e.currentTarget.value;
        }
    });
    renderColumns();
    changeColor();
}

function changeColor() {
    const allColumns = document.querySelectorAll(".column");
    allColumns.forEach(item => {
        item.style.backgroundColor = Number(item.dataset.result) === Math.min(...minValues) ? item.dataset.color : "rgba(109, 108, 108, 0.39)";
    });
    minValues = [];
}