"use strict";

const view = (() => {
    const galleryMain = document.getElementById('galleryMain'),
        CONSTELLATIONS = {
            "And" : "Andromeda",
            "Ant" : "Antlia",
            "Aps" : "Apus",
            "Aqr" : "Aquarius",
            "Aql" : "Aquila",
            "Ara" : "Ara",
            "Ari" : "Aries",
            "Aur" : "Auriga",
            "Boo" : "Boötes",
            "Cae" : "Caelum",
            "Cam" : "Camelopardalis",
            "Cnc" : "Cancer",
            "CVn" : "Canes Venatici",
            "CMa" : "Canis Major",
            "CMi" : "Canis Minor",
            "Cap" : "Capricornus",
            "Car" : "Carina",
            "Cas" : "Cassiopeia",
            "Cen" : "Centaurus",
            "Cep" : "Cepheus",
            "Cet" : "Cetus",
            "Cha" : "Chamaeleon",
            "Cir" : "Circinus",
            "Col" : "Columba",
            "Com" : "Coma Berenices",
            "CrA" : "Corona Austrina",
            "CrB" : "Corona Borealis",
            "Crv" : "Corvus",
            "Crt" : "Crater",
            "Cru" : "Crux",
            "Cyg" : "Cygnus",
            "Del" : "Delphinus",
            "Dor" : "Dorado",
            "Dra" : "Draco",
            "Equ" : "Equuleus",
            "Eri" : "Eridanus",
            "For" : "Fornax",
            "Gem" : "Gemini",
            "Gru" : "Grus",
            "Her" : "Hercules",
            "Hor" : "Horologium",
            "Hya" : "Hydra",
            "Hyi" : "Hydrus",
            "Ind" : "Indus",
            "Lac" : "Lacerta",
            "Leo" : "Leo",
            "LMi" : "Leo Minor",
            "Lep" : "Lepus",
            "Lib" : "Libra",
            "Lup" : "Lupus",
            "Lyn" : "Lynx",
            "Lyr" : "Lyra",
            "Men" : "Mensa",
            "Mic" : "Microscopium",
            "Mon" : "Monoceros",
            "Mus" : "Musca",
            "Nor" : "Norma",
            "Oct" : "Octans",
            "Oph" : "Ophiuchus",
            "Ori" : "Orion",
            "Pav" : "Pavo",
            "Peg" : "Pegasus",
            "Per" : "Perseus",
            "Phe" : "Phoenix",
            "Pic" : "Pictor",
            "Psc" : "Pisces",
            "PsA" : "Piscis Austrinus",
            "Pup" : "Puppis",
            "Pyx" : "Pyxis",
            "Ret" : "Reticulum",
            "Sge" : "Sagitta",
            "Sgr" : "Sagittarius",
            "Sco" : "Scorpius",
            "Scl" : "Sculptor",
            "Sct" : "Scutum",
            "Ser" : "Serpens",
            "Sex" : "Sextans",
            "Tau" : "Taurus",
            "Tel" : "Telescopium",
            "Tri" : "Triangulum",
            "TrA" : "Triangulum Australe",
            "Tuc" : "Tucana",
            "UMa" : "Ursa Major",
            "UMi" : "Ursa Minor",
            "Vel" : "Vela",
            "Vir" : "Virgo",
            "Vol" : "Volans",
            "Vul" : "Vulpecula"
        };

        const TYPES_TO_COLOURS = {
            "O5" : "#9db4ff",
            "B1" : "#a2b9ff",
            "B3" : "#a7bcff",
            "B5" : "#aabfff",
            "B8" : "#afc3ff",
            "A1" : "#baccff",
            "A3" : "#c0d1ff",
            "A5" : "#cad8ff",
            "F0" : "#e4e8ff",
            "F2" : "#edeeff",
            "F5" : "#fbf8ff",
            "F8" : "#fff9f9",
            "G2" : "#fff5ec",
            "G5" : "#fff4e8",
            "G8" : "#fff1df",
            "K0" : "#ffebd1",
            "K4" : "#ffd7ae",
            "K7" : "#ffc690",
            "M2" : "#ffbe7f",
            "M4" : "#ffbb7b",
            "M6" : "#ffbb7b"
        };

    function buildObj(arr) {
        return {
            name : arr[1] || `Hipparcos ${arr[0]}`,
            distance: arr[2],
            magnitude : arr[3],
            type: arr[5],
            constellation : CONSTELLATIONS[arr[8]] || arr[8],
            coords: `RA: ${arr[6]} / DEC: ${arr[7]}`
        };
    }

    function buildElement(star) {
        const el = document.createElement('div');
        el.setAttribute('class', 'starData');
        el.innerHTML = `<div class="infoText">${star.name} in ${star.constellation} Type ${star.type.class.text} Magnitude ${star.magnitude}</div>`;
        return el;
    }

    function starTypeToColour(type) {
        //TODO see http://www.isthe.com/chongo/tech/astro/HR-temp-mass-table-byhrclass.html
        const n = type.class && type.class.text;
        return TYPES_TO_COLOURS[n] || 'white';
    }

    let offsetX = 0;
    return {
        loading() {
            galleryMain.innerHTML = 'Loading...';
        },
        loaded() {
            galleryMain.innerHTML = 'Loaded';
        },
        display(star) {
            const obj = buildObj(star),
                el = buildElement(obj),
                colour = starTypeToColour(obj.type);

            el.style.backgroundColor = colour;
            el.style.boxShadow = `0px 0px 50px 0px ${colour}`;
            el.style.left = `${offsetX}px`;
            el.style.transitionDuration = `${8 + Math.random() * 4}s`;
            galleryMain.appendChild(el);
            setTimeout(() => {
                el.setAttribute('class', 'starData move');
            }, 1000);
            setTimeout(() => {
                galleryMain.removeChild(el);
            }, 10000);
            offsetX = (offsetX + 300) % 800;
        }
    };
})();