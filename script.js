// Function to populate the drop-down lists dynamically
function populateFilters() {
    const sources = [...new Set(data.map(item => item.Source))].filter(Boolean).sort((a, b) => a.localeCompare(b));
    const typeOfDocuments = [...new Set(data.map(item => item.TypeOfDocument))].filter(Boolean).sort((a, b) => a.localeCompare(b));
    const dates = [...new Set(data.map(item => item.Date ? item.Date.trim() : '').filter(date => date && !isNaN(parseInt(date))))].sort((a, b) => parseInt(b) - parseInt(a));
    const places = [...new Set(data.map(item => item.Place))].filter(Boolean).sort((a, b) => a.localeCompare(b));
    const languages = [...new Set(data.map(item => item.Language))].filter(Boolean).sort((a, b) => a.localeCompare(b));
    const typeOfMedia = [...new Set(data.map(item => item.TypeOfMedia))].filter(Boolean).sort((a, b) => a.localeCompare(b));

    // Populate the dropdowns with the options
    populateDropdown('source-filter', sources);
    populateDropdown('typeOfDocument-filter', typeOfDocuments);
    populateDropdown('date-filter', dates);
    populateDropdown('place-filter', places);
    populateDropdown('typeOfMedia-filter', typeOfMedia);
    populateDropdown('language-filter', languages);
}

// Helper function to populate a drop-down list
function populateDropdown(id, options) {
    const dropdown = document.getElementById(id);
    dropdown.innerHTML = '<option value="">All</option>'; // Reset and add default "All" option
    options.forEach(option => {
        if (option) { // Only add option if it is not empty
            const optionElement = document.createElement('option');
            optionElement.value = option;
            optionElement.textContent = option;
            dropdown.appendChild(optionElement);
        }
    });
}

// Function to apply the selected filters
function applyFilters() {
    filterData();
    currentPage = 1; // Reset to first page
    displayData(currentPage); // Display filtered data
    setupPagination(); // Set up pagination for filtered data
}

// Function to filter the data based on selected filters
function filterData() {
    const sourceFilter = document.getElementById('source-filter').value.toLowerCase();
    const typeOfDocumentFilter = document.getElementById('typeOfDocument-filter').value.toLowerCase();
    const dateFilter = document.getElementById('date-filter').value.toLowerCase();
    const placeFilter = document.getElementById('place-filter').value.toLowerCase();
    const typeOfMediaFilter = document.getElementById('typeOfMedia-filter').value.toLowerCase();
    const languageFilter = document.getElementById('language-filter').value.toLowerCase();

    filteredData = data.filter(item => {
        const source = item.Source ? item.Source.toLowerCase() : '';
        const typeOfDocument = item.TypeOfDocument ? item.TypeOfDocument.toLowerCase() : '';
        const date = item.Date ? item.Date.toLowerCase() : '';
        const place = item.Place ? item.Place.toLowerCase() : '';
        const language = item.Language ? item.Language.toLowerCase() : '';
        const typeOfMedia = item.TypeOfMedia ? item.TypeOfMedia.toLowerCase() : '';

        return (
            (source === sourceFilter || !sourceFilter) &&
            (typeOfDocument === typeOfDocumentFilter || !typeOfDocumentFilter) &&
            (date === dateFilter || !dateFilter) &&
            (place === placeFilter || !placeFilter) &&
            (language === languageFilter || !languageFilter) &&
            (typeOfMedia === typeOfMediaFilter || !typeOfMediaFilter)
        );
    });

    // Sort filteredData by Date descending, then Source ascending, then TypeOfDocument ascending,
    // and inside each TypeOfDocument group, sort by NumberOfPages descending
    filteredData.sort((a, b) => {
        const dateA = parseInt(a.Date) || 0;
        const dateB = parseInt(b.Date) || 0;
        if (dateB !== dateA) {
            return dateB - dateA; // Sort by Date descending
        }

        const sourceA = a.Source ? a.Source.toLowerCase() : '';
        const sourceB = b.Source ? b.Source.toLowerCase() : '';
        if (sourceA !== sourceB) {
            return sourceA.localeCompare(sourceB); // Sort by Source ascending
        }

        const typeOfDocA = a.TypeOfDocument ? a.TypeOfDocument.toLowerCase() : '';
        const typeOfDocB = b.TypeOfDocument ? b.TypeOfDocument.toLowerCase() : '';
        if (typeOfDocA !== typeOfDocB) {
            return typeOfDocA.localeCompare(typeOfDocB); // Sort by TypeOfDocument ascending
        }

        const pagesA = parseInt(a.NumberOfPages) || 0;
        const pagesB = parseInt(b.NumberOfPages) || 0;
        return pagesB - pagesA; // Sort by NumberOfPages descending
    });

    currentPage = 1; // Reset to first page after applying filters
    displayData(currentPage);
    setupPagination();
}

