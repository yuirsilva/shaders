#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 RED = vec3(0.67, 0.02, 0.);
vec3 DARK_RED = vec3(0.48, 0.01, 0.);
vec3 DARKER_RED = vec3(0.3, 0.09, 0.02);
vec3 YELLOW = vec3(0.98, 0.75, 0.42);

float random(in vec2 st) {
    return fract(sin(dot(st,vec2(12.45381,79.32891376)))*48324.3829721);
}
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    vec2 u = smoothstep(0.,1.,f);
    
    float bl = random(i);
    float br = random(i + vec2(1.,0.));
    float b = mix(bl,br,u.x);
    
    float tl = random(i + vec2(0.,1.));
    float tr = random(i + vec2(1.));
    float t = mix(tl,tr,u.x);
    
    return mix(b,t,u.y);
}

// credits: Inigo Quilez
float boxSDF( in vec2 p, in vec2 b )
{
    vec2 d = abs(p)-b;
    return length(max(d,0.0)) + min(max(d.x,d.y),0.0);
}

void main() {
    vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    
    float n = noise(st*10.);
    float f = random(st)+n;
    float d = 1.-smoothstep(0.1,0.1+0.008,boxSDF(st+n*0.012-vec2(0.18,0.5),vec2(0.04,0.33)));
    float d1 = 1.-smoothstep(0.1,0.1+0.008,boxSDF(st+n*-0.017-vec2(0.510,0.5),vec2(0.060,0.340)));
    float d2 = 1.-smoothstep(0.1,0.1+0.008,boxSDF(st+n*0.013-vec2(0.840,0.5),vec2(0.04,0.33)));

    vec3 bg = DARKER_RED*f;
    color = vec3(d*RED+d1*DARK_RED+d2*YELLOW);
    color = mix(bg,color,(d+d1+d2)/f);
    gl_FragColor = vec4(color,1.0);
}