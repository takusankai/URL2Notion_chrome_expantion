document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('getInfo').addEventListener('click', function() {
        chrome.runtime.sendMessage({ action: "getTabInfoAndDateTime" }, function(response) {
            document.getElementById('output').innerText = 
                "URL: " + response.url + "\n" +
                "Title: " + response.title + "\n" +
                "Date and Time: " + response.dateTime;
        });
    });
});