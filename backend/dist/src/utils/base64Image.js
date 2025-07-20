const base64Image = (file) => {
    const image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
    return image;
};
export default base64Image;
