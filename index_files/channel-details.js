const channelLinks = document.querySelectorAll('.channels__link');
if (channelLinks) {
  channelLinks.forEach(link => {
    link.addEventListener('click', () => {
      // close all previously opened elements
      channelLinks.forEach(item => {
        if (item !== link) {
          item.removeAttribute('open');
        }
      });
    });
  });
}