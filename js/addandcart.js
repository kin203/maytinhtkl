const addToCartButtons = document.querySelectorAll(".my-cart-btn");
addToCartButtons.forEach((button) => {
button.addEventListener("click", addToCart);
});
function addToCart(event) {
event.preventDefault();
const button = event.target;
const productId = button.getAttribute("data-id");
const productName = button.getAttribute("data-name");
const productSummary = button.getAttribute("data-summary");
const productPrice = button.getAttribute("data-price");
const productQuantity = button.getAttribute("data-quantity");
const productImage = button.getAttribute("data-image");

const cartItem = {
id: productId,
name: productName,
summary: productSummary,
price: parseFloat(productPrice),
quantity: parseInt(productQuantity),
image: productImage
};

// Lấy danh sách các sản phẩm đã có trong giỏ hàng 
let cartItems = localStorage.getItem("cartItems");
if (cartItems) {
cartItems = JSON.parse(cartItems);
} else {
cartItems = [];
}

// Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng chưa
const existingItemIndex = cartItems.findIndex((item) => item.id === cartItem.id);
if (existingItemIndex !== -1) {
// Nếu sản phẩm đã tồn tại, tăng số lượng sản phẩm
cartItems[existingItemIndex].quantity += cartItem.quantity;
} else {
// Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới vào giỏ hàng
cartItems.push(cartItem);
}

// Lưu danh sách sản phẩm vào localStorage
localStorage.setItem("cartItems", JSON.stringify(cartItems));

alert("Đã thêm vào giỏ hàng!");
}

// Xử lý sự kiện khi nhấn vào nút "Mở giỏ hàng"
const cartIcon = document.querySelector(".my-cart-icon");
cartIcon.addEventListener("click", openCart);

function openCart() {
  // Lấy danh sách sản phẩm từ localStorage
  let cartItems = localStorage.getItem("cartItems");
  if (cartItems) {
    cartItems = JSON.parse(cartItems);
  } else {
    cartItems = [];
  }

  // Kiểm tra nếu giỏ hàng trống
  if (cartItems.length === 0) {
    alert("Giỏ hàng trống.");
    return;
  }

  const cartPopup = document.createElement("div");
  cartPopup.innerHTML = `
  <div class="cart-popup">
  <h3>Giỏ hàng</h3>
  <ul>
    ${cartItems
      .map(
        (item) =>
          `<li>
             <img src="${item.image}" alt="${item.name}">
             <div>
               <p>Tên: ${item.name}</p>
               <p>Giá: ${item.price}</p>
               <p>Số lượng: <input class="txtsoluong" type="number" min="1" value="${item.quantity}" data-id="${item.id}" class="quantity-input"></p>
			   <button class="remove-item-btn" data-id="${item.id}">Xoá</button>
             </div>
             
           </li>`
      )
      .join("")}
  </ul>
  <p>Tổng đơn hàng: ${calculateTotal(cartItems)}</p>
  <button class="close-cart-btn">Đóng</button>
</div>
  `;
  cartPopup.classList.add("show");
  document.body.appendChild(cartPopup);

  // Thêm CSS để hiển thị popup giỏ hàng
  const style = document.createElement("style");
  style.innerHTML = `
  .txtsoluong{
	max-width: 15%;
  }
    .cart-popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  max-width: 400px; 
}

.cart-popup img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}

.cart-popup .close-cart-btn {
  margin-top: 10px;
  background-color: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
}

.cart-popup .close-cart-btn:hover {
  color: red;
}
  `;
  document.head.appendChild(style);

  // Xử lý sự kiện khi nhấn vào nút "Đóng"
  const closeCartButton = cartPopup.querySelector(".close-cart-btn");
  closeCartButton.addEventListener("click", closeCart);

  // Xử lý sự kiện khi thay đổi số lượng sản phẩm
  const quantityInputs = cartPopup.querySelectorAll(".quantity-input");
  quantityInputs.forEach((input) => {
    input.addEventListener("change", updateQuantity);
  });

  // Xử lý sự kiện khi nhấn vào nút "Xoá"
  const removeButtons = cartPopup.querySelectorAll(".remove-item-btn");
  removeButtons.forEach((button) => {
    button.addEventListener("click", removeItem);
  });

  function closeCart() {
    document.body.removeChild(cartPopup);
  }

  function updateQuantity(event) {
    const input = event.target;
    const newQuantity = parseInt(input.value);
    const itemId = input.getAttribute("data-id");

    // Cập nhật số lượng sản phẩm trong giỏ hàng
    cartItems.forEach((item) => {
      if (item.id === itemId) {
        item.quantity = newQuantity;
      }
    });

    // Cập nhật lại localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Cập nhật tổng đơn hàng
    const totalElement = cartPopup.querySelector(".cart-popup p");
    totalElement.textContent = `Tổng đơn hàng: ${calculateTotal(cartItems)}`;
  }

  function removeItem(event) {
    const button = event.target;
    const itemId = button.getAttribute("data-id");

    // Lọc ra các sản phẩm khác sản phẩm cần xoá
    cartItems = cartItems.filter((item) => item.id !== itemId);

    // Cập nhật lại localStorage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));

    // Xoá phần tử HTML của sản phẩm trong popup
    const listItem = button.closest("li");
    listItem.parentNode.removeChild(listItem);

    // Cập nhật tổng đơn hàng
    const totalElement = cartPopup.querySelector(".cart-popup p");
    totalElement.textContent = `Tổng đơn hàng: ${calculateTotal(cartItems)}`;

    // Kiểm tra nếu giỏ hàng trống sau khi xoá
    if (cartItems.length === 0) {
      alert("Giỏ hàng trống.");
      closeCart();
    }
  }
}

// Tính tổng đơn hàng
function calculateTotal(cartItems) {
  let total = 0;
  cartItems.forEach((item) => {
    total += item.price * item.quantity;
  });
  return total;
}