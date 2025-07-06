async function searchWord() {
    const word = document.getElementById("searchInput").value.trim();
    const resultDiv = document.getElementById("result");
    const loader = document.getElementById("loader");
    resultDiv.innerHTML = "";
    loader.style.display = "block";
  
    if (!word) {
      loader.style.display = "none";
      resultDiv.innerHTML = "<p>Please enter a word.</p>";
      return;
    }
  
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      if (!response.ok) throw new Error("Word not found");
  
      const data = await response.json();
      const definition = data[0].meanings[0].definitions[0].definition;
      const phonetics = data[0].phonetics[0]?.text || "";
      const audio = data[0].phonetics[0]?.audio || "";
  
      resultDiv.innerHTML = `
        <h2>${data[0].word}</h2>
        
        <p><strong>Definition:</strong> ${definition}</p>
        ${audio ? `<audio controls src="${audio}"></audio>` : ""}
      `;
  
      saveRecentWord(data[0].word);
    } catch (error) {
      resultDiv.innerHTML = `<p>Could not find the word. Please try again.</p>`;
    }
    loader.style.display = "none";
  }
  
  function saveRecentWord(word) {
    let recent = JSON.parse(localStorage.getItem("recentWords")) || [];
    if (!recent.includes(word)) {
      recent.unshift(word);
      if (recent.length > 5) recent.pop();
      localStorage.setItem("recentWords", JSON.stringify(recent));
      showRecentWords();
    }
  }
  
  function showRecentWords() {
    const list = document.getElementById("recentList");
    const recent = JSON.parse(localStorage.getItem("recentWords")) || [];
    list.innerHTML = recent.map(w => `<li>${w}</li>`).join("");
  }
  
  document.getElementById("toggleMode").addEventListener("click", () => {
    document.body.classList.toggle("dark");
  });
  
  document.getElementById("clearRecent").addEventListener("click", () => {
    localStorage.removeItem("recentWords");
    showRecentWords();
  });
  
  window.onload = showRecentWords;
  