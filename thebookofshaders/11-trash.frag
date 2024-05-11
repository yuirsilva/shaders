#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define TWO_PI 6.28318530718

vec2 scale2d(vec2 st, vec2 scale) {
    st -= 0.5;
    st = mat2(scale.x,0.,0.,scale.y)*st;
    st += 0.5;
    return st;
}
float random(vec2 n) {
    return fract(sin(dot(n,vec2(12.32804,78.32803)))*48317.328024);
}
float random(float n) {
    return fract(sin(n)*1e4);
}
float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    
    float u = f * f * (3.-2.*f);
    return mix(random(i),random(i+1.),u);
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    vec2 pos = st-vec2(0.5);
    
    float a = atan(pos.x,pos.y);
    
    pos.x += noise(cos(u_time+cos(a)))*0.5;
    pos.y += noise(sin(u_time+sin(a+u_time)))*0.5;
    
    float r = length(pos);
    
    color = vec3(1.-smoothstep(0.192,0.196,r));
    gl_FragColor = vec4(color,1.0);
}