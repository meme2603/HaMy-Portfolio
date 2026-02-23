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

    const slideWidth = 890; // 850px card + 40px gap

    // HÀM CLICK NÚT NEXT
    btnNext.addEventListener('click', () => {
        // 1. Tắt hiệu ứng trượt để chuẩn bị "xếp lại bài"
        track.style.transition = 'none';
        
        // 2. Lấy card đầu tiên bỏ xuống cuối hàng
        const firstCard = track.firstElementChild;
        track.appendChild(firstCard);
        
        // 3. Cập nhật lại class Active để card ở giữa luôn to
        updateActiveCard();
    });

    // HÀM CLICK NÚT PREV
    btnPrev.addEventListener('click', () => {
        track.style.transition = 'none';
        
        // 1. Lấy card cuối cùng quăng lên đầu hàng
        const lastCard = track.lastElementChild;
        track.insertBefore(lastCard, track.firstElementChild);
        
        updateActiveCard();
    });

    function updateActiveCard() {
        const allCards = track.querySelectorAll('.project-card');
        allCards.forEach((card, index) => {
            // Trong kiểu trượt này, card ở vị trí Index 0 (sau khi đã padding-left)
            // hoặc Index 1 (tùy layout của bà) sẽ là card active.
            // Nếu bà muốn card ĐẦU TIÊN của track luôn là card to nhất:
            card.classList.toggle('active', index === 0);
        });
    }

    // Chạy lần đầu
    updateActiveCard();
});