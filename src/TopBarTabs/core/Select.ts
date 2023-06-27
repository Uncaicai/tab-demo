import { Action } from "./Action";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { IAction, IActionList } from "./type";
import { TabViewer } from "./view/TabView";

export class Select implements IActionList {
    private _event: IAction[] = []
    initEvent(tabList: TabList, tab: Tab) {
        const action = new Action()
        action.on((tab.TabViewer as TabViewer).dom, 'click', () => {
            const selected = !tab.selected
            if (selected) {
                tabList.list.forEach(item => {
                    item.select(false)
                })
                tab.select(true)
            } else {
                tab.select(false)
            }
        })
        this._event = [action]
    }
    removeEvent() {
        this._event.forEach(item => {
            item.remove()
        })
    }
}