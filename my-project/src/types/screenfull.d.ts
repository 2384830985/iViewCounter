// 全屏幕
interface screen {
    enabled: any,
    toggle: any,
    isFullscreen: boolean,
}
declare var screenFull: screen;
declare module 'screenfull' {
    export = screenFull
}