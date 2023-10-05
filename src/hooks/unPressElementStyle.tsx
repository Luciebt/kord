export const unPressElementsStyleWithoutEvent = (style: string) => {
    const elements = document.getElementsByClassName(style);
    Array.from(elements).forEach((element) => {
        element.classList.remove(style);
    });
}