import { IAction } from "./type"

export class Action implements IAction {
    private _fns: {
        e: keyof HTMLElementEventMap,
        fn: () => void
        dom: HTMLElement
    }[] = []

    // eslint-disable-next-line @typescript-eslint/ban-types
    on(dom: HTMLElement, e: keyof HTMLElementEventMap, fn: () => void) {
        dom.addEventListener(e, fn)
        this._fns.push({
            e, fn, dom
        })
    }

    remove() {
        this._fns.forEach(item => {
            item.dom.removeEventListener(item.e, item.fn)
        })
    }
}