import { Drag } from "./Drag";
import { Select } from "./Select";
import { Tab } from "./Tab";
import { IActionList } from "./type";
import { TabViewer } from "./view/TabView";
interface ITabListConfig {
    width: number
}
export class TabList {
    private _list: Tab[] = []
    private _actions: IActionList[] = []
    get list() {
        return this._list
    }
    constructor(list: {
        text: string, selected: boolean
    }[], config: ITabListConfig, private _containerRef: { current: HTMLElement }) {
        this.init(list, config)
    }

    init(list: {
        text: string, selected: boolean
    }[], config: ITabListConfig,) {
        this._list = list.map((item, ind) => {
            const tab = new Tab(ind, item.selected)
            const tabViewer = new TabViewer({
                text: item.text, selected: item.selected, ind, width: config.width
            }, this._containerRef)
            tab.TabViewer = tabViewer
            return tab
        })
    }

    show() {
        if (this._containerRef?.current) {
            this._list.forEach(item => {
                const select = new Select()
                select.initEvent(this, item)
                const drag = new Drag()
                drag.initEvent(this, item)
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