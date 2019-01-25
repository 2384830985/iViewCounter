// iview
declare interface iviews {
    Message: any,
    LoadingBar: any,
    Spin: any,
    Notice: any,
    Modal: any,
}
declare var iview: iviews;
declare module 'iview' {
    export = iview
}