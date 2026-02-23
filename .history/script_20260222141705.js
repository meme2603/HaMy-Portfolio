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
    const slideWidth = 890; // 850px card + 40px gap (Bà check lại số này cho khớp CSS nhé)

    function updateCarousel(hasAnimation = true) {
        // Nếu không muốn chạy ngược qua các card, mình tắt transition
        if (!hasAnimation) {
            track.style.transition = 'none';
        } else {
            track.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
        }

        // Dịch chuyển
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

        // Cập nhật class Active
        cards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });

        // Sau khi tắt transition để nhảy cóc, phải bật lại ngay để lần sau bấm nó vẫn mượt
        if (!hasAnimation) {
            // Dùng setTimeout 10ms để trình duyệt kịp nhận diện việc tắt transition
            setTimeout(() => {
                track.style.transition = 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
            }, 10);
        }
    }

    btnNext.addEventListener('click', () => {
        if (currentIndex < cards.length - 1) {
            currentIndex++;
            updateCarousel(true); // Đi tiếp mượt mà
        } else {
            currentIndex = 0;
            updateCarousel(false); // NHẢY CÓC VỀ ĐẦU (Không chạy ngược)
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateCarousel(true); // Đi lùi mượt mà
        } else {
            currentIndex = cards.length - 1;
            updateCarousel(false); // NHẢY CÓC XUỐNG CUỐI (Không chạy ngược)
        }
    });

    // Khởi tạo lần đầu
    updateCarousel();
});