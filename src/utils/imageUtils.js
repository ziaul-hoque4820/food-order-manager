function getImage(name) {
    return new URL(`../assets/intent/${name}`, import.meta.url).href;
}

export default getImage;