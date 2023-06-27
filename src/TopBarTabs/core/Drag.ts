import { Action } from "./Action";
import { Tab } from "./Tab";
import { TabList } from "./TabList";
import { IAction, IActionList } from "./type";
import { Select } from "./Select";
import { TabViewer } from "./view/TabView";
import { DragViewer } from "./view/DragView";
import { isBetween } from "./util";

export class Drag implements IActionList {
    private _event: IAction[] = []
    private _select: Select | null = null
    private _DragViewer: DragViewer | null = null

    get dom() {
        return (this._tab.TabViewer as TabViewer).dom
    }
    get moveable() {
        return isBetween(Number(this._tab.index), this._tabList.config.direction[0], this._tabList.config.direction[1])
    }

    dragStart() {
        this._select = new Select(this._tabList, this._tab)
        this._select.select()
        this._DragViewer?.dragStart()
    }

    dragMove(e: MouseEvent) {
        this._DragViewer?.dragMove(e)
    }

    dragEnd() {
        this._select?.removeEvent()
        this._select = null
        this._DragViewer?.dragEnd()
    }
    initEvent(): void {
        if (this.dom) {
            const action = new Action()
            action.on(this.dom, 'mousedown', () => {
                this.dragStart()
                const handleMouseMove = (e: MouseEvent) => { this.dragMove(e) }
                const handleMouseUp = () => {
                    document.removeEventListener('mouseup', handleMouseUp);
                    document.removeEventListener('mousemove', handleMouseMove)
                    this.dragEnd()
                }
                if (this.moveable) document.addEventListener('mousemove', handleMouseMove);
                document.addEventListener('mouseup', handleMouseUp)

            })
            this._event = [action]
        }
    }
    removeEvent() {
        this._event.forEach(item => {
            item.remove()
        })
    }

    constructor(private _tabList: TabList, private _tab: Tab) {
        this._DragViewer = new DragViewer(_tabList, _tab)
    }
}