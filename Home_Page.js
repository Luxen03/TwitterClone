document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            if (targetSection) {
                document.querySelectorAll('main section').forEach(function(section) {
                    section.classList.add('hidden');
                });
                targetSection.classList.remove('hidden');
            }
        });
    });
});
