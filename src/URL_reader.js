// 現在のタブのURLとタイトルを取得する関数
function getCurrentTabInfo(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        var tab = tabs[0];
        var url = tab.url;
        var title = tab.title;
        callback(url, title);
    });
}

// 現在の日時を取得する関数
function getCurrentDateTime() {
    return new Date();
}

// 使用例
getCurrentTabInfo(function(url, title) {
    console.log("URL: " + url);
    console.log("Title: " + title);
});

var currentDateTime = getCurrentDateTime();
console.log("Current Date and Time: " + currentDateTime);