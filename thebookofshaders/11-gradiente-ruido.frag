#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

// f - vec2() actually represents the point position relative to each
// corner of the cell (vertices)
// if we say that f = vec2(0.5), we have:
// (b) = bottom; (l) = left; (r) = right; (t) = top;

// everytime i mention "we need" is because the point needs to be relative to
// the specific corner

// bl = f - vec2(0.,0.) (minus zero because we need to go up from 
// here to find the point)

// br = f - vec2(1.,0.) (minus one on x because we need to back from here 
// on x to find the point)

// tl = f - vec2(0.,1.) (minus one on y because we need to go down from here
// on y to find the point)

// tr = f - vec2(1.,1.) (minus one on both because we need to go back on both
// axis to find the point, we can't go up, this would exceed the cell dimensions)

// we can also understand this by imagining that each corner should have
// the same coordinates as the first one (0.,0.), so by subtracting ones from
// the corresponding corner, we get to (0.,0.)

// example: the top right corner of the cell is (1.,1.), how do we get to (0.,0.)
// from here? By subtracting vec2(1.,1.), resulting in vec2(0.,0.)

// by definition, this way of thinking is not the correct one,
// because the objective is to really get the point position
// relative to each corner

// another way to define:
// Compute a vector from each
// corner to the point.

vec2 random2(vec2 st){
    st = vec2( dot(st,vec2(127.1,311.7)),
              dot(st,vec2(269.5,183.3)) );
    return -1.0 + 2.0*fract(sin(st)*43758.5453123);
}

// lmao dont ever think about using this in prod
// this is just for a better understanding
float noise(in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = smoothstep(0.,1.,f);
    
    vec2 bl = random2(i+vec2(0.));
    vec2 pbl = f - vec2(0.);
    float da = dot(bl,pbl);
    
    vec2 br = random2(i+vec2(1.,0.));
    vec2 pbr = f - vec2(1.,0.);
    float db = dot(br,pbr);
    
    float m_b = mix(da,db,u.x);
    
    vec2 tl = random2(i+vec2(0.,1.));
    vec2 ptl = f - vec2(0.,1.);
    float dc = dot(tl,ptl);
    
    vec2 tr = random2(i+vec2(1.));
    vec2 ptr = f - vec2(1.);
    float dd = dot(tr,ptr);
    
    float m_t = mix(dc,dd,u.x);
    
    return mix(m_b,m_t,u.y);
}

void main() {
	vec3 color = vec3(0.);
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;
    

	color = vec3(noise(st*15.)*0.5+0.5);
    gl_FragColor = vec4(color,1.0);
}