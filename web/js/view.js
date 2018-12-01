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
        el.innerHTML = `${star.name} in ${star.constellation}<br>Type ${star.type}<br>Magnitude ${star.magnitude}`;
        return el;
    }

    return {
        loading() {
            galleryMain.innerHTML = 'Loading...';
        },
        loaded() {
            galleryMain.innerHTML = 'Loaded';
        },
        display(star) {
            const el = buildElement(buildObj(star));

            galleryMain.appendChild(el);
            setTimeout(() => {
                galleryMain.removeChild(el);
            }, 5000);
        }
    };
})();