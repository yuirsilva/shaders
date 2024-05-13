#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

#define TWO_PI 6.28318530718

float random(vec2 n) {
    return fract(sin(dot(n,vec2(12.32804,78.32803)))*48317.328024);
}
float random(float n) {
    return fract(sin(n)*1e4);
}
float noise(float x) {
    float i = floor(x);
    float f = fract(x);
    
    return mix(random(i),random(i+1.),smoothstep(0.,1.,f));
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    vec2 pos = (st-vec2(0.5))*10.;
	float a = atan(pos.x,pos.y);
    float r = length(pos);
    float s = 1.-smoothstep(0.11,0.11+0.008,length(st-0.5+sin(u_time)*0.5+cos(u_time+noise(length(st)))*0.5*noise(u_time)));
    
    vec2 li = vec2(0.3,0.49);
    vec2 bl = step(li,st-0.716+noise(st.x+u_time));
    bl *= step(li,1.-st+0.716-noise(st.x+u_time));
    float l = bl.x*bl.y;
    
    st = 2.*st-1.;
    float d = length(max(abs(st+noise(u_time+noise(pos.y*0.3)))-0.076,0.));
    d = 1.-smoothstep(0.11,0.11+0.008,d);
    
    color = vec3(d+s+l);
    gl_FragColor = vec4(color,1.0);
}