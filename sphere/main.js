import * as THREE from 'three';
import'./style.css';
import gsap from "gsap"
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
//scenes
const scene =new THREE.Scene();
//our spheres
const geometry = new THREE.SphereGeometry( 3, 64, 64 ); 
const material = new THREE.MeshStandardMaterial( { color: 0xffff00 ,roughness:0.2} ); 
const mesh = new THREE.Mesh( geometry, material ); 
scene.add(mesh)

//lights
const light =new THREE.PointLight(0xfffff,1,100)
light.position.set(50,10,50)
scene.add(light)

//size
const sizes={
  width:window.innerWidth,
  height:window.innerHeight,
}

//camera
const camera =new THREE.PerspectiveCamera(45,sizes.width/sizes.height)
camera.position.z=20
scene.add(camera)

//render
const canvas =document.querySelector(".webgl")
const renderer =new THREE.WebGL1Renderer({canvas})
renderer.setSize(sizes.width,sizes.height)
renderer.setPixelRatio(2)
renderer.render(scene,camera)


//controls
const controls =new OrbitControls(camera,canvas)
controls.enableDamping =true //rotation
controls.enablePan=false 
controls.enableZoom=false
controls.autoRotate=false
controls.autoRotateSpeed=2

//resize
window.addEventListener("resize",()=>{
  //update sizes
  sizes.width=window.innerWidth
  sizes.height=window.innerHeight
  //updates camera
  camera.aspect =sizes.width/sizes.height
  camera.updateProjectionMatrix()
  renderer.setSize(sizes.width/sizes.height)
})

const loop =()=>{
  // mesh.position.x +=0.2
  controls.update()
  renderer.render(scene,camera)
  window.requestAnimationFrame(loop)
}
loop()

const t1 =gsap.timeline({defaults:{duration:1}})
t1.fromTo(mesh.scale,{z:0,x:0,y:0},{z:1,x:1,y:1})
t1.fromTo("nav",{y:"-100%"},{y:"10%"})
t1.fromTo(".title",{opacity:0},{opacity:1})