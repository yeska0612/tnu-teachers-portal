const teachers = [
  {
    name: "М. Соёл-Эрдэнэ",
    subject: "Утга зохиол-Түүхийн багш",
    role: "ТНУ бүлгийн ахлагч",
    image: "images/soylerdene.jpg",
    experience: "7 жилийн багшлах туршлагатай.",
    education: "МУБИС-МОСС-ийг Утга зохиол-Түүхийн багш мэргэжлээр төгссөн.",
    lessons: "Түүх, Иргэний ёс зүйн боловсрол ",
    skill:
      "Түүхэн эх сурвалж дээр ажиллуулах арга зүй сайтай, Сурагчдын судалгааны чадварыг хөгжүүлэхэд чиглэн ажилладаг, Орчин үеийн сургалтын технологи (презентаци, дижитал хэрэглүүр) ашиглах чадвартай",
    about:
      "Мэргэжлийн зэрэг: Заах аргач <br> Боловсролын зэрэг: Магистр",
    contact: "erdeneb967@gmail.com",
  },
  {
    name: "М. Едил",
    subject: "Түүх, Нийгэм ухаан, Иргэний боловсролын багш",
    role: "ТНУ бүлгийн багш",
    image: "images/edil.jpg",
    experience: "7 жилийн багшлах туршлагатай.",
    education: "МУИС-Баруун бүсийн сургууль, Нийгэм-Эрх зүйн багш",
    lessons: "Нийгэм судлал, Иргэний ёс зүйн боловсрол",
    skill:
      "Мэтгэлцээн, хэлэлцүүлэг, кейс дээр суурилсан сургалт зохион байгуулах.",
    about:
      "Мэргэжлийн зэрэг: Заах аргач <br> Боловсролын зэрэг: Бакалавр",
    contact: "m.edil999999@gmail.com",
  },
  {
    name: "Т. Оюунчимэг",
    subject: "Нийгмийн ухааны багш",
    role: "ТНУ бүлгийн багш",
    image: "images/oyunchimeg.jpg",
    experience: "9 жилийн багшлах туршлагатай.",
    education: "МУИС-Баруун бүсийн сургууль, Нийгэм-Эрх зүйн багш ",
    lessons: "Нийгэм судлал, Иргэний ёс зүйн боловсрол",
    skill:
      "Эх сурвалж дээр ажиллуулах, сурагчдын судалгааны чадварыг хөгжүүлэх.",
    about:
      "Мэргэжлийн зэрэг: Заах аргач <br> Боловсролын зэрэг: Бакалавр",
    contact: "oyunchimeg@school.mn",
  },
  {
    name: "С. Баасанжаргал",
    subject: "Түүх нийгмийн ухааны багш",
    role: "ТНУ бүлгийн багш",
    image: "images/baasanjargal.jpg",
    experience: "1 жилийн багшлах туршлагатай.",
    education: "МУБИС, Түүх нийгмийн ухааны багш мэргэжилтэй",
    lessons: "Түүх, Нийгэм судлал , Иргэний ёс зүйн боловсрол",
    skill:
      "Түүхэн эх сурвалж, баримт бичигт дүн шинжилгээ хийх,  Сурагчдын шүүмжлэлт сэтгэлгээ хөгжүүлэх, Хэлэлцүүлэг мэтгэлцээн зохион байгуулах, Иргэний боловсрол үнэт зүйл төлөвшүүлэх, Хичээлийг сонирхолтой бүтээлч аргаар заах, Багийн ажил болон хамтын сургалтыг зохион байгуулах, Үнэлгээ дүгнэлт хийх орчин үеийн арга хэрэглэх",
    about:
      "Боловсролын зэрэг: Бакалавр",
    contact: "baasanjargal2000@gmail.com",
  },
  {
    name: "Д. Должинсүрэн",
    subject: "Түүхч , Түүхийн багш, Соёлын жуулчлалын менежер",
    role: "ТНУ бүлгийн багш",
    image: "images/doljin.jpg",
    experience: "17 жилийн багшлах туршлагатай.",
    education: "Хархориум их сургууль төгссөн.",
    lessons: "Монголын түүх, Дэлхийн түүх, Иргэний ёс зүйн боловсрол",
    skill: "Түүхэн он тоолол дээр ажиллах, Эх сурвалжтай ажиллах, Сурагчдын ярих илгэх чадварыг хөгжүүлэх",
    about:
      "Мэргэжлийн зэрэг: Тэргүүлэх <br> Боловсролын зэрэг: Бакалавр",
    contact: "doljinsurend89@gmail.com",
  },
  {
    name: "М. Саранчимэг",
    subject: "Түүх-нийгэм ухааны багш, Хүний нөөцийн менежер",
    role: "ТНУ бүлгийн багш",
    image: "images/sarancimeg.jpg",
    experience: "Хүний нөөцийн менежер 2 жил, Дотоод аудитын газрын мэргэжилтэн 2 жил, Түүх-нийгэм багшаар 2 жил.",
    education: "Ховд Их сургуулийг Түүх-Нийгэм судлалын багш, Менежер карьерын институтыг Хүний нөөцийн менежерээр тус тус төгссөн",
    lessons: "Түүх, Нийгэм судлал , Иргэний ёс зүйн боловсрол",
    skill: "Түүхэн эх сурвалж болон бодит кейс амьдралтай харьцуулж ажиллуулах арга зүйтэй, Орчин үеийн сургалтын технологи (презентаци, дижитал хэрэглүүр) ашиглах чадвартай",
    about:
      " Боловсролын зэрэг: Бакалавр",
    contact: "sars2372@gmail.com",
  },
  {
    name: "Д. Одонтуяа",
    subject: "Нийгэм ухааны багш",
    role: "ТНУ бүлгийн багш",
    image: "images/odontuya.jpg",
    experience: "3 жилийн багшлах туршлагатай.",
    education: "МУБИС Нийгмийн ухааны багш мэргэжлээр төгссөн.",
    lessons: "Нийгэм судлал, Иргэний ёс зүйн боловсрол",
    skill: "Сурагчдад шүүмжлэлт сэтгэлгээ, нийгмийн ойлголт, иргэний хариуцлагыг төлөвшүүлэхэд чиглэсэн.",
    about:
      "Боловсролын зэрэг: Бакалавр",
    contact: "odnood45@gmail.com",
  },
];

