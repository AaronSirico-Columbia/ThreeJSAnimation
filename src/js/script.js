import * as THREE from "three";
import * as dat from "dat.gui";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js";

var height = window.innerHeight;
var width = window.innerWidth;

const renderer = new THREE.WebGLRenderer();
renderer.shadowMap = true;


renderer.setSize(width,height);

document.body.appendChild(renderer.domElement);

const gui = new dat.GUI();


const camera = new THREE.PerspectiveCamera( 45, width/height, 0.1, 1000 );
const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-10,30,30);
orbit.update();

const scene = new THREE.Scene();

//Objects In Scene
const ConeGeo = new THREE.ConeGeometry(5,5);
const ConeMat = new THREE.MeshLambertMaterial({color: 0x229999});
const cone = new THREE.Mesh(ConeGeo, ConeMat);
cone.receiveShadow = true;
//
const planeGeo = new THREE.PlaneGeometry(30,30);
const planeMat = new THREE.MeshLambertMaterial({color: 225577, side: THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeo,planeMat);
plane.position.set(0,-5,0);
plane.rotation.x = -.5 * Math.PI;
plane.receiveShadow = true;
//
const torusGeo = new THREE.TorusGeometry(3, 2);
const torusMat = new THREE.MeshLambertMaterial({color: 999945, side: THREE.DoubleSide, wireframe: true});
const torus = new THREE.Mesh(torusGeo,torusMat);
torus.position.set(0,100,0);
torus.receiveShadow = true;
//
//End of Objects
const axesHelper = new THREE.AxesHelper( 3 );
const gridHelper = new THREE.GridHelper(30);
const ambLight = new THREE.AmbientLight(0x334433);
const dirLight = new THREE.DirectionalLight(0x555555, 100);
const dirLightHelp = new THREE.DirectionalLightHelper(dirLight);

scene.add(dirLight);
scene.add(ambLight);





renderer.setSize( width, height);
document.body.appendChild( renderer.domElement );

scene.add( axesHelper );
scene.add(cone);
scene.add(axesHelper);
scene.add(plane);
scene.add(gridHelper);
scene.add(torus);
scene.background = new THREE.Color(0x873929);

var angle = 0;
var speed = -.01;

function animate(time)
{
    cone.rotation.x = time / 1000;
    cone.rotation.y = time / 1000;
    renderer.render(scene,camera);

    angle += guiOptions.speed;
    torus.position.y = 10 * Math.abs(Math.sin(angle));

}

renderer.setAnimationLoop(animate);

const guiOptions = {
    TorusColor: '#0000FF',
    wireframe: true,
    speed: .02,
    angle: .02,
    PlaneColor: '#FF00FF',
    ConeColor: '#FF00FF',


}

gui.add(guiOptions, 'angle', 0, 1);
gui.add(guiOptions, 'speed', 0, 1);


gui.add(guiOptions, 'wireframe').onChange(function(e){plane.material.wireframe = e});

gui.addColor(guiOptions, 'ConeColor').onChange(function(e){ cone.material.color.set(e);});
