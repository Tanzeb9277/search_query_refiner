let refinedQuery = "";
let selectedButton = null;
let selectedBias = "";

function generateQuery(category, btn) {
    let query = document.getElementById("searchQuery").value;
    if (!query) return;
    
    refinedQuery = query;
    
    if (category === "medical") {
        refinedQuery += " site:gov OR site:edu OR site:org OR site:who.int";
    }
    
    document.getElementById("output").innerText = "Refined Query: " + refinedQuery;
    
    if (selectedButton) {
        selectedButton.classList.remove("selected");
    }
    btn.classList.add("selected");
    selectedButton = btn;
}

function selectBias(bias, btn) {
    selectedBias = bias;
    document.querySelectorAll(".btn--container").forEach(el => el.classList.remove("selected"));
    btn.classList.add("selected");
}

function generateFinalQuery() {
    let query = document.getElementById("searchQuery").value;
    if (!query) return;
    
    let startDate = document.getElementById("startDate").value;
    let endDate = document.getElementById("endDate").value;
    
    refinedQuery = query;
    
    if (startDate) {
        refinedQuery += ` after:${startDate}`;
    }
    if (endDate) {
        refinedQuery += ` before:${endDate}`;
    }
    
    if (selectedBias === "left") {
        refinedQuery += " site:nytimes.com OR site:theguardian.com OR site:msnbc.com OR site:huffpost.com OR site:vox.com";
    } else if (selectedBias === "center") {
        refinedQuery += " site:reuters.com OR site:bbc.com OR site:apnews.com OR site:npr.org OR site:usatoday.com";
    } else if (selectedBias === "right") {
        refinedQuery += " site:foxnews.com OR site:theepochtimes.com OR site:breitbart.com OR site:thedailywire.com OR site:washingtonexaminer.com";
    }
    
    document.getElementById("output").innerText = "Refined Query: " + refinedQuery;
}

function copyToClipboard() {
    if (!refinedQuery) return;
    navigator.clipboard.writeText(refinedQuery);
}

function searchGoogle() {
    if (!refinedQuery) return;
    window.open("https://www.google.com/search?q=" + encodeURIComponent(refinedQuery), "_blank");
}
