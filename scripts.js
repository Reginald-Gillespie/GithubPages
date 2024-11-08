function changeStatImage(statType) {
    const statImage = document.getElementById('statImage');

    if (statType === 'stat1') {
        statImage.src = 'stat1.jpg';
        statImage.alt = 'Current Stat 1';
    } else if (statType === 'stat2') {
        statImage.src = 'stat2.jpg';
        statImage.alt = 'Current Stat 2';
    } else if (statType === 'stat3') {
        statImage.src = 'stat3.jpg';
        statImage.alt = 'Current Stat 3';
    }
}
