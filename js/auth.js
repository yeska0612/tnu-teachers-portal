const teacherAccounts = [
  {
    id: "teacher01",
    password: "1234",
    name: "М. Соёл-Эрдэнэ",
    email: "erdeneb967@gmail.com"
  },
  {
    id: "teacher02",
    password: "1234",
    name: "М. Едил",
    email: "m.edil999999@gmail.com"
  },
  {
    id: "teacher03",
    password: "1234",
    name: "Т. Оюунчимэг",
    email: "oyunchimeg@school.mn"
  },
  {
    id: "teacher04",
    password: "1234",
    name: "С. Баасанжаргал",
    email: "baasanjargal2000@gmail.com"
  },
  {
    id: "teacher05",
    password: "1234",
    name: "Д. Должинсүрэн",
    email: "doljinsurend89@gmail.com"
  },
  {
    id: "teacher06",
    password: "1234",
    name: "М. Саранчимэг",
    email: "sars2372@gmail.com"
  },
  {
    id: "teacher07",
    password: "1234",
    name: "Д. Одонтуяа",
    email: "odnood45@gmail.com"
  }
];

const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const id = document.getElementById("teacherId").value.trim();
    const password = document.getElementById("teacherPassword").value.trim();
    const error = document.getElementById("loginError");

    const teacher = teacherAccounts.find(function(account) {
      return account.id === id && account.password === password;
    });

    if (!teacher) {
      error.textContent = "ID эсвэл нууц үг буруу байна.";
      return;
    }

    localStorage.setItem("currentTeacher", JSON.stringify(teacher));
    window.location.href = "training.html";
  });
}

function getCurrentTeacher() {
  return JSON.parse(localStorage.getItem("currentTeacher"));
}

function logoutTeacher() {
  localStorage.removeItem("currentTeacher");
  window.location.href = "training.html";
}