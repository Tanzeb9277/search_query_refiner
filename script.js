let refinedQuery = "";
let selectedButton = null;
let selectedBias = "";
let selectedCategory = "";

function generateQuery(category, btn) {
    selectedCategory = category;
    
    if (selectedButton) {
        selectedButton.classList.remove("selected");
    }
    btn.classList.add("selected");
    selectedButton = btn;
    
    if (category === "political") {
        document.getElementById("biasSelection").style.display = "block";
    } else {
        document.getElementById("biasSelection").style.display = "none";
    }
}

function selectBias(bias, btn) {
    selectedBias = bias;
    document.querySelectorAll("#biasSelection .btn--container").forEach(el => el.classList.remove("selected"));
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
    
    if (selectedCategory === "medical") {
        refinedQuery += " site:gov OR site:edu OR site:org OR site:who.int";
    } else if (selectedCategory === "political") {
        if (selectedBias === "left") {
            refinedQuery += " site:nytimes.com OR site:theguardian.com OR site:msnbc.com OR site:huffpost.com OR site:vox.com";
        } else if (selectedBias === "center") {
            refinedQuery += " site:reuters.com OR site:bbc.com OR site:apnews.com OR site:npr.org OR site:usatoday.com";
        } else if (selectedBias === "right") {
            refinedQuery += " site:foxnews.com OR site:theepochtimes.com OR site:breitbart.com OR site:thedailywire.com OR site:washingtonexaminer.com";
        }
    }
    
    document.getElementById("output").innerText = "Refined Query: " + refinedQuery;
}

function copyToClipboard() {
    if (!refinedQuery) return;
    navigator.clipboard.writeText(refinedQuery);
    let copyButton = document.querySelector(".btn--container[onclick='copyToClipboard()'] button");
    copyButton.innerText = "Copied!";
    setTimeout(() => { copyButton.innerText = "Copy"; }, 2000);
}

function searchGoogle() {
    if (!refinedQuery) return;
    window.open("https://www.google.com/search?q=" + encodeURIComponent(refinedQuery), "_blank");
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
