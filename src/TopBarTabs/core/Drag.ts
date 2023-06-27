import { Action } from "./Action";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { IAction, IActionList } from "./type";
import { TabViewer } from "./view/TabView";

export class Drag implements IActionList {
    private _event: IAction[] = []
    initEvent(tabList: TabList, tab: Tab): void {
        const action = new Action()
        action.on((tab.TabViewer as TabViewer).dom, 'dragstart', () => {
            console.log('start')
        })
        action.on((tab.TabViewer as TabViewer).dom, 'dragend', () => {
            console.log('end')
        })
        this._event = [action]
    }
    removeEvent() {
        this._event.forEach(item => {
            item.remove()
        })
    }
}