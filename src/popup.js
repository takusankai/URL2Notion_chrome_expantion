import { databaseList } from './config.js';

document.addEventListener('DOMContentLoaded', function() {
    // データベース選択肢をポップアップに追加
    const databaseSelect = document.getElementById('databaseSelect');
    databaseList.forEach(db => {
        const option = document.createElement('option');
        option.value = db.id;
        option.textContent = db.name;
        databaseSelect.appendChild(option);
    });

    document.getElementById('getInfo').addEventListener('click', function() {
        const selectedDatabaseId = databaseSelect.value;
        chrome.runtime.sendMessage({ action: "getTabInfoAndDateTime", databaseId: selectedDatabaseId }, function(response) {
            document.getElementById('output').innerText = 
                "URL: " + response.url + "\n" +
                "Title: " + response.title + "\n" +
                "Date and Time: " + response.dateTime;

            if (response.status === "success") {
                document.getElementById('status').innerText = response.message;
                document.getElementById('status').style.color = "green";
                document.getElementById('details').innerText = "Response Data: " + response.data;
            } else if (response.status === "error") {
                document.getElementById('status').innerText = response.message;
                document.getElementById('status').style.color = "red";
                document.getElementById('details').innerText = "Error: " + response.error;
            }
        });
    });
});