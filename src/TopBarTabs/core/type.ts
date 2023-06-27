export interface ITabViewer {
    move(ind: number): void
    select(isSelect: boolean): void
}

export interface IAction {
    on(dom: HTMLElement, e: keyof HTMLElementEventMap, fn: () => void): void
    remove(): void
}

export interface IActionList {
    initEvent(...args: unknown[]): void
    removeEvent(): void
}