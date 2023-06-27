import { Drag } from "./Drag";
import { Select } from "./Select";
import { Tab } from "./Tab";
import { IActionList } from "./type";
import { TabViewer } from "./view/TabView";
interface ITabListConfig {
    width: number
    direction: number[]
}
export class TabList {
    private _list: Tab[] = []
    private _actions: IActionList[] = []
    get list() {
        return this._list
    }
    get config() {
        return this._config
    }
    constructor(list: {
        text: string, selected: boolean
    }[], private _config: ITabListConfig, private _containerRef: { current: HTMLElement }) {
        this.init(list)
    }

    init(list: {
        text: string, selected: boolean
    }[]) {
        this._list = list.map((item, ind) => {
            const tab = new Tab(ind, item.selected)
            const tabViewer = new TabViewer({
                text: item.text, selected: item.selected, ind, width: this._config.width
            }, this._containerRef)
            tab.TabViewer = tabViewer
            return tab
        })
    }

    show() {
        if (this._containerRef?.current) {
            this._list.forEach(item => {
                const select = new Select(this, item)
                select.initEvent()
                const drag = new Drag(this, item)
                drag.initEvent()
                this._actions.push(drag, select)
                item.TabViewer?.show()
            })
        }
    }

    remove() {
        this._list.forEach(item => {
            item.TabViewer?.remove()
        })
        this._actions.forEach(item => {
            item.removeEvent()
        })
    }

}