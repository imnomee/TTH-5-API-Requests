//Search box
const searchContainer = document.querySelector('.search-container');
const searchForm = document.createElement('form');
searchForm.action = '#';
searchForm.method = 'get';
searchContainer.appendChild(searchForm);
searchForm.innerHTML = `<input type="search" id="search-input" class="search-input" placeholder="Search...">
                            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
                        `;
