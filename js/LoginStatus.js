    function checkLoginStatus() {
		var user = localStorage.getItem("user");
  		if (user) {
		user = JSON.parse(user);
		var loginLi = document.getElementById("loginLi");
		var logoutLi = document.getElementById("logoutLi");
		if (loginLi && logoutLi) {
		var userName = user.username;
		loginLi.innerHTML = "<a href='#'><i class='fa fa-user' aria-hidden='true'></i>Xin chào, " + userName + "</a>";
		logoutLi.style.display = "inline-block";
			signLi.style.display="none";
			logoutLi.innerHTML = "<a href='#' onclick='logout()'><i class='fa fa-sign-out' aria-hidden='true'></i>Đăng Xuất</a>";
			logoutLi.getElementsByTagName("a")[0].innerText = "Đăng Xuất";
			logoutLi.getElementsByTagName("a")[0].innerHTML += " <i class='fa fa-sign-out' aria-hidden='true'></i>";
			logoutLi.getElementsByTagName("a")[0].addEventListener("click", logout);
			logoutLi.getElementsByTagName("a")[0].setAttribute("href", "#");
			}
		}
	}
	function logout() {
		localStorage.removeItem("user");
		alert("Đăng xuất thành công");
		window.location.href = "index.html";
	}
		checkLoginStatus();