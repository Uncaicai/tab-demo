import { Action } from "./Action";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { IAction, IActionList } from "./type";
import { TabViewer } from "./view/TabView";

export class Drag implements IActionList {
    private _event: IAction[] = []
    initEvent(tabList: TabList, tab: Tab): void {
        const action = new Action()
        action.on((tab.TabViewer as TabViewer).dom, 'mousedown', () => {
            console.log('mousedown')
            const handleMouseMove = () => { console.log('mousemove') }
            const handleMouseUp = () => {
                console.log('mouseup');
                document.removeEventListener('mouseup', handleMouseUp);
                document.removeEventListener('mousemove', handleMouseMove)
            }
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp)

        })
        this._event = [action]
    }
    removeEvent() {
        this._event.forEach(item => {
            item.remove()
        })
    }
}