let currentTeacher = null;
let materials = [];
let currentFilter = "Бүгд";
let isExpanded = false;
let visibleCount = 4;
let editingId = null;
let editingFilePath = null;

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
const previewModal = document.getElementById("previewModal");
const previewFrame = document.getElementById("previewFrame");
const previewTitle = document.getElementById("previewTitle");
const closePreviewBtn = document.getElementById("closePreviewBtn");
const previewOverlay = document.getElementById("previewOverlay");

function getTeacherDisplayName(user) {
  const teacherNames = {
    "erdeneb967@gmail.com": "М. Соёл-Эрдэнэ",
    "m.edil999999@gmail.com": "М. Едил",
    "oyunchimeg@school.mn": "Т. Оюунчимэг",
    "baasanjargal2000@gmail.com": "С. Баасанжаргал",
    "doljinsurend89@gmail.com": "Д. Должинсүрэн",
    "sars2372@gmail.com": "М. Саранчимэг",
    "odnood45@gmail.com": "Д. Одонтуяа",
  };

  return teacherNames[user.email] || user.email;
}

async function initPage() {
  currentTeacher = await getCurrentTeacher();

  initAuthUI();
  await loadMaterials();
  renderMaterials();
}

function initAuthUI() {
  if (currentTeacher) {
    uploadBox.style.display = "block";
    loginNav.style.display = "none";
    logoutNav.style.display = "inline-block";
    logoutNav.textContent = "Гарах";

    authStatus.innerHTML = `
      <div class="status-box teacher">
        <strong>${getTeacherDisplayName(currentTeacher)}</strong> багшаар нэвтэрсэн байна.
        Та бүх материалыг харах, нэмэх, засах, устгах боломжтой.
      </div>
    `;

    materialInfoText.textContent =
      "Та нэвтэрсэн тул public болон private бүх материалууд харагдаж байна.";
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

    materialInfoText.textContent =
      "Public сургалтын материалууд харагдаж байна.";
  }
}

logoutNav.addEventListener("click", async function (event) {
  event.preventDefault();
  await logoutTeacher();
});

async function loadMaterials() {
  const { data, error } = await supabaseClient
    .from("materials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);

    materialGrid.innerHTML = `
      <div class="empty-message">
        <h3>Алдаа гарлаа</h3>
        <p>Материалуудыг серверээс уншиж чадсангүй.</p>
      </div>
    `;

    return;
  }

  materials = data || [];
}

function getFilteredMaterials() {
  const keyword = searchInput.value.toLowerCase().trim();

  return materials.filter(function (material) {
    const filterOk =
      currentFilter === "Бүгд" || material.category === currentFilter;

    const searchOk =
      material.title.toLowerCase().includes(keyword) ||
      material.description.toLowerCase().includes(keyword) ||
      material.teacher_name.toLowerCase().includes(keyword) ||
      material.grade.toLowerCase().includes(keyword);

    return filterOk && searchOk;
  });
}

function getFileType(fileName) {
  if (!fileName) return "FILE";
  return fileName.split(".").pop().toUpperCase();
}

function getFileColor(type) {
  if (type === "PDF") return "blue";
  if (type === "DOC" || type === "DOCX") return "green";
  if (type === "PPT" || type === "PPTX") return "orange";
  if (type === "XLS" || type === "XLSX") return "purple";
  return "gray";
}

