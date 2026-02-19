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
};


document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Thêm class hiện hình cho nguyên cái Section
                entry.target.classList.add('section-reveal');
            }
        });
    }, {
        threshold: 0.1 // Chỉ cần hiện 10% section là bắt đầu mọc ra
    });

    // Chỉ định các Section muốn áp dụng hiệu ứng
    const sections = document.querySelectorAll('#web-projects, #visual-section, #app-projects');
    sections.forEach(sec => observer.observe(sec));
});
