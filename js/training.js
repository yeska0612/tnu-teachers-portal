const defaultMaterials = [
  {
    category: "Түүх",
    grade: "10-р анги",
    title: "Монголын тусгаар тогтнолын түүх",
    description: "Ээлжит хичээлийн төлөвлөгөө болон сурагчийн ажлын хуудас.",
    teacher: "Б. Энхтуяа",
    date: "2026.04.20",
    fileType: "PDF",
    fileData: "#",
    visibility: "public"
  },
  {
    category: "Нийгэм судлал",
    grade: "11-р анги",
    title: "Хүний эрх ба үүрэг",
    description: "Нэгж хичээлийн хөтөлбөр, хэлэлцүүлгийн асуулт, үнэлгээний рубрик.",
    teacher: "Д. Мөнх-Эрдэнэ",
    date: "2026.04.18",
    fileType: "DOC",
    fileData: "#",
    visibility: "private"
  },
  {
    category: "Иргэний боловсрол",
    grade: "9-р анги",
    title: "Иргэний оролцооны хэлбэрүүд",
    description: "Хичээлийн слайд, багаар ажиллах даалгавар, дүгнэлтийн асуулт.",
    teacher: "П. Номин",
    date: "2026.04.15",
    fileType: "PPT",
    fileData: "#",
    visibility: "public"
  }
];

let materials = JSON.parse(localStorage.getItem("materials")) || defaultMaterials;
let currentFilter = "Бүгд";
let visibleCount = 4;
let isExpanded = false;

const currentTeacher = getCurrentTeacher();

const materialGrid = document.getElementById("materialGrid");
const materialForm = document.getElementById("materialForm");
const searchInput = document.getElementById("searchInput");
const seeMoreBtn = document.getElementById("seeMoreBtn");
const uploadBox = document.getElementById("uploadBox");
const authStatus = document.getElementById("authStatus");
const materialInfoText = document.getElementById("materialInfoText");
const loginNav = document.getElementById("loginNav");
const logoutNav = document.getElementById("logoutNav");
const cancelEditBtn = document.getElementById("cancelEditBtn");
const formTitle = document.getElementById("formTitle");

function initAuthUI() {
  if (currentTeacher) {
    uploadBox.style.display = "block";
    loginNav.style.display = "none";
    logoutNav.style.display = "inline-block";

    authStatus.innerHTML = `
      <div class="status-box teacher">
        <strong>${currentTeacher.name}</strong> багшаар нэвтэрсэн байна.
        Та бүх материалыг харах, нэмэх, засах, устгах боломжтой.
      </div>
    `;

    materialInfoText.textContent = "Та нэвтэрсэн тул public болон private бүх материалууд харагдаж байна.";
  } else {
    uploadBox.style.display = "none";
    loginNav.href = "login.html";
    logoutNav.style.display = "none";

    authStatus.innerHTML = `
      <div class="status-box public">
        Та энгийн хэрэглэгчээр үзэж байна. Зөвхөн public материалууд харагдана.
        <a href="login.html">Багш нэвтрэх</a>
      </div>
    `;

    materialInfoText.textContent = "Public сургалтын материалууд харагдаж байна.";
  }
}

logoutNav.addEventListener("click", function(event) {
  event.preventDefault();
  logoutTeacher();
});

function saveMaterials() {
  localStorage.setItem("materials", JSON.stringify(materials));
}

function getTodayDate() {
  const today = new Date();
  return `${today.getFullYear()}.${String(today.getMonth() + 1).padStart(2, "0")}.${String(today.getDate()).padStart(2, "0")}`;
}

function getFileType(fileName) {
  if (!fileName) return "FILE";

  const ext = fileName.split(".").pop().toUpperCase();

  if (ext === "PDF") return "PDF";
  if (ext === "DOC" || ext === "DOCX") return "DOC";
  if (ext === "PPT" || ext === "PPTX") return "PPT";
  if (ext === "XLS" || ext === "XLSX") return "XLS";

  return ext;
}

function getFileColor(type) {
  if (type === "PDF") return "blue";
  if (type === "DOC") return "green";
  if (type === "PPT") return "orange";
  if (type === "XLS") return "purple";
  return "gray";
}

function getVisibleMaterials() {
  const keyword = searchInput.value.toLowerCase().trim();

  return materials.filter(function(material) {
    const permissionOk = currentTeacher || material.visibility === "public";
    const filterOk = currentFilter === "Бүгд" || material.category === currentFilter;

    const searchOk =
      material.title.toLowerCase().includes(keyword) ||
      material.description.toLowerCase().includes(keyword) ||
      material.teacher.toLowerCase().includes(keyword) ||
      material.grade.toLowerCase().includes(keyword);

    return permissionOk && filterOk && searchOk;
  });
}

