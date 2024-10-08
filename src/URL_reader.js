chrome.runtime.onInstalled.addListener(() => {
    console.log("Service Worker Installed");
});

// メッセージリスナーを追加
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "getTabInfoAndDateTime") {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            var tab = tabs[0];
            var url = tab.url;
            var title = tab.title;
            var currentDateTime = getCurrentDateTime();
            sendResponse({ url: url, title: title, dateTime: currentDateTime });
        });
        return true; // Indicates that the response will be sent asynchronously
    }
});

// 現在の日時を取得する関数
function getCurrentDateTime() {
    return new Date().toLocaleString();
}