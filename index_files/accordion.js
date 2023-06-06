const accordions = document.querySelector('.accordions');
if (document.querySelector('.accordions')) {
  const faqItems = document.querySelectorAll('.accordion');

  // Expand the first accordion by default
  faqItems[0].classList.add('active');

  accordions.addEventListener('click', (event) => {
    const item = event.target.closest('.accordion');

    // Collapse all other accordions
    faqItems.forEach(faqItem => {
      if (faqItem !== item && faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
      }
    });

    // Expand/collapse the clicked accordion
    if (item.classList.contains('active')) {
      item.classList.remove('active');
    } else {
      item.classList.add('active');
    }
  });
};

