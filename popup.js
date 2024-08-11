const CLIENT_ID =
  "829330897429-hvb3nvh0g6iiif7dmc1u4iihv4259bjbcd.apps.googleusercontent.com";
const SCOPES =
  "https://www.googleapis.com/auth/spreadsheets https://www.googleapis.com/auth/drive.file";

// Function to handle OAuth2 flow
function handleAuthClick() {
  chrome.identity.getAuthToken({ interactive: true }, function (token) {
    if (!token) {
      console.error("Error getting auth token:", chrome.runtime.lastError);
      return;
    }
    console.log("Auth token:", token);
    createSheet(token);
  });
}

// Function to create and populate a Google Sheet
function createSheet(token) {
    const sampleArray = [
      { def: "Developer", id: 1, term: "Developer", urld: "https://www.geeksforgeeks.org/how-to-sort-a-dictionary-by-value-in-javascript/", urlt: "https://www.geeksforgeeks.org/how-to-sort-a-dictionary-by-value-in-javascript/" },
      { def: "Nested", id: 2, term: "Nested", urld: "https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_nested", urlt: "https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_nested" },
      { def: "Asynchronous", id: 3, term: "Async", urld: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises", urlt: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await" },
      { def: "Callback", id: 4, term: "Callback", urld: "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function", urlt: "https://www.javascripttutorial.net/javascript-callback/" },
      { def: "Closure", id: 5, term: "Closure", urld: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures", urlt: "https://www.freecodecamp.org/news/javascript-closures-explained/" },
      { def: "Hoisting", id: 6, term: "Hoisting", urld: "https://www.javascripttutorial.net/javascript-hoisting/", urlt: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting" },
      { def: "Promise", id: 7, term: "Promise", urld: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise", urlt: "https://www.digitalocean.com/community/tutorials/understanding-javascript-promises" },
      { def: "Event Loop", id: 8, term: "Event Loop", urld: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop", urlt: "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/" },
      { def: "Debounce", id: 9, term: "Debounce", urld: "https://www.freecodecamp.org/news/javascript-debounce-example/", urlt: "https://css-tricks.com/debouncing-throttling-explained-examples/" },
      { def: "Throttle", id: 10, term: "Throttle", urld: "https://www.sitepoint.com/throttle-scroll-events/", urlt: "https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript" }
    ];
  
    // Add a header row
    const header = ["Definition", "Term", "URL Definition", "URL Term"];
  
    // Convert the array of objects to CSV format, excluding the 'id' field
    const csvData = [
      header.join(","),
      ...sampleArray.map(row =>
        [row.def, row.term, row.urld, row.urlt].join(",")
      )
    ].join("\n");
  
    // Create a new Google Sheet
    fetch('https://sheets.googleapis.com/v4/spreadsheets', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ properties: { title: "User's Sheet" } }),
    })
      .then(response => response.json())
      .then(data => {
        const sheetId = data.spreadsheetId;
        console.log('Spreadsheet ID:', sheetId);
  
        // Update the Google Sheet with CSV data
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Sheet1!A1:append?valueInputOption=RAW`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            range: 'Sheet1!A1',
            majorDimension: 'ROWS',
            values: [header, ...sampleArray.map(row => [row.def, row.term, row.urld, row.urlt])]
          }),
        })
          .then(() => {
            window.open(`https://docs.google.com/spreadsheets/d/${sheetId}`, '_blank');
          });
      })
      .catch(error => console.error('Error:', error));
  }

document
  .getElementById("exportButton")
  .addEventListener("click", handleAuthClick);
