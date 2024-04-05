#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

vec3 square(in float size, in vec2 pos, in vec3 color, vec2 st) {
    st += -pos+0.5;
    float size_normalized = 0.5-(size/2.);
    
	vec2 bl = step(vec2(size_normalized), st);
	vec2 tr = step(vec2(size_normalized), 1.-st);
    
    float pct = (bl.x*bl.y)*(tr.x*tr.y);
    
    return mix(vec3(0.), color, pct);
}

vec3 rectangle(in vec2 size, in vec2 pos, in vec3 color, vec2 st) {
    st += -pos+0.5;
    vec2 size_normalized = 0.5-(size/2.);
    
	vec2 bl = step(vec2(size_normalized), st);
	vec2 tr = step(vec2(size_normalized), 1.-st);
    
    float pct = (bl.x*bl.y)*(tr.x*tr.y);
    
    return mix(vec3(0.), color, pct);
}

vec3 TAN = vec3(245, 238., 220.)/255.;
vec3 RED = vec3(182., 38., 39.)/255.;
vec3 GOLD = vec3(253., 201., 45.)/255.;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 small = square(0.190, vec2(0.9,0.5), GOLD, st);
    vec3 rec1 = rectangle(vec2(0.5,0.190), vec2(0.5), TAN, st);
    vec3 rec2 = rectangle(vec2(0.5,0.400), vec2(0.500,0.150), TAN, st);
    vec3 rec3 = rectangle(vec2(0.5,0.400), vec2(1.055,0.150), TAN, st);
    vec3 rec4 = rectangle(vec2(0.5,0.400), vec2(-0.060,0.150), TAN, st);
    vec3 rec5 = rectangle(vec2(0.140,0.190), vec2(0.120,0.500), RED, st);
    vec3 rec6 = rectangle(vec2(0.140,0.190), vec2(-0.050,0.500), RED, st);
    vec3 rec7 = rectangle(vec2(0.140,0.310), vec2(0.120,0.790), RED, st);
    vec3 rec8 = rectangle(vec2(0.500,0.330), vec2(0.500,0.800), TAN, st);
    vec3 rec9 = rectangle(vec2(0.140,0.290), vec2(-0.050,0.780), RED, st);
    vec3 rec10 = rectangle(vec2(0.500,0.330), vec2(1.056,0.800), GOLD, st);
    
    vec3 color = (small+rec1+rec2+rec3+rec4+rec5+rec6+rec7+rec8+rec9+rec10);
    
    gl_FragColor = vec4(color, 1.0);
}