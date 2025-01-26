const navDialog = document.querySelector('#nav-dialog');
function handleMenu() {
    navDialog.classList.toggle('hidden');
}

const initialTranslateLTR = -48 * 4;
const initialTranslateRTL = 36 * 4;

function setUpInterSectionObserver(element, isLTR, speed) {
    const interSectionCallback = entries => {
        const isIntersecting = entries[0].isIntersecting;
        if(isIntersecting) {
            document.addEventListener('scroll', scrollHandler);
        }
        else {
            document.removeEventListener('scroll', scrollHandler);
        }
    }
    const interSectionObserver = new IntersectionObserver(interSectionCallback);
    interSectionObserver.observe(element);

    function scrollHandler() {
        const translateX = (window.innerHeight - element.getBoundingClientRect().top) * speed;

        let totalTranslate = 0;
        if(isLTR) {
            totalTranslate = translateX + initialTranslateLTR;
        }
        else {
            totalTranslate = -(translateX + initialTranslateRTL);
        }
        
        element.style.transform = `translateX(${totalTranslate}px)`;
    }
}

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');
const line4 = document.getElementById('line4');

setUpInterSectionObserver(line1, true, 0.15);
setUpInterSectionObserver(line2, false, 0.15);
setUpInterSectionObserver(line3, true, 0.15);

setUpInterSectionObserver(line4, true, 0.8);

const dtElements = document.querySelectorAll('dt');
dtElements.forEach(element => {
    element.addEventListener('click', () => {
        const ddId = element.getAttribute('aria-controls');
        const ddElements = document.getElementById(ddId);
        const ddArrowIcon = element.querySelectorAll('i')[0];

        ddElements.classList.toggle('hidden');
        ddArrowIcon.classList.toggle('-rotate-180');
    })
})