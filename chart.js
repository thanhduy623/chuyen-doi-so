// --- Logic cho Slider "Thành tựu" ---
document.addEventListener('DOMContentLoaded', () => {
    const achievementNavContainer = document.querySelector('.achievements-nav');
    if (!achievementNavContainer) return;

    const sliderBtns = achievementNavContainer.querySelectorAll('.slider-btn');
    const contentContainer = document.querySelector('.achievements-content-container');
    let ecommerceChartInstance, internetChartInstance;

    const initEcommerceChart = () => {
        const ctx = document.getElementById('ecommerceChart')?.getContext('2d');
        if (!ctx) return;
        if (ecommerceChartInstance) ecommerceChartInstance.destroy();
        ecommerceChartInstance = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['2022', '2023'],
                datasets: [{
                    label: 'Tỷ USD',
                    data: [16.5, 20.5],
                    backgroundColor: ['rgba(34, 211, 238, 0.6)', 'rgba(139, 92, 246, 0.6)'],
                    borderColor: ['#22d3ee', '#8b5cf6'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: 'white' } },
                    x: { grid: { color: 'rgba(255,255,255,0.1)' }, ticks: { color: 'white' } }
                }
            }
        });
    };

    const initInternetChart = () => {
        const ctx = document.getElementById('internetChart')?.getContext('2d');
        if (!ctx) return;
        if (internetChartInstance) internetChartInstance.destroy();
        internetChartInstance = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Có Internet cáp quang', 'Chưa có'],
                datasets: [{
                    data: [82.4, 17.6],
                    backgroundColor: ['#22d3ee', 'rgba(255,255,255,0.2)'],
                    borderColor: ['#8b5cf6', 'transparent'],
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true, maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'bottom', labels: { color: 'white' } },
                    tooltip: { callbacks: { label: (context) => `${context.label}: ${context.raw}%` } }
                }
            }
        });
    };

    sliderBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            achievementNavContainer.querySelector('.slider-btn.active')?.classList.remove('active');
            contentContainer.querySelector('.slider-content.active')?.classList.remove('active');
            btn.classList.add('active');
            const targetId = btn.dataset.target;
            const targetContent = document.getElementById(targetId);
            if(targetContent) targetContent.classList.add('active');
            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        });
    });

    // Khởi tạo biểu đồ cho tab đầu tiên
    initEcommerceChart();

    // Lắng nghe khi tab được active để vẽ biểu đồ
     const observer = new MutationObserver((mutationsList) => {
        for(const mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const targetNode = mutation.target;
                if (targetNode.classList.contains('active')) {
                    if (targetNode.id === 'content-kinh-te-so') initEcommerceChart();
                    if (targetNode.id === 'content-xa-hoi-so') initInternetChart();
                }
            }
        }
    });

    const achievementContents = contentContainer.querySelectorAll('.slider-content');
    achievementContents.forEach(content => {
        observer.observe(content, { attributes: true });
    });
});