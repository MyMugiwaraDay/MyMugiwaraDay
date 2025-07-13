async function findMatch() {
  const inputDate = document.getElementById("birthday").value;
  if (!inputDate) return alert("Please enter your birth date.");

  const characters = await fetch('characters.json').then(res => res.json());
  const chapters = await fetch('chapters.json').then(res => res.json());
  const episodes = await fetch('episodes.json').then(res => res.json());

  const [year, month, day] = inputDate.split("-");
  const dateStr = `${parseInt(month)}-${parseInt(day)}`;

  // Find characters with matching birthday
  const matchedCharacters = characters.filter(c => c.birthday === dateStr);

  // Find closest chapter to birthday
  const closestChapter = chapters.reduce((prev, curr) => {
    return Math.abs(new Date(curr.date) - new Date(inputDate)) <
           Math.abs(new Date(prev.date) - new Date(inputDate)) ? curr : prev;
  });

  // Find closest episode to birthday
  const closestEpisode = episodes.reduce((prev, curr) => {
    return Math.abs(new Date(curr.date) - new Date(inputDate)) <
           Math.abs(new Date(prev.date) - new Date(inputDate)) ? curr : prev;
  });

  let result = "";
  if (matchedCharacters.length > 0) {
    result += `<h3>Characters born on your birthday:</h3><ul>`;
    matchedCharacters.forEach(c => {
      result += `<li>${c.name}</li>`;
    });
    result += `</ul>`;
  } else {
    result += `<p>No characters found with that birthday.</p>`;
  }

  result += `<h3>Closest released manga chapter to your birthday:</h3>`;
  result += `<p><strong>Chapter ${closestChapter.chapter}:</strong> ${closestChapter.title} (${closestChapter.date})</p>`;

  result += `<h3>Closest released anime episode to your birthday:</h3>`;
  result += `<p><strong>Episode ${closestEpisode.episode}:</strong> ${closestEpisode.title} (${closestEpisode.date})</p>`;

  document.getElementById("result").innerHTML = result;
}
