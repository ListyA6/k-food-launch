// Loader intro — squiggle draw + char rise (sidestudio style, simplified)
(function () {
    const loader = document.getElementById('loader');
    const path = document.getElementById('loaderSquigglePath');
    const chars = loader.querySelectorAll('.loader-char');
    const sub = loader.querySelector('.loader-sub');

    // squiggle draw
    path.style.transition = 'stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)';
    requestAnimationFrame(() => { path.style.strokeDashoffset = '0'; });

    // chars rise
    chars.forEach((c, i) => {
        c.style.transition = 'transform 0.9s cubic-bezier(0.16, 1, 0.3, 1) ' + (0.15 + i * 0.05) + 's';
        requestAnimationFrame(() => { c.style.transform = 'translateY(0)'; });
    });

    // sub fade in
    sub.style.transition = 'opacity 0.8s ease 0.9s';
    requestAnimationFrame(() => { sub.style.opacity = '1'; });

    // dismiss
    setTimeout(() => { loader.classList.add('is-done'); }, 2000);

    // progress bars animate on scroll into view
    const bars = document.querySelectorAll('.progress-fill');
    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                const w = e.target.getAttribute('data-w') || e.target.style.width || '0%';
                e.target.style.width = w;
            }
        });
    }, { threshold: 0.4 });
    bars.forEach(b => {
        b.setAttribute('data-w', b.style.width || '0%');
        b.style.width = '0%';
        io.observe(b);
    });

    // overall = average of task bars
    const taskBars = Array.from(document.querySelectorAll('.progress-row .progress-fill'));
    const avg = taskBars.length
        ? taskBars.reduce((s, b) => s + parseFloat(b.getAttribute('data-w') || 0), 0) / taskBars.length
        : 0;
    const overall = document.getElementById('overallBar');
    const overallPct = document.getElementById('overallPct');
    overall.setAttribute('data-w', avg + '%');
    overallPct.textContent = Math.round(avg) + '%';
})();
