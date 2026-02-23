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
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.project-card');
    const nextBtn = document.getElementById('btnNext');
    const prevBtn = document.getElementById('btnPrev');
    let currentIdx = 1; // Project 2 đang là Active

    function updateCarousel() {
        cards.forEach(card => {
            card.classList.remove('active', 'prev', 'next');
        });

        const total = cards.length;
        const prevIdx = (currentIdx - 1 + total) % total;
        const nextIdx = (currentIdx + 1) % total;

        cards[currentIdx].classList.add('active');
        cards[prevIdx].classList.add('prev');
        cards[nextIdx].classList.add('next');
    }

    // Khi click Next
    nextBtn.onclick = () => {
        currentIdx = (currentIdx + 1) % cards.length;
        updateCarousel();
    };

    // Khi click Prev
    prevBtn.onclick = () => {
        currentIdx = (currentIdx - 1 + cards.length) % cards.length;
        updateCarousel();
    };
});