async function ImagetoBase64(image){
    const reader = new FileReader();
    reader.readAsDataURL(image);

    const data = new Promise((resolve, reject) => {
        reader.onloadend = () => {
            resolve(reader.result);
        };
        reader.onerror = reject;
    })
    return await data;
}

export default ImagetoBase64;