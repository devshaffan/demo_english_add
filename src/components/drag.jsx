import React from 'react';
import { Stage, Layer, Image } from 'react-konva';
import useImage from 'use-image';
import './drag.css'
import _1 from '../assets/sounds/_1.mp3';
import _2 from '../assets/sounds/_2.mp3';
import _3 from '../assets/sounds/_3.mp3';
import _4 from '../assets/sounds/_4.mp3';
import _5 from '../assets/sounds/_5.mp3';
import _6 from '../assets/sounds/_6.mp3';
import _7 from '../assets/sounds/_7.mp3';
import _8 from '../assets/sounds/_8.mp3';
import _9 from '../assets/sounds/_9.mp3';
import _10 from '../assets/sounds/_10.mp3';
import removeEffect from '../assets/sounds/removeItem.mp3'
import useSound from 'use-sound';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';
// import _6  from '../assets/sounds/_6.mp3';


const dropWidth = 0;
const dropHeight = 0;

const dragWidth = 0;
const dragHeight = 0;

const URLImage = ({ image, handleClick }) => {
    const [img] = useImage(image.src);
    
    return (
        <Image
            image={img}
            x={image.x}
            y={image.y}
            width={100}
            height={90}
            // I will use offset to set origin to the center of the image
            offsetX={img ? 100 / 2 : 0}
            offsetY={img ? 90 / 2 : 0}
            onClick={handleClick}
        />
    );
};

const Drop = (props) => {
    const dragUrl = React.useRef();
    const stageRef = React.useRef();
    const [images, setImages] = React.useState([]);
    const [playRemoveEffect] = useSound(removeEffect)
    const [hover, setHover] = React.useState(false)


    const [sounds] = React.useState([
        new Audio(_1),
        new Audio(_2),
        new Audio(_3),
        new Audio(_4),
        new Audio(_5),
        new Audio(_6),
        new Audio(_7),
        new Audio(_8),
        new Audio(_9),
        new Audio(_10),

    ]);

    const playSoundEffect = (soundEffectIndex) => {
        console.log("i am at " + soundEffectIndex)
        if (soundEffectIndex < sounds.length) {
            sounds[soundEffectIndex].play();
        }
    }
    const toggleHover = (value) =>{
        setHover(value)
    }
    var animate;
    if(hover){
        animate = "animate__animated animate__heartBeat"
    }
    else{
        animate = ""
    }
    return (
        <div className="noselect parentDiv" >
            <br />
            <div >
                <img
                    alt="lion"
                    
                    src={props.img}
                    draggable={props.count < 10 ? "true" : "false"}
                    onDragStart={(e) => {
                        dragUrl.current = e.target.src;
                    }}
                    className={"noselect draggableImage " + animate}
                    onMouseEnter={()=>{toggleHover(true)}}
                    onMouseLeave={()=>{toggleHover(false)}}
                />
            </div>
            <br />
            <br />
            <div

                onDrop={(e) => {
                    e.preventDefault();
                    // register event position
                   
                    stageRef.current.setPointersPositions(e);
                    // add image

                    setImages(
                        images.concat([
                            {
                                ...stageRef.current.getPointerPosition(),
                                src: dragUrl.current,
                            },
                        ])
                    );

                    props.incCount(1)
                    playSoundEffect(props.count)

                    //setCount(count + 1)
                }}
                onDragOver={(e) => e.preventDefault()}
                className="dropBox"
            >
                <Stage
                    width={300}
                    height={200}
                    ref={stageRef}
                >
                    <Layer>
                        {images.map((image) => {
                            return <URLImage image={image} handleClick={() => {
                                setImages(
                                    images.filter(item => item !== image)
                                )
                                playRemoveEffect()
                                props.decCount(1)
                            }} />;
                        })}
                    </Layer>
                </Stage>

            </div>
            {/* <div>
                <h1>{props.count}</h1>
            </div> */}
        </div>
    );
};

export default Drop;
