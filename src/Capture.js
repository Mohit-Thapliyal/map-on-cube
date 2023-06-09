import html2canvas from 'html2canvas';
import ReactDOM from 'react-dom';

const fileType = {
    PNG: 'image/png',
};

const DEFAULT_PNG = {
    fileName: 'component.png',
    type: fileType.PNG,
    html2CanvasOptions: {}
};


const saveAs = (uri, filename) => {
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
        link.href = uri;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } else {
        window.open(uri);
    }
};


const exportComponent = (node, {
    fileName, 
    type, 
    html2CanvasOptions
}) => {
    if(!node.current) {
        throw new Error("'node' must be a RefObject")
    }

    const element = ReactDOM.findDOMNode(node.current);
    return html2canvas(element, {
        scrollY: -window.scrollY,
        useCORS: true,
        ...html2CanvasOptions
    }).then(canvas => {
            saveAs(canvas.toDataURL(type, 1.0), fileName);
    });
};


const exportComponentAsPNG = (node, parameters = {}) => exportComponent(node, {...DEFAULT_PNG, ...parameters});

export { 
    exportComponentAsPNG
};