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
let currentIndex = 0;
const allSlides = document.querySelectorAll('.project-item');

function moveSlider(step) {
    // 1. Xóa class active hiện tại
    allSlides[currentIndex].classList.remove('active');

    // 2. Tính toán index mới
    currentIndex += step;

    // Vòng lặp: Nếu quá thì quay lại đầu/cuối
    if (currentIndex >= allSlides.length) {
        currentIndex = 0;
    }
    if (currentIndex < 0) {
        currentIndex = allSlides.length - 1;
    }

    // 3. Thêm class active cho slide mới
    // Tui thêm một chút timeout để reset animation cũ
    setTimeout(() => {
        allSlides[currentIndex].classList.add('active');
    }, 10);
}
