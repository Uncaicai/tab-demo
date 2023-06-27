import { Tab } from "./Tab";
import { TabViewer } from "./view/TabView";
interface ITabListConfig {
    width: number
}
export class TabList {
    private _list: Tab[]
    // private _config: ITabListConfig
    constructor(list: {
        text: string, selected: boolean
    }[], config: ITabListConfig) {
        this._list = list.map((item, ind) => {
            const tab = new Tab(ind, item.selected)
            const tabViewer = new TabViewer({
                text: item.text, selected: item.selected, ind, width: config.width
            })
            tab.TabViewer = tabViewer
            return tab
        })

    }

    get list() {
        return this._list
    }
}