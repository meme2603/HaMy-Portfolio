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
};


// WEB DESIGN SLIDER
document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');

    let currentIndex = 0;
    const slideWidth = 830; // 800px card + 30px gap

    function update(hasAnimation = true) {
        // Tắt animation nếu cần nhảy vọt (về đầu/xuống cuối)
        track.style.transition = hasAnimation ? 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)' : 'none';
        
        // Dịch chuyển track
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Gắn class active để card giữa to ra
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }

    btnNext.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            update(true);
        } else {
            currentIndex = 0; // Về card 1
            update(false); // Nhảy vọt
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            update(true);
        } else {
            currentIndex = cards.length - 1; // Nhảy xuống card cuối
            update(false); // Nhảy vọt
        }
    });

    // Chạy lần đầu để căn giữa card số 1
    update();
});