"use strict";

const view = (() => {
    const galleryMain = document.getElementById("galleryMain");

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(90, galleryMain.clientWidth / galleryMain.clientHeight, 0.1, 1000);

    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(galleryMain.clientWidth, galleryMain.clientHeight);
    galleryMain.appendChild(renderer.domElement);

    var geometry = new THREE.SphereGeometry(5, 32, 32);
    var material = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        emissive: 0x3a3a3a
    })
    var sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    //scene.add(new THREE.AmbientLight(0x333333));

    var light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5,3,5);
    scene.add(light);

    camera.position.z = 10;
    var render = function () {
        //requestAnimationFrame(render);

        sphere.rotation.y += 0.01;

        renderer.render(scene, camera);
    };

    render();

    return {

    };
})();