document.addEventListener("DOMContentLoaded", function() {
    const navHeight = document.querySelector('.nav-ct').offsetHeight;
    const offset = 15; 
  
    const links = document.querySelectorAll('.nav-menu a');
  
    links.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const targetPosition = targetElement.offsetTop - navHeight - offset;
  
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      });
    });
  });