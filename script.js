// Array containing the different methods of stats images (based on your description)
const methods = ['frequency', 'velocity'];
const currentDate = new Date();
const today = currentDate.toISOString().slice(0, 10); // Format current date (YYYY-MM-DD)

// Function to change the main image based on the selected stats method
function changeImage(method) {
    const imagePath = `Images/${method}-latest.png`;
    document.getElementById("main-image").src = imagePath;
    updateSidebarImages(method);
}

// Function to check if an image exists (returns true if exists, false if not)
function imageExists(url) {
    const img = new Image();
    img.src = url;
    return new Promise((resolve) => {
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
    });
}

// Function to calculate days ago
function daysAgo(date) {
    const diffTime = currentDate - date;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Function to dynamically generate images for the past week
async function updateSidebarImages(method) {
    const sidebarImagesContainer = document.querySelector('.sidebar-images');
    sidebarImagesContainer.innerHTML = ''; // Clear current images

    // Generate past week's images
    for (let i = 0; i <= 7; i++) {
        const pastDate = new Date(currentDate);
        pastDate.setDate(currentDate.getDate() - i); // Go back i days
        const pastDateStr = pastDate.toISOString().slice(0, 10); // Format past date (YYYY-MM-DD)

        const imageUrl = `Images/${method}-${pastDateStr}.png`;

        // Check if the image exists before adding to sidebar
        const exists = await imageExists(imageUrl);
        if (exists) {
            // Create date label (X days ago)
            const days = daysAgo(pastDate);
            const dateLabel = document.createElement('div');
            dateLabel.classList.add('date-label');
            dateLabel.textContent = `${days} days ago`;

            // Create image element
            const imgElement = document.createElement('img');
            imgElement.src = imageUrl;
            imgElement.alt = `Stats from ${pastDateStr}`;
            imgElement.onclick = () => changeImage(method);

            // Create container for label and image
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            imageContainer.appendChild(dateLabel);
            imageContainer.appendChild(imgElement);

            // Add the container to the sidebar
            sidebarImagesContainer.appendChild(imageContainer);
        }
    }
}

// Initialize with Stats Method "frequency" and the "latest" image when the page loads
window.onload = () => {
    changeImage('frequency');
};
