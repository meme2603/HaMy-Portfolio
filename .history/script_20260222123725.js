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

document.addEventListener('DOMContentLoaded', function() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.project-card');
    const nextBtn = document.getElementById('btnNext');
    const prevBtn = document.getElementById('btnPrev');
    
    let currentIndex = 1; // Bắt đầu ở card thứ 2 (active)

    function updateSlider() {
        cards.forEach((card, index) => {
            // Xóa hết class để reset trạng thái
            card.classList.remove('active', 'prev', 'next');
            
            // Logic tính toán vị trí vòng tròn (Circular)
            const total = cards.length;
            const prevIdx = (currentIndex - 1 + total) % total;
            const nextIdx = (currentIndex + 1) % total;

            if (index === currentIndex) {
                card.classList.add('active');
            } else if (index === prevIdx) {
                card.classList.add('prev');
            } else if (index === nextIdx) {
                card.classList.add('next');
            }
        });
    }

    // Hàm tiến tới
    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % cards.length;
        updateSlider();
    });

    // Hàm lùi lại
    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
        updateSlider();
    });

    // Khởi tạo lần đầu
    updateSlider();
});

