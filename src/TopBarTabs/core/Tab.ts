import { ITabViewer } from "./type"

export class Tab {
    public TabViewer?: ITabViewer

    constructor(private _index: number, private _selected: boolean) {
    }

    get index() {
        return this._index
    }

    get selected() {
        return this._selected
    }

    move(ind: number) {
        this._index = ind
        if (this.TabViewer) {
            this.TabViewer.move(ind)
        }
    }

    select(isSelect: boolean) {
        this._selected = isSelect
        if (this.TabViewer) {
            this.TabViewer.select(isSelect)
        }
    }
}