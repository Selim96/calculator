import { provaiders } from './data.js';

console.log(provaiders[0])

const refs = {
    storageInput: document.querySelector('#storage'),
    transferInput: document.querySelector('#transfer'),
    storageLable: document.querySelector('.storage_span'),
    transferLable: document.querySelector('.transfer_span'),
    provaidersNames: document.querySelector('.provaiders_names'),
    provaidersIcons: document.querySelector('.provaiders_icons'),
    provaidersSchedule: document.querySelector('.schedule'),
};

let storageValue = 1;
let transferValue = 1;



const markup = provaiders.map(({ name, values }) => {
    const { minPrice, maxPrice, storage, transfer, freeStorage, freeTransfer } = values;

    let result = 0;

    
    if (typeof storage !== Object) {
        const columnSize = storageValue * storage + transferValue * transfer;
        if (columnSize < maxPrice) {
            if (columnSize < minPrice) {
                result = minPrice;
            } else {
                result = columnSize;
            }
        } else {
            result = maxPrice;
        }
    }
    
    
    return `<div class="schedule_item">
          <div class="column" style="width: ${result * 10}px; height: 20px"></div>
          <span class="value" >dfgdgd</span>
        </div>`}).join("");

        console.log(markup)

refs.provaidersSchedule.innerHTML = markup;

refs.storageInput.addEventListener("input", changeStorageValue);


refs.transferInput.addEventListener("input", changeTransferValue);



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