const a = Array.from(document.getElementsByClassName('has-tooltip'));


a.forEach((el) => {
    const div = document.createElement('div');
    div.classList.add('tooltip');
    div.textContent = el.getAttribute('title');
    div.dataset.position = 'bottom';
    el.parentNode.insertBefore(div, el.nextSibling);
    el.addEventListener('click', (e) => {
        e.preventDefault();
        div.classList.toggle('tooltip_active');
        const coords = Coords(el, div, div.dataset.position);
        div.style.left = coords.left;
        div.style.top = coords.top;
        const tool = Array.from(document.getElementsByClassName('tooltip'));
        tool.forEach((t) => {
            if (t !== div) {
                t.classList.remove('tooltip_active');
            }
         });        
    });
    document.addEventListener('scroll', () => {
        const coords = Coords(el, div, div.dataset.position);
        div.style.top = coords.top;
    });
});

function Coords(el, tool, position) {
    let left = '';
    let top = '';
    switch (position) {
        case "bottom":
            left = el.offsetLeft + "px";
            top = el.offsetTop + el.offsetHeight - window.pageYOffset + "px";
          break;

          case "top":
            left = el.offsetLeft + "px";
            top = el.offsetTop - tool.offsetHeight - window.pageYOffset + "px";
          break;

          case "left":
            left = el.offsetLeft - tool.offsetWidth + "px";
            top = el.offsetTop - window.pageYOffset + "px";
          break;

          case "right":
            console.log(tool.offsetWidth);
            left = el.offsetLeft + el.offsetWidth + "px";
            top = el.offsetTop - window.pageYOffset + "px";
          break;
    }
    return {
        top: top,
        left: left
      };
};