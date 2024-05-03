#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st,vec2(13.34012,80.38012)))*48823.380213);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float f = random(ceil(u_time*8.)*tan((u_time*50.)*10.)*st);
    
    vec2 uv = st*50.;
    uv.y += u_time*f*0.0022;
    
    vec2 ipos = floor(uv);
    
    float r = random(vec2(ipos.y));
    r = 1.-step(0.588,sqrt(r));
    
    color = vec3(r);
    gl_FragColor = vec4(color,1.0);
}