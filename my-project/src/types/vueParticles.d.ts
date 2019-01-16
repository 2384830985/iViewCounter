
interface particles {
    // 默认'#dedede'。粒子颜色。
    color: String,
    // 默认0.7。粒子透明度。
    particleOpacity: Number,
    // 默认80。粒子数量。
    particlesNumber: Number,
    // 默认'circle'。可用的粒子外观类型 
    // 有："circle","edge","triangle", "polygon","star"。
    shapeType: String,
    // 默认80。单个粒子大小。
    particleSize: Number,
    // 默认'#dedede'。线条颜色。
    linesColor: String,
    // 默认1。线条宽度。
    linesWidth: Number,
    // 默认true。连接线是否可用。
    lineLinked: Boolean,
    // 默认0.4。线条透明度。
    lineOpacity: Number,
    // 默认150。线条距离。
    linesDistance: Number,
    // 默认3。粒子运动速度。
    moveSpeed: Number,
    // 默认true。是否有hover特效。
    hoverEffect: Boolean,
    // 默认true。可用的hover模式有: "grab", "repulse", "bubble"。
    hoverMode: String,
    // 默认true。是否有click特效。
    clickEffect: Boolean,
    // 默认true。可用的click模式有: "push", "remove", "repulse", "bubble"。
    clickMode: String,
}
declare var vueParticles: particles
declare module 'vue-particles' {
    export = vueParticles
}