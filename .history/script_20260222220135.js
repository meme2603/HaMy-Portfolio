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
    const btnNext = document.getElementById('btnNext');
    const btnPrev = document.getElementById('btnPrev');

    // Hàm cập nhật trạng thái Active để card giữa to ra
    function updateActive() {
        const allCards = track.querySelectorAll('.project-card');
        allCards.forEach((card, index) => {
            // Card đứng đầu (index 0) sẽ luôn là card nằm giữa nhờ cái padding-left của bà
            if (index === 0) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });
    }

    // XỬ LÝ NÚT NEXT
    btnNext.addEventListener('click', () => {
        // Tạo hiệu ứng trượt nhẹ trước khi đổi chỗ
        track.style.transition = 'all 0.4s ease';
        
        // Bốc card đầu tiên quăng xuống cuối
        const firstCard = track.firstElementChild;
        track.appendChild(firstCard);
        
        // Cập nhật lại class Active
        updateActive();
    });

    // XỬ LÝ NÚT PREV
    btnPrev.addEventListener('click', () => {
        track.style.transition = 'all 0.4s ease';
        
        // Bốc card cuối cùng quăng lên đầu
        const lastCard = track.lastElementChild;
        track.insertBefore(lastCard, track.firstElementChild);
        
        updateActive();
    });

    // Chạy lần đầu để kích hoạt card đang đứng đầu
    updateActive();
});