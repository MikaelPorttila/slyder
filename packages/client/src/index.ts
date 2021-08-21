/* (async () => {
    const files = await fetch('/data').then(x => x.json());
    const main = document.querySelector('#Main');
    main.innerHTML = files.reduce((res, file) => res + `<p>${file}</p>`, '');
    console.log(files);
})(); */
function loadData() {
    fetch('/api/data')
        .then(x => x.json())
        .then(files => {
            console.log(files);
            document
                .querySelector('#Main')
                .innerHTML = files.reduce((res, file) => res + `<p>${file}</p>`, '');
        });
}

loadData();