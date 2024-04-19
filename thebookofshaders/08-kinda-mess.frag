#ifdef GL_ES
precision mediump float;
#endif

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// https://cdn.dribbble.com/users/2991/screenshots/3581505/media/6f6bfc5fe60f21fdef1371cb25454592.gif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

mat2 scale2d(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

float sin_waves(vec2 st, in vec2 size) {
    vec2 d = st;
    d.y+=sin(-u_time*TWO_PI+st.x*st.x*PI*6.)*0.1;
    d.x-=size.x;

    vec2 bl = smoothstep(size-0.004,size,d);
    vec2 tr = smoothstep(size-0.004,size,1.-d);
    
    return bl.x*bl.y*tr.x*tr.y;
}
float point(vec2 st, float r) {
    vec2 d = st;
    d.y+=sin(-u_time*TWO_PI+8.25*PI)*0.1;
    d = d-vec2(0.2,0.5);
    
    return length(d)-r;
}
float square(vec2 st, in vec2 size, vec2 pos) {
    vec2 d = st-pos;
    vec2 bl = smoothstep(size-0.004,size,d);
    vec2 tr = smoothstep(size-0.004,size,1.-d);
    
    return bl.x*bl.y*tr.x*tr.y;
}
float grid(vec2 st) {
    vec2 d = (fract(st*4.)*2.-1.);
    float s = smoothstep(0.,0.005,length(max(abs(d)-0.99,0.)));
    return s;
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 size = vec2(0.1,0.495);
    vec3 col = vec3(0.);
    
    float pct = sin_waves(st,size);
	float c = 1.-smoothstep(0.,0.006,point(st,0.012));
    
    float s = square(st,vec2(0.375,0.375),vec2(-0.205,0.250));
    s = s*fract(sin(u_time*4.)+cos(u_time));
    
    float grid = grid(st+vec2(0.330,0.750)*scale2d(vec2(1.,0.5)));
    
    col = vec3(pct+c+s);
    col += grid;
    gl_FragColor = vec4(col,1.0);
}