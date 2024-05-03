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
    
    float f = random(ceil(u_time*8.)*tan((u_time*50.544)*10.184)*st);
    f += random(vec2(st.x*20.));
    
    vec2 uv = st*50.;
    uv.x += u_time*12.+f;
    
    vec2 ipos = floor(uv);
    vec2 fpos = fract(uv);
    
    float r = random(vec2(ipos.y*ipos.x));
    r = 1.-step(0.572,sqrt(r));
    
    color = vec3(0.1,r*f*random(vec2(r))*0.6,r*f);
    color -= step(0.272,length(st-0.5)*f);
    color += f*0.2;
    gl_FragColor = vec4(color,1.0);
}