const teachersGrid = document.getElementById("teachersGrid");

function renderTeachers() {
  teachersGrid.innerHTML = "";

  teachers.forEach(function (teacher, index) {
    const teacherCard = document.createElement("div");
    teacherCard.className = "teacher-person";
    teacherCard.onclick = function () {
      openTeacherModal(index);
    };

    teacherCard.innerHTML = `
      <div class="teacher-photo-wrap">
        <img src="${teacher.image}" alt="${teacher.name}">
      </div>

      <h3 class="${index === 0 ? "teacher-main-name" : ""}">
        ${teacher.name}
      </h3>

      <p>${teacher.role}</p>
    `;

    teachersGrid.appendChild(teacherCard);
  });
}

function openTeacherModal(index) {
  const teacher = teachers[index];

  document.getElementById("modalImage").src = teacher.image;
  document.getElementById("modalName").textContent = teacher.name;
  document.getElementById("modalSubject").textContent = teacher.subject;
  document.getElementById("modalRole").textContent = teacher.role;
  document.getElementById("modalExperience").textContent = teacher.experience;
  document.getElementById("modalEducation").textContent = teacher.education;
  document.getElementById("modalLessons").textContent = teacher.lessons;
  document.getElementById("modalSkill").textContent = teacher.skill;
  document.getElementById("modalAbout").innerHTML  = teacher.about;
  document.getElementById("modalContact").textContent = teacher.contact;

  document.getElementById("teacherModal").classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeTeacherModal() {
  document.getElementById("teacherModal").classList.remove("show");
  document.body.style.overflow = "auto";
}

window.addEventListener("click", function (event) {
  const modal = document.getElementById("teacherModal");

  if (event.target === modal) {
    closeTeacherModal();
  }
});

renderTeachers();
