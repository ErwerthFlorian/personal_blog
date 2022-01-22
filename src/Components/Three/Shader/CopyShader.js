import * as THREE from 'three';
import React, { useRef, useMemo, useEffect } from 'react';
import { extend, useThree, useFrame, addEffect } from '@react-three/fiber';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass';

const instagram = {
	uniforms: {
		tDiffuse: { value: null },
		vignette: { value: 0.4 },
		exposure: { value: 1.4 },
		color: { value: new THREE.Color(0.66, 1.2, 0.66) },
	},

	vertexShader: [
		'varying vec2 vUv;',

		'void main() {',

		'vUv = uv;',
		'gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );',

		'}',
	].join('\n'),
	fragmentShader: [
		'uniform sampler2D tDiffuse;',
		'uniform float vignette;',
		'uniform float exposure;',
		'uniform vec3 color;',
		'varying vec2 vUv;',

		'void main() {',

		'vec4 texel = texture2D( tDiffuse, vUv );',
		'vec2 p = vUv * 2.0 - 1.0;',
		'gl_FragColor = texel;',
		'gl_FragColor.xyz = pow(gl_FragColor.xyz*exposure, color);',
		'gl_FragColor.xyz *= clamp(1.0 - length(p) *vignette, 0.0, 1.0 );',

		'}',
	].join('\n'),
};

extend({
	EffectComposer,
	ShaderPass,
	RenderPass,
});

export default function Effects() {
	const composer = useRef();
	const { scene, gl, size, camera } = useThree();
	const aspect = useMemo(() => new THREE.Vector2(512, 512), []);
	addEffect(instagram);
	useEffect(
		() => void composer.current.setSize(size.width, size.height),
		[size]
	);
	useFrame(() => composer.current.render(), 1);
	return (
		<effectComposer ref={composer} args={[gl]}>
			<renderPass attachArray='passes' scene={scene} camera={camera} />
		</effectComposer>
	);
}
