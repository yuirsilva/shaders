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
    
    vec2 uv = st*50.;
    vec2 ipos = floor(uv);
    
    float f = random((st*50.)*ceil(u_time*8.)*tan((st*50.)*10.));
    float r = random(vec2(ipos.x*u_time*0.00000002+f));
    r = 1.-step(0.588,r);
    
    color = vec3(r);
    gl_FragColor = vec4(color,1.0);
}