#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random(vec2 st) {
    return fract(sin(dot(st,vec2(12.39823,77.3482)))*48329.382041);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 p = vec2(100.,50.);
    st*=p;
    vec2 m_st = st;
    
    float d = step(1.,mod(st.y,2.));
    float y = random(vec2(ceil(st.y)));
    
    st.x += u_time*10.*y*(2.*d-1.);
    
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);
    float r = step(0.328,random(ipos));
    
    y = step(mod(floor(-u_time+1.),p.y+1.),m_st.y);
    
    float step_x = mod(u_time*p.y*2.,p.x);
    float x = 1.-step(step_x,m_st.x);
    
    float v = step(mod(floor(-u_time),p.y+1.),m_st.y)-step(mod(floor(-u_time+1.),p.y+1.),m_st.y);
    float m = v*x+y;
    
    color = vec3(mix(1.,r,m));
    gl_FragColor = vec4(color,1.0);
}