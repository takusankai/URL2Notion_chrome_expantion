import { notionToken } from './config.js';

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
            var selectedDatabaseId = message.databaseId;

            // Notion APIにデータを送信
            sendToNotionAPI(url, title, currentDateTime, selectedDatabaseId, sendResponse);
        });
        return true; // Indicates that the response will be sent asynchronously
    }
});

// 現在の日時を取得する関数
function getCurrentDateTime() {
    return new Date().toISOString(); // ISO形式で日時を取得
}

// Notion APIにデータを送信する関数
function sendToNotionAPI(url, title, dateTime, databaseId, sendResponse) {
    const notionAPIUrl = "https://api.notion.com/v1/pages";

    const data = {
        parent: { database_id: databaseId },
        properties: {
            "ページタイトル": {
                title: [
                    {
                        text: {
                            content: title
                        }
                    }
                ]
            },
            "URL": {
                url: url
            },
            "閲覧日": {
                date: {
                    start: dateTime
                }
            }
        }
    };

    fetch(notionAPIUrl, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${notionToken}`,
            "Content-Type": "application/json",
            "Notion-Version": "2022-06-28"
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
                throw new Error(JSON.stringify(errorData));
            });
        }
        return response.json();
    })
    .then((data) => {
        console.log("Success:", data);
        sendResponse({ status: "success", message: "データが正常に送信されました。", url: url, title: title, dateTime: dateTime, data: JSON.stringify(data) });
    })
    .catch((error) => {
        console.error("Fetch Error:", error);
        sendResponse({ status: "error", message: "データの送信に失敗しました。", url: url, title: title, dateTime: dateTime, error: error.message });
    });
}