x = 1;
y = 1;
z = 1;

max = 100;

xResults = []
yResults = []
zResults = []

const text = document.createElement('h2');
text.innerHTML = 'Pythagorean Triples: ';
document.body.appendChild(text);

for (let x = 1; x <= max; x++) {
    for (let y = 1; y <= max; y++) {
        for (let z = 1; z <= max; z++) {
            if (z === Math.sqrt((x ** 2) + (y ** 2))) {
                if (zResults.includes(z)) {
                    break;
                } else {
                    xResults.push(x);
                    yResults.push(y);
                    zResults.push(z);
                }

            }
        }
    }
}

for (let i = 0; i < zResults.length; i++) {
    const text = document.createElement('p');
    text.innerHTML = `${xResults[i]}, ${yResults[i]}, ${zResults[i]}`;
    document.body.appendChild(text);
}
