import React, { useRef, useState } from 'react';
import { Canvas, useLoader, useFrame, useThree } from '@react-three/fiber';
import ThreeArticle from './ThreeArticle';
import * as THREE from 'three';

import { Stars, OrbitControls } from '@react-three/drei';
import earth_albedo from './Textures/earth_albedo.jpg';
import earth_clouds from './Textures/earth_clouds.png';
import earth_normal from './Textures/earth_normal.png';
import earth_specular from './Textures/earth_specular.jpg';
import moon_albedo from './Textures/moon_albedo.jpg';
import moon_normal from './Textures/moon_normal.png';
import sun_albedo from './Textures/sun_albedo.jpg';
import { Vector3 } from 'three';

function Earth(props) {
	const [albedo, normalMap, specularMap, clouds] = useLoader(
		THREE.TextureLoader,
		[earth_albedo, earth_normal, earth_specular, earth_clouds]
	);

	const cloudRef = useRef();

	useFrame(({ clock }) => {
		props.earthRef.current.rotation.y = clock.getElapsedTime() / 50;
		cloudRef.current.rotation.y = -clock.getElapsedTime() / 500;
		props.earthRef.current.position.x =
			50 * Math.cos(clock.getElapsedTime() / 25);
		props.earthRef.current.position.y =
			50 * Math.sin(clock.getElapsedTime() / 25);
		cloudRef.current.position.x = 50 * Math.cos(clock.getElapsedTime() / 25);
		cloudRef.current.position.y = 50 * Math.sin(clock.getElapsedTime() / 25);
	});

	return (
		<>
			<mesh ref={props.earthRef} position={[0, 0, 0]} onClick={props.onClick}>
				<sphereBufferGeometry args={[2, 64, 64]} attach='geometry' />
				<meshPhysicalMaterial
					roughness={0.6}
					metalness={0.25}
					reflectivity={0.8}
					map={albedo}
					normalMap={normalMap}
					side={THREE.DoubleSide}
					specularColorMap={specularMap}
				/>
			</mesh>

			<mesh ref={cloudRef} position={[0, 0, 0]}>
				<sphereBufferGeometry args={[2.02, 64, 64]} attach='geometry' />
				<meshLambertMaterial transparent={true} opacity={0.5} map={clouds} />
			</mesh>
		</>
	);
}

function Moon(props) {
	const [albedo, normalMap] = useLoader(THREE.TextureLoader, [
		moon_albedo,
		moon_normal,
	]);

	const moonRef = useRef();

	useFrame(({ clock }) => {
		moonRef.current.rotation.y = clock.getElapsedTime() / 20;
		moonRef.current.position.x =
			15 * Math.cos(clock.getElapsedTime() / 5) +
			props.earthRef.current.position.x;
		moonRef.current.position.y =
			15 * Math.sin(clock.getElapsedTime() / 5) +
			props.earthRef.current.position.y;
	});

	return (
		<>
			<mesh ref={moonRef} position={props.position} onClick={props.onClick}>
				<sphereBufferGeometry args={[0.75, 64, 64]} attach='geometry' />
				<meshPhysicalMaterial
					roughness={0.8}
					metalness={0.1}
					reflectivity={0.8}
					map={albedo}
					normalMap={normalMap}
					side={THREE.DoubleSide}
				/>
			</mesh>
		</>
	);
}

function Sun(props) {
	const [albedo] = useLoader(THREE.TextureLoader, [sun_albedo]);
	return (
		<>
			<mesh position={props.position} onClick={props.onClick}>
				<sphereGeometry args={[3, 64, 64]} />
				<pointLight position={[0, 0, 0]} distance={200} />
				<meshLambertMaterial
					side={THREE.DoubleSide}
					emissiveMap={albedo}
					emissive={new THREE.Color('rgb(255,255,255)')}
				/>
			</mesh>
		</>
	);
}

function Move() {
	const cam = useThree().camera;
	useFrame(({ clock }) => {
		cam.position.x = 10 * Math.cos(clock.getElapsedTime() / 15);
		cam.position.z = 10 * Math.sin(clock.getElapsedTime() / 15);
		cam.lookAt(new Vector3(0, 0, 0));
	});
	return <></>;
}

const Three = (props) => {
	const earthRef = useRef();
	const [drawArticle, setDrawArticle] = useState(false);
	const handleClick = () => {
		setDrawArticle(!drawArticle);
	};
	return (
		<div>
			<div style={{ width: '100vw', height: '100vh' }}>
				{/* {props.isLandingpage ? null : <div onClick={handleClick}>Click</div>} */}
				<Canvas style={{ position: 'absolute' }}>
					<Earth earthRef={earthRef} position={[0, 0, 0]} />
					{props.isLandingpage ? (
						<Move />
					) : (
						<OrbitControls target={[0, -1, 0]} />
					)}
					<Moon earthRef={earthRef} position={[0, 0, 0]} />
					<Stars radius={200} factor={2} />
					<Sun position={[0, 0, 0]} />
				</Canvas>
				{/* {drawArticle ? <ThreeArticle /> : null} */}
			</div>
		</div>
	);
};

export default Three;
