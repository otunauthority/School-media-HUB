// ============================================
//  ADD YOUR REAL FILES HERE
// ============================================
const mediaFiles = [
  {
    id: 1,
    title: "SM(Min 1)",
    subject: "Social Ministry",
    type: "video",
    filename: "SMD 1.mp4",
    folder: "videos",
    description: "A very impactful dramma presentation.",
    size: "414 MB",
    duration: "07:18"
  },
  {
    id: 2,
    title: "SM(Min 2)",
    subject: "Social Ministry",
    type: "video",
    filename: "SMD 2.mp4",
    folder: "videos",
    description: "A very impactful dramma presentation.",
    size: "610 MB",
    duration: "10:12"
  },
  {
    id: 3,
    title: "SMD SPIRITUAL LIFE",
    subject: "Social Ministry",
    type: "video",
    filename: "SMD SPIRITUAL LIFE .MOV",
    folder: "videos",
    description: "A very impactful dramma presentation.",
    size: "793 mb",
    duration: "14:00"
  },
  {
    id: 4,
    title: "VOL ORIGINALiTY MIN",
    subject: "Voice of Life",
    type: "video",
    filename: "VOL ORIGINAL MIN .MOV",
    folder: "videos",
    description: "A very powerful ministration.",
    size: "339 mb",
    duration: "05:59"
  },
 
  
  {
    id: 4,
    title: "Ministry Practicum Audio",
    subject: "Ministry",
    type: "audio",
    filename: "ministry-practicum.mp3",
    folder: "audios",
    description: "Practical guidance for pastoral ministry.",
    size: "12 MB",
    duration: "15:30"
  }
  // Add more files following the same pattern
];

// ============================================
//  Do not edit below unless necessary
// ============================================

const mediaGrid = document.getElementById("mediaGrid");
const searchInput = document.getElementById("searchInput");
const typeFilter = document.getElementById("typeFilter");
const subjectFilter = document.getElementById("subjectFilter");
const noResults = document.getElementById("noResults");

const playerModal = document.getElementById("playerModal");
const closeModal = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const playerContainer = document.getElementById("playerContainer");
const modalDownload = document.getElementById("modalDownload");

function createCard(item) {
  const card = document.createElement("div");
  card.className = "media-card";

  const filePath = `${item.folder}/${item.filename}`;

  card.innerHTML = `
    <div class="content">
      <span class="type-badge ${item.type}">${item.type}</span>
      <h3>${item.title}</h3>
      <div class="meta">
        ${item.subject} • ${item.duration || ""} • ${item.size || ""}
      </div>
      <p class="description">${item.description || ""}</p>
      <div class="btn-group">
        <button class="play-btn" data-id="${item.id}">
          ${item.type === "video" ? "Watch" : "Play"}
        </button>
        <a href="${filePath}" class="download-btn" download="${item.filename}">
          Download
        </a>
      </div>
    </div>
  `;

  card.querySelector(".play-btn").addEventListener("click", () => {
    openPlayer(item);
  });

  return card;
}

function openPlayer(item) {
  const filePath = `${item.folder}/${item.filename}`;

  modalTitle.textContent = item.title;
  modalDownload.href = filePath;
  modalDownload.download = item.filename;
  modalDownload.textContent = `Download ${item.type === "video" ? "Video" : "Audio"}`;

  playerContainer.innerHTML = "";

  if (item.type === "video") {
    const video = document.createElement("video");
    video.controls = true;
    video.src = filePath;
    video.style.width = "100%";
    playerContainer.appendChild(video);
  } else {
    const audio = document.createElement("audio");
    audio.controls = true;
    audio.src = filePath;
    audio.style.width = "100%";
    playerContainer.appendChild(audio);
  }

  playerModal.style.display = "block";
}

function closePlayer() {
  playerModal.style.display = "none";
  const media = playerContainer.querySelector("video, audio");
  if (media) {
    media.pause();
    media.src = "";
  }
}

function renderMedia(list) {
  mediaGrid.innerHTML = "";

  if (list.length === 0) {
    noResults.style.display = "block";
    return;
  }

  noResults.style.display = "none";
  list.forEach(item => {
    mediaGrid.appendChild(createCard(item));
  });
}

function filterMedia() {
  const search = searchInput.value.toLowerCase().trim();
  const type = typeFilter.value;
  const subject = subjectFilter.value;

  const filtered = mediaFiles.filter(item => {
    const matchesSearch =
      item.title.toLowerCase().includes(search) ||
      item.subject.toLowerCase().includes(search) ||
      (item.description && item.description.toLowerCase().includes(search));

    const matchesType = type === "all" || item.type === type;
    const matchesSubject = subject === "all" || item.subject === subject;

    return matchesSearch && matchesType && matchesSubject;
  });

  renderMedia(filtered);
}

searchInput.addEventListener("input", filterMedia);
typeFilter.addEventListener("change", filterMedia);
subjectFilter.addEventListener("change", filterMedia);
closeModal.addEventListener("click", closePlayer);

window.addEventListener("click", (e) => {
  if (e.target === playerModal) {
    closePlayer();
  }
});

renderMedia(mediaFiles);
