export default async function decorate(block) {
    
    const link = block.querySelector('p')?.textContent.trim();
    console.log(link,"p");
    const resp = await fetch(`/${link}.json`);
    console.log(resp);
    const json = await resp.json();
  
    const columns = json.columns;
    const rows = json.data;
  
    const rowsPerPage = 20;
    let currentPage = 1;
    const list = document.createElement('ul');
    list.className = 'spreadsheet-list';
  
    const pagination = document.createElement('div');
    pagination.className = 'pagination';
  
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = true;
  
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = rows.length <= rowsPerPage;
  
    pagination.appendChild(prevBtn);
    pagination.appendChild(nextBtn);
  
    block.appendChild(list);
    block.appendChild(pagination);
  
    function renderPage(page) {
      list.innerHTML = '';
      const start = (page - 1) * rowsPerPage;
      const end = Math.min(start + rowsPerPage, rows.length);
      for (let i = start; i < end; i++) {
        const li = document.createElement('li');
        li.className = 'spreadsheet-list-item';
  
        // Combine column values for this row into a readable string
        const content = columns.map(col => rows[i][col]).filter(Boolean).join(' - ');
        li.textContent = content;
  
        list.appendChild(li);
      }
  
      prevBtn.disabled = page === 1;
      nextBtn.disabled = end >= rows.length;
    }
  
    prevBtn.addEventListener('click', () => {
      if (currentPage > 1) {
        currentPage--;
        renderPage(currentPage);
      }
    });
  
    nextBtn.addEventListener('click', () => {
      if ((currentPage * rowsPerPage) < rows.length) {
        currentPage++;
        renderPage(currentPage);
      }
    });
  
    renderPage(currentPage);
  }