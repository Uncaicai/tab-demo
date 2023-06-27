import { ITabViewer } from "../type";
import styles from '../../style.module.less'

interface ITabViewConfig {
    text: string, selected: boolean, ind: number, width: number
}

export class TabViewer implements ITabViewer {
    private _dom: HTMLElement
    private _config: ITabViewConfig

    get dom() {
        return this._dom
    }

    constructor(config: ITabViewConfig) {
        const d = document.createElement('div')
        this._dom = d
        this._config = config
        this.init()
    }

    init() {
        const { text, selected, ind, width } = this._config
        this._dom.innerText = text
        this._dom.className = styles.item
        this._dom.style.width = `${width}px`
        this.move(ind)
        this.select(selected)
    }

    move(ind: number): void {
        this._dom.style.left = `${ind * this._config.width}px`
    }
    select(isSelect: boolean): void {
        if (isSelect) {
            this._dom.classList.remove(styles.unSelected)
            this._dom.classList.add(styles.selected)
        } else {
            this._dom.classList.remove(styles.selected)
            this._dom.classList.add(styles.unSelected)
        }
    }

}