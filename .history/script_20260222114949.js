// 1. Tạo biến lưu vị trí hiện tại của từng slider
let slidePositions = {
    slider1: 0,
    slider2: 0,
    slider3: 0
};

// 2. Hàm xử lý khi bấm nút
function moveSlide(sliderId, direction) {
    const container = document.getElementById(sliderId);
    const wrapper = container.querySelector('.slider-wrapper');
    const slides = container.querySelectorAll('.slide-item');
    const totalSlides = slides.length;

    // Cập nhật vị trí mới
    slidePositions[sliderId] += direction;

    // Nếu đi quá ảnh cuối thì quay lại ảnh đầu
    if (slidePositions[sliderId] >= totalSlides) {
        slidePositions[sliderId] = 0;
    }
    // Nếu lùi quá ảnh đầu thì tới ảnh cuối
    if (slidePositions[sliderId] < 0) {
        slidePositions[sliderId] = totalSlides - 1;
    }

    // Tính toán khoảng cách dịch chuyển (mỗi slide là 100%)
    const distance = -slidePositions[sliderId] * 100;
    
    // Đẩy slider đi
    wrapper.style.transform = `translateX(${distance}%)`;
}


// web dessign slider
const cards = document.querySelectorAll('.project-card');
let currentIndex = 1; // Bắt đầu ở card thứ 2 (đang là active)

function updateDisplay() {
    cards.forEach(card => {
        card.classList.remove('active', 'prev', 'next');
    });

    const total = cards.length;
    const prevIndex = (currentIndex - 1 + total) % total;
    const nextIndex = (currentIndex + 1) % total;

    cards[currentIndex].classList.add('active');
    cards[prevIndex].classList.add('prev');
    cards[nextIndex].classList.add('next');
}

document.getElementById('goNext').addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % cards.length;
    updateDisplay();
});

document.getElementById('goPrev').addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    updateDisplay();
});