document.getElementById("exportButton").addEventListener("click", async () => {
  const exportButton = document.getElementById("exportButton");

  exportButton.textContent = "Exporting...";

  try {
    await exporty();
  } catch (error) {
    console.error("Error:", error);
  } finally {
    exportButton.textContent = "Export to Google Sheets";
  }
});

async function exporty() {
    const url =
      "https://script.google.com/macros/library/d/1VmejGxMniLPBkLyu1QEYuTdpv6ihpArd9S5wGtw3xVypySGj6FWQMQqa/1"; // Replace with your Web Apps URL
  
    const sampleArray = [
      {
        def: "Developer",
        id: 1,
        term: "Developer",
        urld: "https://www.geeksforgeeks.org/how-to-sort-a-dictionary-by-value-in-javascript/",
        urlt: "https://www.geeksforgeeks.org/how-to-sort-a-dictionary-by-value-in-javascript/",
      },
      {
        def: "Nested",
        id: 2,
        term: "Nested",
        urld: "https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_nested",
        urlt: "https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_nested",
      },
      {
        def: "Asynchronous",
        id: 3,
        term: "Async",
        urld: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises",
        urlt: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Async_await",
      },
      {
        def: "Callback",
        id: 4,
        term: "Callback",
        urld: "https://developer.mozilla.org/en-US/docs/Glossary/Callback_function",
        urlt: "https://www.javascripttutorial.net/javascript-callback/",
      },
      {
        def: "Closure",
        id: 5,
        term: "Closure",
        urld: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures",
        urlt: "https://www.freecodecamp.org/news/javascript-closures-explained/",
      },
      {
        def: "Hoisting",
        id: 6,
        term: "Hoisting",
        urld: "https://www.javascripttutorial.net/javascript-hoisting/",
        urlt: "https://developer.mozilla.org/en-US/docs/Glossary/Hoisting",
      },
      {
        def: "Promise",
        id: 7,
        term: "Promise",
        urld: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise",
        urlt: "https://www.digitalocean.com/community/tutorials/understanding-javascript-promises",
      },
      {
        def: "Event Loop",
        id: 8,
        term: "Event Loop",
        urld: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/EventLoop",
        urlt: "https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/",
      },
      {
        def: "Debounce",
        id: 9,
        term: "Debounce",
        urld: "https://www.freecodecamp.org/news/javascript-debounce-example/",
        urlt: "https://css-tricks.com/debouncing-throttling-explained-examples/",
      },
      {
        def: "Throttle",
        id: 10,
        term: "Throttle",
        urld: "https://www.sitepoint.com/throttle-scroll-events/",
        urlt: "https://www.telerik.com/blogs/debouncing-and-throttling-in-javascript",
      },
    ];
  
    const header = ["Definition", "Term", "URL Definition", "URL Term"];
  
    const csvData = [
      header.join(","),
      ...sampleArray.map((row) =>
        [row.def, row.term, row.urld, row.urlt].join(",")
      ),
    ].join("\n");
  
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      body: csvData,
      mode: "cors",
    });
  
    const responseUrl = await response.text();
    window.open(responseUrl, "_blank");
  }