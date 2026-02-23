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
    let cards = Array.from(document.querySelectorAll('.project-card'));
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');

    const slideWidth = 890; // 850px card + 40px gap

    // 1. NHÂN BẢN CARD ĐỂ LẤP CHỖ TRỐNG
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    
    track.appendChild(firstClone); // Cho card 1 giả xuống cuối
    track.insertBefore(lastClone, cards[0]); // Cho card 6 giả lên đầu

    // 2. THIẾT LẬP VỊ TRÍ BAN ĐẦU (Bắt đầu ở card 1 thật)
    let currentIndex = 1; 
    track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    function updateCarousel(hasAnimation = true) {
        track.style.transition = hasAnimation ? 'transform 0.5s ease-in-out' : 'none';
        track.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
        
        // Cập nhật class Active để to giữa nhỏ 2 bên
        const allCards = track.querySelectorAll('.project-card');
        allCards.forEach((card, index) => {
            card.classList.toggle('active', index === currentIndex);
        });
    }

    // 3. XỬ LÝ NÚT NEXT
    btnNext.addEventListener('click', () => {
        if (currentIndex >= cards.length + 1) return;
        currentIndex++;
        updateCarousel(true);
    });

    // 4. XỬ LÝ NÚT PREV
    btnPrev.addEventListener('click', () => {
        if (currentIndex <= 0) return;
        currentIndex--;
        updateCarousel(true);
    });

    // 5. MA THUẬT: NHẢY VỌT KHI CHẠM BIÊN (Để vòng lặp vô tận)
    track.addEventListener('transitionend', () => {
        // Nếu đang ở Card 1 giả (cuối hàng) -> Nhảy về Card 1 thật
        if (currentIndex === cards.length + 1) {
            currentIndex = 1;
            updateCarousel(false);
        }
        // Nếu đang ở Card 6 giả (đầu hàng) -> Nhảy về Card 6 thật
        if (currentIndex === 0) {
            currentIndex = cards.length;
            updateCarousel(false);
        }
    });

    // Khởi tạo lần đầu
    updateCarousel(false);
});