// Define pagination-related functions
let currentPage = 1;
const itemsPerRow = 4;
const rowsPerPage = 5;
const itemsPerPage = itemsPerRow * rowsPerPage;
let filteredData = data.slice(); // Initialize filteredData with the full dataset

// Sort filteredData by Date descending, then Source ascending, then TypeOfDocument ascending, then NumberOfPages descending initially
filteredData.sort((a, b) => {
    const dateA = parseInt(a.Date) || 0;
    const dateB = parseInt(b.Date) || 0;
    if (dateB !== dateA) {
        return dateB - dateA; // Sort by Date descending
    }

    const sourceA = a.Source ? a.Source.toLowerCase() : '';
    const sourceB = b.Source ? b.Source.toLowerCase() : '';
    if (sourceA !== sourceB) {
        return sourceA.localeCompare(sourceB); // Sort by Source ascending
    }

    const typeOfDocA = a.TypeOfDocument ? a.TypeOfDocument.toLowerCase() : '';
    const typeOfDocB = b.TypeOfDocument ? b.TypeOfDocument.toLowerCase() : '';
    if (typeOfDocA !== typeOfDocB) {
        return typeOfDocA.localeCompare(typeOfDocB); // Sort by TypeOfDocument ascending
    }

    const pagesA = parseInt(a.NumberOfPages) || 0;
    const pagesB = parseInt(b.NumberOfPages) || 0;
    return pagesB - pagesA; // Sort by NumberOfPages descending
});

// Function to display data for the current page
function displayData(page) {
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const pageData = filteredData.slice(start, end);

    const dataContainer = document.getElementById('data-container');
    dataContainer.innerHTML = '';

    pageData.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('data-div');
        div.innerHTML = `
            <a href="${item.PdfURL}" class="data-div none-decoration" target="_blank">
                <div class="image-holder">
                    <img src="${item.ThumbnailImage}" alt="Image">
                </div>
                <div class="details">
                    <div class="source-head detail">${item.Source ? item.Source.slice(0, 30) : ''}</div>
                    <div class="title-head detail"> ${item.Title ? item.Title.slice(0, 30) : ''}</div>
                    <div class="date-head detail-head">
                        <div class="left-detail"><img src="https://ewnaman.github.io/Watches-Magazine/calender.png" alt="Date" class="item"><span class="item-text"> ${item.Date ? item.Date : ''} </span></div>
                        <div class="right-detail"><img src="https://ewnaman.github.io/Watches-Magazine/location.png" alt="Place" class="item"><span class="item-text"> ${item.Place ? item.Place : ''} </span></div>
                    </div>
                    <div class="other-head detail-head">
                        <div class="left-detail"><img src="https://ewnaman.github.io/Watches-Magazine/document.png" alt="Type of Document" class="item"><span class="item-text"> ${item.TypeOfDocument ? item.TypeOfDocument : ''} </span></div>
                        <div class="right-detail"><img src="https://ewnaman.github.io/Watches-Magazine/book.png" alt="Number of Pages" class="item"><span class="item-text"> ${item.NumberOfPages ? item.NumberOfPages + ' Pages' : ''} </span></div>
                    </div>
                    <div class="other-head detail">
                        <img src="https://ewnaman.github.io/Watches-Magazine/licence.png" alt="Licence" class="item"> ${item.Licence ? item.Licence.slice(0, 30) : ''}
                    </div>
                </div>
            </a>
        `;
        dataContainer.appendChild(div);
    });
}

