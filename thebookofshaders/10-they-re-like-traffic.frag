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
    st*=vec2(100.,50.);
    
    float d = step(1.,mod(st.y,2.));
    float y = random(vec2(ceil(st.y)));
    
    st.x += u_time*10.*y*(2.*d-1.);
    
    vec2 ipos = floor(st);
    vec2 fpos = fract(st);

    float r = step(0.328,random(ipos));
    
    color = vec3(r);
    color *= step(0.2,fpos.y);
    gl_FragColor = vec4(1.-color,1.0);
}