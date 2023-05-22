function registerUser(username, password) {
const user = {
  username: username,
  password: password
};

localStorage.setItem(username, JSON.stringify(user));
alert("Đăng ký thành công!");
}
// Xử lý sự kiện submit form đăng ký
const signupForm = document.getElementById("signupForm");
if (signupForm) {
signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username.trim() === "" || password.trim() === "") {
    alert("Vui lòng điền đầy đủ thông tin đăng ký.");
    return;
  }

  const existingUser = localStorage.getItem(username);
  if (existingUser) {
    alert("Tên người dùng đã tồn tại. Vui lòng chọn tên khác.");
    return;
  }

  registerUser(username, password);
  window.location.href = "login.html";
});
}