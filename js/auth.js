const loginForm = document.getElementById("loginForm");

/* =========================
   LOGIN
========================= */

if (loginForm) {
  loginForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document
      .getElementById("teacherId")
      .value.trim();

    const password = document
      .getElementById("teacherPassword")
      .value.trim();

    const errorText = document.getElementById("loginError");

    errorText.textContent = "";

    const { data, error } =
      await supabaseClient.auth.signInWithPassword({
        email: email,
        password: password,
      });

    if (error) {
      errorText.textContent =
        "Имэйл эсвэл нууц үг буруу байна.";
      return;
    }

    window.location.href = "training.html";
  });
}

/* =========================
   CURRENT USER
========================= */

async function getCurrentTeacher() {
  const { data, error } =
    await supabaseClient.auth.getUser();

  if (error) {
    console.error(error);
    return null;
  }

  return data.user;
}

/* =========================
   LOGOUT
========================= */

async function logoutTeacher() {
  const { error } =
    await supabaseClient.auth.signOut();

  if (error) {
    console.error(error);
  }

  window.location.href = "training.html";
}