// Function to handle pagination
function setupPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    pagination.innerHTML = ''; // Clear previous pagination buttons

    // Previous Button
    const prevButton = document.createElement('button');
    prevButton.textContent = 'Previous';
    prevButton.disabled = currentPage === 1;
    prevButton.onclick = () => changePage(currentPage - 1);
    pagination.appendChild(prevButton);

    // Page numbers range
    let startPage = Math.max(1, currentPage - 2);
    let endPage = Math.min(totalPages, currentPage + 2);

    // If current page is near the start
    if (currentPage <= 3) {
        endPage = Math.min(5, totalPages);
    }

    // If current page is near the end
    if (currentPage >= totalPages - 2) {
        startPage = Math.max(totalPages - 4, 1);
    }

    // First page button and ellipsis
    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = '1';
        firstPageButton.onclick = () => changePage(1);
        pagination.appendChild(firstPageButton);

        if (startPage > 2) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            pagination.appendChild(dots);
        }
    }

    // Page number buttons
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
            pageButton.disabled = true;
        } else {
            pageButton.onclick = () => changePage(i);
        }
        pagination.appendChild(pageButton);
    }

    // Last page button and ellipsis
    if (endPage < totalPages) {
        if (endPage < totalPages - 1) {
            const dots = document.createElement('span');
            dots.textContent = '...';
            pagination.appendChild(dots);
        }

        const lastPageButton = document.createElement('button');
        lastPageButton.textContent = totalPages;
        lastPageButton.onclick = () => changePage(totalPages);
        pagination.appendChild(lastPageButton);
    }

    // Next Button
    const nextButton = document.createElement('button');
    nextButton.textContent = 'Next';
    nextButton.disabled = currentPage === totalPages || totalPages === 0;
    nextButton.onclick = () => changePage(currentPage + 1);
    pagination.appendChild(nextButton);
}

// Function to handle page change
function changePage(page) {
    currentPage = page;
    displayData(currentPage);
    setupPagination();
}

// Function to reset all filters and show all data
function resetFilters() {
    // Clear filter values and show all data
    document.getElementById('source-filter').value = '';
    document.getElementById('typeOfDocument-filter').value = '';
    document.getElementById('date-filter').value = '';
    document.getElementById('place-filter').value = '';
    document.getElementById('typeOfMedia-filter').value = '';
    document.getElementById('language-filter').value = '';

    filteredData = [...data]; // Reset to the full data
    currentPage = 1; // Reset to first page

    // Re-apply initial sorting
    filteredData.sort((a, b) => {
        const dateA = parseInt(a.Date) || 0;
        const dateB = parseInt(b.Date) || 0;
        if (dateB !== dateA) {
            return dateB - dateA; // Sort by Date descending
        }

        const sourceA = a.Source ? a.Source.toLowerCase() : '';
        const sourceB = b.Source ? b.Source.toLowerCase() : '';
        if (sourceA !== sourceB) {
            return sourceA.localeCompare(sourceB); // Sort by Source ascending
        }

        const typeOfDocA = a.TypeOfDocument ? a.TypeOfDocument.toLowerCase() : '';
        const typeOfDocB = b.TypeOfDocument ? b.TypeOfDocument.toLowerCase() : '';
        if (typeOfDocA !== typeOfDocB) {
            return typeOfDocA.localeCompare(typeOfDocB); // Sort by TypeOfDocument ascending
        }

        const pagesA = parseInt(a.NumberOfPages) || 0;
        const pagesB = parseInt(b.NumberOfPages) || 0;
        return pagesB - pagesA; // Sort by NumberOfPages descending
    });

    displayData(currentPage);
    setupPagination(); // Re-setup pagination
}

// Initialize the filters and pagination
populateFilters();
displayData(currentPage);
setupPagination();

// Event listeners for filter buttons
document.getElementById('apply-filter-btn').addEventListener('click', applyFilters);
document.getElementById('reset-filter-btn').addEventListener('click', resetFilters);

document.getElementById("currentYear").textContent = new Date().getFullYear();