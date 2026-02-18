// Quản lý chỉ số ảnh cho từng slider
let slideIndexes = { 
    slider1: 0, 
    slider2: 0, 
    slider3: 0 
};

// Hàm điều khiển di chuyển slide
function moveSlide(sliderId, step) {
    const container = document.getElementById(sliderId);
    if (!container) return; // Bảo vệ nếu không tìm thấy ID

    const wrapper = container.querySelector('.slider-wrapper');
    const slides = wrapper.querySelectorAll('.slide-img');
    const totalSlides = slides.length;

    // Tính toán chỉ số mới (vòng lặp vô tận)
    slideIndexes[sliderId] = (slideIndexes[sliderId] + step + totalSlides) % totalSlides;
    
    // Tính toán khoảng cách cần dịch chuyển (tính bằng %)
    const offset = -slideIndexes[sliderId] * 100;
    
    // Thực hiện hiệu ứng dịch chuyển
    wrapper.style.transform = `translateX(${offset}%)`;
}