import { Action } from "./Action";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { IAction, IActionList } from "./type";
import { TabViewer } from "./view/TabView";

export class Select implements IActionList {
    private _event: IAction[] = []

    select() {
        if (!this._tab.selected) {
            this._tabList.list.forEach(item => {
                item.select(false)
            })
            this._tab.select(true)
        }
    }

    initEvent() {
        const action = new Action()
        action.on((this._tab.TabViewer as TabViewer).dom, 'click', () => {
            this.select()
        })
        this._event = [action]
    }
    removeEvent() {
        this._event.forEach(item => {
            item.remove()
        })
    }

    constructor(private _tabList: TabList, private _tab: Tab) { }

}