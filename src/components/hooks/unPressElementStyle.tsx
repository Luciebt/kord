export const unPressElementsStyleWithoutEvent = (style: string) => {
    const toUnpress = document.getElementsByClassName(style);
    if (toUnpress) {
        Array.from(toUnpress).forEach((element) => {
            element.classList.remove(style);
        });
    }
}