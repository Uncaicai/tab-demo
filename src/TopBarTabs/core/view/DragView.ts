import { Tab } from "../Tab";
import { TabViewer } from "./TabView";
import styles from '../../style.module.less'
import { TabList } from "../TabList";
import { isBetween } from "../util";
export class DragViewer {
    private _startClientX: number | null = null
    private _moveted = false

    getVisible(ind?: number) {
        return (isNaN(ind as number) ? Number(this._tab.index) : Number(ind)) > this._tabList.config.direction[1];
    }
    get dom() {
        return (this._tab.TabViewer as TabViewer).dom
    }
    move(to: number) {
        this.dom.style.left = `${to}px`;
    }

    moveToInd(ind: number,) {
        this._tab.move(ind)
        if (this._tabList.config) {
            this.dom.style.opacity = this.getVisible() ? '0%' : '100%';
        }
    }

    dragStart() {
        this.dom?.classList.remove(styles.scrollAnimation)
        this._startClientX = null
        this._moveted = false
    }

    dragMove(e: MouseEvent) {
        if (this._startClientX) {
            const newOffset = parseFloat(this.dom.style.left) + e.clientX - this._startClientX;
            const curInd = Number(this._tab.index);
            const targetInd = Math.floor((parseFloat(this.dom.style.left) / (this._tabList.config.width / 2) + 1) / 2);
            if (!isNaN(curInd) && !isNaN(targetInd) && curInd !== targetInd) {
                // 1 向前拖动；-1 向后拖动
                const dir = targetInd < curInd ? 1 : -1;
                this._tabList.list?.forEach((item) => {
                    const dataInd = Number(item.index);
                    const tempDom = (item.TabViewer as TabViewer).dom
                    if (
                        isBetween(dataInd, curInd, targetInd) &&
                        isBetween(dataInd, this._tabList.config.direction[0], this._tabList.config.direction[1]) &&
                        dataInd !== curInd
                    ) {
                        const newInd = dataInd + dir;
                        if (!tempDom.classList.contains(styles.scrollAnimation)) {
                            tempDom.classList.add(styles.scrollAnimation)
                        }
                        item.move(Math.max(Math.min(this._tabList.config.direction[1], newInd), this._tabList.config.direction[0]));
                    }
                });
            }
            if (!this._moveted && this._tab.index !== targetInd) {
                this._moveted = true
            }
            this._tab.move(targetInd)
            this.move(newOffset);
        }
        this._startClientX = e.clientX;
    }

    dragEnd() {
        this.dom.classList.add(styles.scrollAnimation);
        if (this._moveted)
            this.moveToInd(Math.max(Math.min(this._tabList.config.direction[1], Number(this._tab.index)), this._tabList.config.direction[0]));
    }

    constructor(private _tabList: TabList, private _tab: Tab) { }
}