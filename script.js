async function animateContent(dom_target, new_content) {
  return new Promise((resolve) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < dom_target.textContent.length) {
        const content = dom_target.innerHTML.replace(/<[^>]*>/g, '');
        dom_target.innerHTML = content.slice(0, content.length - index);
        index++;
      } else {
        clearInterval(interval);
        dom_target.innerHTML = new_content;
        resolve(); 
      }
    }, 50);
  });
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

window.addEventListener('DOMContentLoaded', async () => {
  const $animDevAge = document.querySelector('#anim-dev-age');
  const $animCurrentYear = document.querySelector('#anim-current-year');
  
  const current_date = new Date();
  const start_date = new Date('2009-04-09');

  const diff = current_date - start_date;
  const age = Math.floor(diff / (1000 * 60 * 60 * 24) / 365);

  await delay(2000);
  await animateContent($animCurrentYear, current_date.getFullYear());
  await delay(2000);
  await animateContent($animDevAge, age);

  $animDevAge.classList.add('text-tp-green');
});
