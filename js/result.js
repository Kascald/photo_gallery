const $thmb = document.querySelector('.thmbs');
const $allAnchor = document.querySelectorAll('section > .thmbs > ul > li > a');
const $nextBtn = document.querySelector('.next');
const $prevBtn = document.querySelector('.prev');
const $gallery = document.getElementById('gallery');
let $lastViewd = null;

function getImagePaths(elem) {
    const imgPaths = Array.from(elem).map(child => child.href);
    return imgPaths;
}

function changeImg(newSrc) {
    const $gallery = document.getElementById('gallery');
    $gallery.setAttribute('src', newSrc);
}

function removeClass(elem, className) {
    elem.classList.remove(className);
}

function addClass(elem, className) {
    elem.setAttribute('class', className);
}

function toggleClass(elem, className) {
    elem.classList.toggle(className);
}

$thmb.addEventListener('click', (event) => {
    event.preventDefault();
    const direction = event.target.className.includes('next') ? 1 : event.target.className.includes('prev') ? -1 : 0;
    console.log(direction);

    if (!(event.target.className.includes('next') || event.target.className.includes('prev'))) {
        console.log('Clicked on anchor:', event.target.href);

        const newSrc = event.target.href;
        changeImg(newSrc);

        $lastViewd = document.querySelector('.on');
        $lastViewd && removeClass($lastViewd, 'on');
        addClass(event.target.parentElement, 'on');
    } else if (event.target.className.includes('next')) {
        newThmbs(direction);
        console.log(event.target.href);
    } else if (event.target.className.includes('prev')) {
        newThmbs(direction);
    }
});

function newThmbs(direction) {
    const $currentView = document.querySelector('.on');
    const $lastViewdHref = $currentView.children[0].href;
    let ref_index = getImagePaths($allAnchor).findIndex(path => path === $lastViewdHref);
    let next_index = ref_index;

    if (next_index < 1 && direction === -1) {
        next_index = 8;
        chan(next_index);
    } else if (next_index >= 8 && direction === 1) {
        next_index = 0;
        chan(next_index);
    } else {
        next_index = ref_index + direction;
        chan(next_index);
    }

    function chan(next_index) {
        const nextSrc = getImagePaths($allAnchor)[next_index];
        changeImg(nextSrc);

        toggleClass($currentView, 'on');
        toggleClass($thmb.children[1].children[next_index], 'on');
        console.log($thmb.children[1].children[next_index]);

    }
}