function renderMaterials() {
  const visibleMaterials = getVisibleMaterials();

  materialGrid.innerHTML = "";

  const list = isExpanded ? visibleMaterials : visibleMaterials.slice(0, visibleCount);

  if (list.length === 0) {
    materialGrid.innerHTML = `
      <div class="empty-message">
        <h3>Материал олдсонгүй</h3>
        <p>Одоогоор харагдах материал байхгүй байна.</p>
      </div>
    `;
    seeMoreBtn.style.display = "none";
    return;
  }

  list.forEach(function(material) {
    const realIndex = materials.indexOf(material);
    const fileColor = getFileColor(material.fileType);

    const card = document.createElement("div");
    card.className = "material-card";

    card.innerHTML = `
      <div class="file-type ${fileColor}">${material.fileType}</div>

      <div class="material-content">
        <div class="material-topline">
          <span>${material.category} • ${material.grade}</span>
          <em class="${material.visibility === "public" ? "public-tag" : "private-tag"}">
            ${material.visibility === "public" ? "Public" : "Private"}
          </em>
        </div>

        <h3>${material.title}</h3>
        <p>${material.description}</p>

        <div class="material-meta">
          <small>${material.teacher}</small>
          <small>${material.date}</small>
        </div>

        <div class="material-actions">
          <a href="${material.fileData}" class="view-btn" target="_blank">Материал харах</a>

          ${
            currentTeacher
              ? `
                <button class="edit-btn" onclick="editMaterial(${realIndex})">Засах</button>
                <button class="delete-btn" onclick="deleteMaterial(${realIndex})">Устгах</button>
              `
              : ""
          }
        </div>
      </div>
    `;

    materialGrid.appendChild(card);
  });

  if (visibleMaterials.length > visibleCount) {
    seeMoreBtn.style.display = "inline-block";
    seeMoreBtn.textContent = isExpanded ? "Show less" : "See more...";
  } else {
    seeMoreBtn.style.display = "none";
  }
}

document.querySelectorAll(".filter-buttons button").forEach(function(button) {
  button.addEventListener("click", function() {
    document.querySelectorAll(".filter-buttons button").forEach(function(btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    currentFilter = button.dataset.filter;
    isExpanded = false;
    renderMaterials();
  });
});

searchInput.addEventListener("input", function() {
  isExpanded = false;
  renderMaterials();
});

seeMoreBtn.addEventListener("click", function() {
  isExpanded = !isExpanded;
  renderMaterials();
});

materialForm.addEventListener("submit", function(event) {
  event.preventDefault();

  if (!currentTeacher) {
    alert("Материал нэмэхийн тулд багшаар нэвтэрнэ үү.");
    return;
  }

  const editIndex = document.getElementById("editIndex").value;
  const file = document.getElementById("materialFile").files[0];

  const materialData = {
    category: document.getElementById("materialCategory").value,
    grade: document.getElementById("materialGrade").value,
    title: document.getElementById("materialTitle").value,
    description: document.getElementById("materialDescription").value,
    teacher: currentTeacher.name,
    date: getTodayDate(),
    visibility: document.getElementById("materialVisibility").value
  };

  if (file) {
    const reader = new FileReader();

    reader.onload = function() {
      materialData.fileType = getFileType(file.name);
      materialData.fileData = reader.result;

      saveMaterialData(editIndex, materialData);
    };

    reader.readAsDataURL(file);
  } else {
    if (editIndex === "") {
      alert("Шинэ материал нэмэхдээ файл сонгоно уу.");
      return;
    }

    materialData.fileType = materials[editIndex].fileType;
    materialData.fileData = materials[editIndex].fileData;

    saveMaterialData(editIndex, materialData);
  }
});

function saveMaterialData(editIndex, materialData) {
  if (editIndex === "") {
    materials.unshift(materialData);
  } else {
    materials[editIndex] = materialData;
  }

  saveMaterials();
  resetForm();
  renderMaterials();
}

function editMaterial(index) {
  const material = materials[index];

  formTitle.textContent = "Материал засах";
  document.getElementById("editIndex").value = index;
  document.getElementById("materialCategory").value = material.category;
  document.getElementById("materialGrade").value = material.grade;
  document.getElementById("materialTitle").value = material.title;
  document.getElementById("materialDescription").value = material.description;
  document.getElementById("materialVisibility").value = material.visibility;

  window.scrollTo({
    top: uploadBox.offsetTop - 100,
    behavior: "smooth"
  });
}

function deleteMaterial(index) {
  const ok = confirm("Энэ материалыг устгах уу?");

  if (!ok) return;

  materials.splice(index, 1);
  saveMaterials();
  renderMaterials();
}

function resetForm() {
  materialForm.reset();
  document.getElementById("editIndex").value = "";
  formTitle.textContent = "Шинэ материал нэмэх";
}

cancelEditBtn.addEventListener("click", resetForm);

initAuthUI();
renderMaterials();