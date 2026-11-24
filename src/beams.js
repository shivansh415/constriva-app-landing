// Hero light: the three slanted bars of the logo, drawn as moving beams of light.
const VS = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
const FS = `precision mediump float;uniform vec2 r;uniform float t;uniform float s;
float h(float n){return fract(sin(n)*43758.5);}
float n1(float x){float i=floor(x),f=fract(x);f=f*f*(3.-2.*f);return mix(h(i),h(i+1.),f);}
vec4 beam(vec2 u,float off,float w,vec3 c1,vec3 c2,float sp){
  vec2 q=u; float bend=.16*sin(u.x*1.5+off*3.+t*.22)+.06*sin(u.x*3.1-t*.3+off);
  float d=u.y*1.0+u.x*.42-off-bend;
  float core=exp(-pow(abs(d)/w,2.2));
  float str=.55+.45*n1(d/w*16.+sin(u.x*2.+t*.4)*.8+off*20.);
  str*=.7+.3*n1(d/w*52.+off*9.);
  float glint=pow(max(0.,1.-abs(fract(u.x*.32-t*sp+off)-.5)*5.),3.);
  vec3 c=mix(c1,c2,clamp(u.x*.5+.5+.2*sin(t*.3+off),0.,1.));
  float a=core*str*(.75+.5*glint);
  return vec4(c+glint*.25,a);}
void main(){vec2 u=(gl_FragCoord.xy-.5*r)/min(r.x,r.y*.7);u.y+=.16+s*.35;
  vec4 o=vec4(0.);
  vec4 b1=beam(u,.30,.15,vec3(.62,.47,1.),vec3(1.,.46,.82),.05);
  vec4 b2=beam(u,-.02,.12,vec3(1.,.5,.8),vec3(.55,.5,1.),.04);
  vec4 b3=beam(u,-.27,.10,vec3(.80,.97,.40),vec3(.45,.85,1.),.06);
  o.rgb=b1.rgb*b1.a;o.a=b1.a;
  o.rgb=o.rgb*(1.-b2.a*.75)+b2.rgb*b2.a*.75;o.a=o.a+b2.a*.75*(1.-o.a);
  o.rgb=o.rgb*(1.-b3.a*.7)+b3.rgb*b3.a*.7;o.a=o.a+b3.a*.7*(1.-o.a);
  float e=smoothstep(0.,.2,gl_FragCoord.y/r.y)*smoothstep(1.,.62,gl_FragCoord.y/r.y);
  gl_FragColor=o*e*.62;}`;
export function beams(canvas, still) {
  const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: true, antialias: false, powerPreference: 'low-power' });
  if (!gl) return;
  const sh = (t, s) => { const o = gl.createShader(t); gl.shaderSource(o, s); gl.compileShader(o); return o; };
  const pr = gl.createProgram(); gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS)); gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS)); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { canvas.remove(); return; }
  gl.useProgram(pr); gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer()); gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  gl.enableVertexAttribArray(0); gl.bindAttribLocation(pr, 0, 'p'); const loc = gl.getAttribLocation(pr, 'p'); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const R = gl.getUniformLocation(pr, 'r'), T = gl.getUniformLocation(pr, 't'), SC = gl.getUniformLocation(pr, 's');
  const size = () => { const q = Math.min(devicePixelRatio, 1.5) * .6; canvas.width = Math.round(canvas.clientWidth * q); canvas.height = Math.round(canvas.clientHeight * q); gl.viewport(0, 0, canvas.width, canvas.height); gl.uniform2f(R, canvas.width, canvas.height); };
  size(); let vis = true, t0 = performance.now();
  new IntersectionObserver(([e]) => { const was = vis; vis = e.isIntersecting; if (vis && !was) loop(); }).observe(canvas);
  const draw = () => { gl.uniform1f(T, (performance.now() - t0) / 1000 + 4); gl.uniform1f(SC, Math.min(1, scrollY / innerHeight)); gl.drawArrays(gl.TRIANGLES, 0, 3); };
  const loop = () => { if (!vis) return; draw(); if (!still) requestAnimationFrame(loop); };
  let w = innerWidth; addEventListener('resize', () => { if (innerWidth !== w) { w = innerWidth; size(); draw(); } });
  loop();
}
