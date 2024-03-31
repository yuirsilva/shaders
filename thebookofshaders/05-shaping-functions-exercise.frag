#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float plot(vec2 st, float pct) {
    return smoothstep(pct-0.02,pct,st.y)-smoothstep(pct,pct+0.02,st.y);
}

float first(float x) {
    return 1.-pow(abs(x), 0.5);
}
float second(float x) {
    return 1.-pow(abs(x), 1.);
}
float third(float x) {
    return 1.-pow(abs(x),1.5);
}
float fourth(float x) {
    return 1.-pow(abs(x), 2.);
}
float fifth(float x) {
    return 1.-pow(abs(x), 2.5);
}
float sixth(float x) {
    return 1.-pow(abs(x), 3.);
}
float seventh(float x) {
    return 1.-pow(abs(x), 3.5);
}
float eighth(float x) {
    return pow(cos(PI * x / 2.), 0.5);
}
float nineth(float x) {
    return pow(cos(PI * x / 2.), 1.);
}
float tenth(float x) {
    return pow(cos(PI * x / 2.), 1.5);
}
float eleventh(float x) {
    return pow(cos(PI * x / 2.), 2.);
}
float twelfth(float x) {
    return pow(cos(PI * x / 2.), 2.5);
}
float thirteenth(float x) {
    return pow(cos(PI * x / 2.), 3.);
}
float fourteenth(float x) {
    return pow(cos(PI * x / 2.), 3.5);
}
float fifteenth(float x) {
    return 1.-pow(max(0., abs(x) * 2. - 1.), 0.5);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution;
    float x = st.x;
    // x = first(x);
    // x = second(x);
    // x = third(x);
    // x = fourth(x);
    // x = fifth(x);
    // x = sixth(x);
    // x = seventh(x);
    // x = eighth(x);
    // x = nineth(x);
    // x = tenth(x);
    // x = eleventh(x);
    // x = twelfth(x);
    // x = thirteenth(x);
    // x = fourteenth(x);
    x = fifteenth(x);
    
    vec3 color = vec3(x);
    float pct = plot(st, x);
    // (1-amt)*start+amt*end
    color = (1.-pct)*color+pct*vec3(0., 1., 0.);
    
    gl_FragColor = vec4(color, 1.);
}