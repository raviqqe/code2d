function getCurrentTabUrl(callback: (url: string) => void) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => callback(tabs[0].url));
}

function changeBackgroundColor(color: string) {
    chrome.tabs.executeScript({
        code: `document.body.style.backgroundColor="${color}";`,
    });
}

function getSavedBackgroundColor(url: string, callback: (color: string | null) => void) {
    chrome.storage.sync.get(url, (items) => {
        callback(chrome.runtime.lastError ? null : items[url]);
    });
}

document.addEventListener("DOMContentLoaded", () => getCurrentTabUrl((url) => {
    const dropdown = document.getElementById("dropdown") as HTMLSelectElement;

    getSavedBackgroundColor(url, (color: string | null) => {
        if (color) {
            changeBackgroundColor(color);
            dropdown.value = color;
        }
    });

    dropdown.addEventListener("change", () => {
        changeBackgroundColor(dropdown.value);
        chrome.storage.sync.set({ url: dropdown.value });
    });
}));
