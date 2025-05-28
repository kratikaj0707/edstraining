export default function decorate(block){
    const img= block.queryselector('img');
    const text=block.queryselector('strong');
    block.classList.add('sectionhome');
    const content = document.createElement('sectionhome');
    content.className='section-content';
    if (text) content.appendChild(Object.assign(document.createElement('h1'), { innerHTML: text.innerHTML }));
    block.innerHTML = '';
    if (img) block.appendChild(img);
    block.appendChild(content);
}