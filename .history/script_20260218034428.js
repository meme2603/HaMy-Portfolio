<script>
    let slideIndexes = { slider1: 0, slider2: 0, slider3: 0 };

    function moveSlide(sliderId, step) {
        const container = document.getElementById(sliderId);
        const wrapper = container.querySelector('.slider-wrapper');
        const slides = wrapper.querySelectorAll('.slide-img');
        const totalSlides = slides.length;

        // Cập nhật vị trí hiện tại
        slideIndexes[sliderId] = (slideIndexes[sliderId] + step + totalSlides) % totalSlides;
        
        // Di chuyển wrapper để hiện ảnh tương ứng
        const offset = -slideIndexes[sliderId] * 100;
        wrapper.style.transform = `translateX(${offset}%)`;
    }
</script>