import { Mesh, ShaderMaterial, PlaneGeometry, DoubleSide } from "three";

const createPlane = () => {
    const geometry = new PlaneGeometry(5, 5, 32, 32);
    const material = new ShaderMaterial({
        vertexShader: `
            uniform float uTime;

            void main() {
                vec3 pos = position;

                pos.z = sin(pos.x + uTime) * 0.5;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
            }
        `,
        fragmentShader: `
            void main() {
                gl_FragColor = vec4(0.3, 0.9, 0.7, 1.0);
            }
        `,
        uniforms: {
            uTime: { value: 0.0 }
        },
        side: DoubleSide
    });

    const plane = new Mesh(geometry, material);
    
    plane.rotation.x = -Math.PI / 2;
    plane.position.y = -1;
    plane.position.z = -2;

    return plane;
}


export default createPlane;