function formatDate(dateValue) {
  const date = new Date(dateValue);

  return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, "0")}.${String(date.getDate()).padStart(2, "0")}`;
}

function getPublicUrl(filePath) {
  if (!filePath) return "#";

  const { data } = supabaseClient.storage
    .from("materials")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

function renderMaterials() {
  const filteredMaterials = getFilteredMaterials();
  const list = isExpanded
    ? filteredMaterials
    : filteredMaterials.slice(0, visibleCount);

  materialGrid.innerHTML = "";

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

  list.forEach(function (material) {
    const fileColor = getFileColor(material.file_type);
    const fileUrl = getPublicUrl(material.file_path);

    const canEdit = currentTeacher && currentTeacher.id === material.teacher_id;

    const card = document.createElement("div");
    card.className = "material-card";

    card.innerHTML = `
      <div class="file-type ${fileColor}">
        ${material.file_type || "FILE"}
      </div>

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
          <small>${material.teacher_name}</small>
          <small>${formatDate(material.created_at)}</small>
        </div>

        <div class="material-actions">
          <button
            class="view-btn"
            onclick="previewMaterial(
              '${fileUrl}',
              '${material.file_type}',
              '${material.title}'
            )">
            Материал харах
          </button>

          ${
            canEdit
              ? `
                <button class="edit-btn" onclick="editMaterial('${material.id}')">Засах</button>
                <button class="delete-btn" onclick="deleteMaterial('${material.id}', '${material.file_path}')">Устгах</button>
              `
              : ""
          }
        </div>
      </div>
    `;

    materialGrid.appendChild(card);
  });

  if (filteredMaterials.length > visibleCount) {
    seeMoreBtn.style.display = "inline-block";
    seeMoreBtn.textContent = isExpanded ? "Show less" : "See more...";
  } else {
    seeMoreBtn.style.display = "none";
  }
}

document.querySelectorAll(".filter-buttons button").forEach(function (button) {
  button.addEventListener("click", function () {
    document.querySelectorAll(".filter-buttons button").forEach(function (btn) {
      btn.classList.remove("active");
    });

    button.classList.add("active");
    currentFilter = button.dataset.filter;
    isExpanded = false;

    renderMaterials();
  });
});

searchInput.addEventListener("input", function () {
  isExpanded = false;
  renderMaterials();
});

seeMoreBtn.addEventListener("click", function () {
  isExpanded = !isExpanded;
  renderMaterials();
});

materialForm.addEventListener("submit", async function (event) {
  event.preventDefault();

  if (!currentTeacher) {
    alert("Материал нэмэхийн тулд багшаар нэвтэрнэ үү.");
    return;
  }

  const file = document.getElementById("materialFile").files[0];

  let filePath = editingFilePath;
  let fileName = null;
  let fileType = null;

  if (file) {

    fileName = file.name;

    fileType =
      file.name.split(".").pop().toUpperCase();

    const extension = file.name.split(".").pop().toLowerCase();

    const safeFileName =
      `${Date.now()}-${crypto.randomUUID()}.${extension}`;

    filePath =
      `${currentTeacher.id}/${safeFileName}`;

    const {
      data: uploadData,
      error: uploadError
    } = await supabaseClient.storage
      .from("materials")
      .upload(filePath, file, {
        upsert: true
      });

    console.log("UPLOAD DATA:", uploadData);
    console.log("UPLOAD ERROR:", uploadError);

    if (uploadError) {

      console.error(uploadError);

      alert(
        "Файл upload хийхэд алдаа гарлаа:\n" +
        uploadError.message
      );

      return;
    }
  }

  if (!editingId && !file) {
    alert("Шинэ материал нэмэхдээ файл сонгоно уу.");
    return;
  }

  const materialData = {
    title: document.getElementById("materialTitle").value,
    description: document.getElementById("materialDescription").value,
    category: document.getElementById("materialCategory").value,
    grade: document.getElementById("materialGrade").value,
    visibility: document.getElementById("materialVisibility").value,

    teacher_id: currentTeacher.id,
    teacher_name: getTeacherDisplayName(currentTeacher),

    file_name: fileName || null,
    file_path: filePath,
    file_type: fileType || getFileType(filePath),
  };

  if (editingId) {
    const { error } = await supabaseClient
      .from("materials")
      .update(materialData)
      .eq("id", editingId);

    if (error) {
      console.error(error);
      alert("Материал засахад алдаа гарлаа.");
      return;
    }
  } else {
    const { error } = await supabaseClient
      .from("materials")
      .insert(materialData);

    if (error) {
      console.error(error);
      alert("Материал хадгалахад алдаа гарлаа.");
      return;
    }
  }

  resetForm();
  await loadMaterials();
  renderMaterials();
});

function editMaterial(id) {
  const material = materials.find(function (item) {
    return item.id === id;
  });

  if (!material) return;

  editingId = material.id;
  editingFilePath = material.file_path;

  formTitle.textContent = "Материал засах";

  document.getElementById("materialCategory").value = material.category;
  document.getElementById("materialGrade").value = material.grade;
  document.getElementById("materialTitle").value = material.title;
  document.getElementById("materialDescription").value = material.description;
  document.getElementById("materialVisibility").value = material.visibility;

  window.scrollTo({
    top: uploadBox.offsetTop - 100,
    behavior: "smooth",
  });
}

async function deleteMaterial(id, filePath) {
  const ok = confirm("Энэ материалыг устгах уу?");

  if (!ok) return;

  const { error } = await supabaseClient
    .from("materials")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    alert("Материал устгахад алдаа гарлаа.");
    return;
  }

  if (filePath) {
    await supabaseClient.storage.from("materials").remove([filePath]);
  }

  await loadMaterials();
  renderMaterials();
}

function resetForm() {
  materialForm.reset();
  editingId = null;
  editingFilePath = null;
  formTitle.textContent = "Шинэ материал нэмэх";
}

cancelEditBtn.addEventListener("click", resetForm);

function previewMaterial(url, type, title) {

  previewTitle.textContent = title;

  const upperType = (type || "FILE").toUpperCase();

  if (upperType === "PDF") {

    previewFrame.src = url;

  } else {

    window.open(url, "_blank");
    return;
  }

  previewModal.classList.add("active");

  document.body.style.overflow = "hidden";
}

function closePreview() {
  previewModal.classList.remove("active");

  previewFrame.src = "";

  document.body.style.overflow = "auto";
}

closePreviewBtn.addEventListener(
  "click",
  closePreview
);

previewOverlay.addEventListener(
  "click",
  closePreview
);

initPage();
